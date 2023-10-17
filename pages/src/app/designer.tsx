import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react'

import axios from 'axios'
import moment from 'moment'
import { message, Button } from 'antd'
import API from '@mybricks/sdk-for-app/api'
// import toolsPlugin from '@mybricks/plugin-tools'
import versionPlugin from 'mybricks-plugin-version'
import { Locker, Toolbar } from '@mybricks/sdk-for-app/ui'
import { CodeTemplate } from './constant'
// import { config as ThemePlugin } from '@mybricks/plugin-theme'

import myEditors from './editors'
import { traverseAllComponents } from './utils'

import css from './designer.less'

const SPADesigner = window.mybricks.SPADesigner
// const LOCAL_DATA_KEY = '"--mybricks--'

const useGlobalModel = (defaultValue = { pageEnv: {}, pageHooks: {} }) => {
  const [model, setModel] = useState(defaultValue);

  const _model = useMemo(() => {
    return {
      ...model,
      setPageEnv: (pageEnv) => {
        setModel(c => ({ ...model, pageEnv }))
      },
      setPageHooks: (pageHooks) => {
        setModel(c => ({ ...model, pageHooks }))
      },
    }
  }, [model]);

  return _model
}

export default function Designer({ appData }) {
  const designerRef = useRef<{ 
    dump: () => any, 
    toJSON: () => any, 
    geoView: { canvasDom }, 
    loadContent: (content: any) => void,
    components: {
      getAll: () => any
    }
  }>()
  const [operable, setOperable] = useState(false)
  const [beforeunload, setBeforeunload] = useState(false)
  const [saveTip, setSaveTip] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)

  const content = appData.fileContent.content

  const globalModel = useGlobalModel(content.tracksJson);

  const save = useCallback((param: { name?; shareType?; content?; icon?},
    skipMessage?: boolean) => {
    if (!operable) {
      message.warn('请先点击右上角个人头像上锁获取页面编辑权限')
      return
    }

    const { name, shareType, content, icon } = param
    appData.save({
      userId: appData.user.id,
      fileId: appData.fileId,
      name,
      shareType,
      content,
      icon,
    }).then(() => {
      !skipMessage && message.success(`保存完成`);
      if (content) {
        setSaveTip(`改动已保存-${moment(new Date()).format('HH:mm')}`)
      }
    }).catch(e => {
      !skipMessage && message.error(`保存失败：${e.message}`);
      if (content) {
        setSaveTip('保存失败')
      }
    }).finally(() => {
      setSaveLoading(false)
    })
  }, [operable])

  const getTracksJson = useCallback(() => {
    const json = JSON.parse(JSON.stringify(globalModel))

    return json
  }, [globalModel])

  const getSaveJson = useCallback(() => {
    const dumpJson = designerRef.current.dump()
    dumpJson.tracksJson = getTracksJson();
    // json.componentType = context.componentType

    return dumpJson
  }, [getTracksJson])

  const onSaveClick = useCallback(() => {
    setSaveLoading(true)
    const json = getSaveJson()
    save({ name: appData.fileContent.name, content: JSON.stringify(json) })

    setBeforeunload(false)

    API.App.getPreviewImage({ // Todo... name 中文乱码
      element: designerRef.current.geoView.canvasDom,
      // name: `${ctx.fileItem.name}.png`
    }).then(res => {
      const url = new URL(res)

      if (url.protocol === 'https:') {
        url.protocol = 'http:'
      }

      save({ icon: url.href }, true)
    }).catch((err) => {
      console.error(err)
    })
  }, [operable, getSaveJson])

  const onPublishClick = useCallback(async () => {
    setPublishLoading(true)
    const json = getSaveJson();

    save({ name: appData.fileContent.name, content: JSON.stringify(json) }, true)
    setBeforeunload(false)

    let spmDefinitions = {}

    const allComponents = traverseAllComponents(designerRef.current.components.getAll());

    allComponents.forEach(comp => {
      const { def, model } = comp;
      const { namespace, version } = def;

      if (Array.isArray(model.spm) && model.spm.length > 0) {
        spmDefinitions[namespace] = model.spm.filter(t => !!t.func);
      }
    })

    const { pageHooks, pageEnv } = json?.tracksJson ?? {};

    const trackJsonFile = {
      pageHooks,
      pageEnv,
      spmDefinitions,
    }

    console.log(trackJsonFile)

    const res = await axios.post('/api/track/publish', {
      userId: appData.user.id,
      fileId: appData.fileId,
      json: trackJsonFile,
      title: appData.fileContent.name
    })

    if (res.data.code === 1) {
      message.success({
        key: 'publish',
        content: '发布成功',
        duration: 2,
      })

    } else {
      message.error({
        content: res.data.message || '发布失败',
        duration: 2,
      })
    }

    setPublishLoading(false)
  }, [operable, getSaveJson])

  useEffect(() => {
    if (beforeunload) {
      window.onbeforeunload = () => {
        return true
      }
    } else {
      window.onbeforeunload = null
    }
  }, [beforeunload])

  const onEdit = useCallback(() => {
    setBeforeunload(true);
  }, [])

  const RenderLocker = useMemo(() => {
    return (
      <Locker
        statusChange={(status) => {
          setOperable(status === 1)
        }}
        compareVersion={true}
      />
    )
  }, [])

  return (
    <div className={`${css.view} fangzhou-theme`}>
      <Toolbar title={appData.fileContent.name} updateInfo={<Toolbar.LastUpdate content={saveTip} />}>
        {RenderLocker}
        <Toolbar.Save
          disabled={!operable}
          loading={saveLoading}
          onClick={onSaveClick}
          dotTip={beforeunload}
        />
        <Toolbar.Button
          disabled={!operable}
          loading={publishLoading}
          onClick={onPublishClick}
        >发布</Toolbar.Button>
        {/* <Toolbar.Tools
          onImport={(value) => {
            try {
              const { content, theme } = JSON.parse(value)
              context.theme = theme
              designerRef.current.loadContent(content)
            } catch (e) {
              message.error(e)
              console.error(e)
            }
          }}
          getExportDumpJSON={() => {
            return getSaveJson()
          }}
          getExportToJSON={() => {
            return designerRef.current.toJSON()
          }}
        /> */}
      </Toolbar>
      <div className={css.designer}>
        <SPADesigner
          ref={designerRef}
          config={spaDesignerConfig({ appData, designerRef, globalModel })}
          onEdit={onEdit}
        />
      </div>
    </div>
  )
}

function spaDesignerConfig ({ appData, designerRef, globalModel }) {
  const content = appData.fileContent?.content || {}

  return {
    plugins: [
      // ThemePlugin,
      versionPlugin({
        user: appData.user,
        file: appData.fileContent || {}
      }),
      // toolsPlugin(),
    ],
    comLibLoader() {
      return new Promise((resolve) => {
        
        // TODO: 先写死
        const localComlibs = JSON.parse(localStorage.getItem('MYBRICKS_APP_THEME_COMLIBS'))
        if (localComlibs) {
          resolve(localComlibs)
        } else {
          resolve(['https://f2.beckwai.com/udata/pkg/eshop/fangzhou/temp/0.0.11/edit.js'])
        }
      })
    },
    pageContentLoader() {
      return new Promise((resolve) => {
        resolve(appData.fileContent.content)
      })
    },
    // TODO: 临时开放，需要看类似选中、悬浮、禁用状态等
    toplView: false,
    editView: {
      // width: 1000,
      editorAppender(editConfig) {
        return myEditors({ editConfig, designerRef }, { fileId: appData.fileId })
      },
      items(_, cate0) {
        cate0.title = '埋点方案'
        cate0.items = [
          // {
          //   title: '主题包配置',
          //   type: 'Theme'
          // },
          {
            title: '参数',
            type: 'map',
            value: {
              get: () => {
                return globalModel.pageEnv;
              },
              set: (_, value) => {
                globalModel.setPageEnv(value);
              }
            }
          },
          {
            title: '',
            type: 'TRACKCODE',
            options: {
              title: '埋点SDK注入',
              language: 'html',
              comments: CodeTemplate.Track.Initial.Comment
            },
            value: {
              get: () => {
                return {
                  code: globalModel.pageHooks?.initial
                };
              },
              set: (_, value) => {
                globalModel.setPageHooks({ initial: value.code });
              }
            }
          },
          {
            title: '',
            type: 'track',
            value: {
              // get: () => {
              //   console.log(globalModel)
              //   return {
              //     code: globalModel.pageHooks?.initial
              //   };
              // },
              set: (_, value) => {
                console.log('set', value)
                // globalModel.setPageHooks({ initial: value.code });
              }
            }
          }
          // {
          //   title: '',
          //   type: 'trackplan',
          //   value: {
          //     get: () => {
          //       return globalModel.pageHooks;
          //     },
          //     set: (_, value) => {
          //       globalModel.setPageHooks(value);
          //     }
          //   }
          // }
        ]
      },
    },
    com: {
      env: {
        i18n(title) {
          return title
        },
        design: true
      }
    },
    geoView: {
      type: "mobile",
      width: 375,
      height: 667,
      // nav: {
      //   float: false,
      // },
      theme: {
        css: [
          // "https://f2.beckwai.com/udata/pkg/eshop/fangzhou/temp/editor.d5c483a324024fb6.css",
          "./public/editor.css",
        ],
      },
      layout: 'absolute',
      scenes: {
        // adder: [
        //   {
        //     type: 'normal',
        //     title: '普通场景',
        //     layout: 'absolute'
        //   },
        //   {
        //     type: 'popup',
        //     title: '对话框',
        //     template: {
        //       namespace: 'mybricks.basic-comlib.popup',
        //       deletable: false,
        //       asRoot: true
        //     }
        //   },
        //   {
        //     type: 'popup',
        //     title: '抽屉',
        //     template: {
        //       namespace: 'mybricks.basic-comlib.drawer',
        //       deletable: false,
        //       asRoot: true
        //     }
        //   },
        // ]
      },
    }
  }
}
