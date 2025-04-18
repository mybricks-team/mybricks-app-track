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
import isPlainObject from 'lodash/isPlainObject'
import versionPlugin from 'mybricks-plugin-version'
import { Locker, Toolbar } from '@mybricks/sdk-for-app/ui'
import { TrackPanelCom } from './track-panel'
import { CodeTemplate, EditorsCdnOptions } from './constant'
import { MySelf_COM_LIB, H5_BASIC_COM_LIB } from './../constants'
import comlibLoaderFunc from "./configs/comlibLoader";
import { comLibAdderFunc } from "./configs/comLibAdder";
// import { config as ThemePlugin } from '@mybricks/plugin-theme'

import myEditors from './editors'
import { traverseAllComponents } from './utils'

import css from './designer.less'

const SPADesigner = window.mybricks.SPADesigner
// const LOCAL_DATA_KEY = '"--mybricks--'

const useGlobalModel = (defaultValue = { pageEnv: {}, pageHooks: {} }) => {
  // const [model, setModel] = useState(defaultValue);

  // const modelRef = useRef(defaultValue);

  const _model = useMemo(() => {
    return {
      ...defaultValue,
      setPageEnv: (pageEnv) => {
        _model.pageEnv = pageEnv
        // setModel(c => ({ ...c, pageEnv }))
      },
      setPageHooks: (pageHooks) => {
        _model.pageHooks = pageHooks
        // setModel(c => ({ ...c, pageHooks }))
      },
      setSpmDefinitionsByNamespace: (namespace, defines) => {
        const spmDefinitions = isPlainObject(_model.spmDefinitions) ? _model.spmDefinitions : {};
        spmDefinitions[namespace] = defines;
        _model.spmDefinitions = spmDefinitions

        // setModel(c => {
        //   const spmDefinitions = isPlainObject(c.spmDefinitions) ? c.spmDefinitions : {};
        //   spmDefinitions[namespace] = defines;
        //   return { ...c, spmDefinitions }
        // })
      }
    }
  }, []);

  // useMemo(() => {
  //   modelRef.current = _model
  // }, [_model])

  return _model
}


// 兜底物料
export const LOCAL_DEFAULT_COMLIBS = [H5_BASIC_COM_LIB];

export default function Designer({ appData }) {
  const coms = [];

  // 处理默认组件库，是从物料中心配置读取，还是直接从本地配置读取
  if (appData?.defaultComlibs?.length) {
    // 物料中心配置
    appData?.defaultComlibs.forEach((lib) => {
      const { namespace, content, version } = lib;
      const com = LOCAL_DEFAULT_COMLIBS.find(
        (lib) => lib.namespace === namespace
      );
      const { editJs, rtJs, coms: componentComs } = JSON.parse(content);
      if (com) {
        coms.push({
          id: com.id,
          namespace,
          version,
          editJs,
          rtJs,
          coms: componentComs,
        });
      } else {
        coms.push({ ...lib, editJs, rtJs, coms: componentComs });
      }
    });
  } else {
    // 本地配置读取
    coms.push(...LOCAL_DEFAULT_COMLIBS);
  }

  let comlibs = [];

  // 处理我的组件
  if (!appData.fileContent?.content?.comlibs) {
    coms.unshift(MySelf_COM_LIB);
    comlibs = coms;
  } else {
    const myselfComlib =
      appData.fileContent?.content?.comlibs?.find(
        (lib) => lib.id === "_myself_"
      ) ?? MySelf_COM_LIB;
    coms.unshift(myselfComlib);
    if (
      appData.fileContent?.content?.comlibs?.some(
        (lib) => typeof lib === "string"
      )
    ) {
      comlibs = coms;
    } else {
      comlibs = appData.fileContent?.content?.comlibs;
    }
  }

  const [ctx, setCtx] = useState({
    sdk: appData,
    hasMaterialApp: appData.hasMaterialApp,
    comlibs: comlibs,
    // comlibs: [appData.fileContent?.content?.comlibs?.find(lib => lib.id === "_myself_") ?? MySelf_COM_LIB, H5_BASIC_COM_LIB],
    latestComlibs: [],
  });

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
  const [latestComlibs, setLatestComlibs] = useState<[]>();

  useEffect(() => {
    const needSearchComlibs = comlibs.filter(lib => lib.id !== "_myself_");
    if (!!needSearchComlibs?.length) {
      API.Material.getLatestComponentLibrarys(needSearchComlibs.map(lib => lib.namespace)).then((res: any) => {
        const latestComlibs = (res || []).map(lib => ({ ...lib, ...JSON.parse(lib.content) }))
        setLatestComlibs(latestComlibs)
      })
    } else {
      setLatestComlibs([]);
    }
  }, [JSON.stringify(comlibs.map((lib) => lib.namespace))]);

  const content = appData.fileContent.content

  delete content.tracksJson?.comTrackPoints;
  delete content.tracksJson?.comInstanceTrack;

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
  }, [])

  const getSaveJson = useCallback(() => {
    const dumpJson = designerRef.current.dump()
    dumpJson.tracksJson = getTracksJson();
    // json.componentType = context.componentType
    dumpJson.comlibs = ctx.comlibs;

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

    // let spmDefinitions = {}

    // const allComponents = traverseAllComponents(designerRef.current.components.getAll());

    // allComponents.forEach(comp => {
    //   const { def, model } = comp;
    //   const { namespace, version } = def;

    //   if (Array.isArray(model.spm) && model.spm.length > 0) {
    //     spmDefinitions[namespace] = model.spm.filter(t => !!t.func);
    //   }
    // })

    // const { pageHooks, pageEnv } = json?.tracksJson ?? {};

    // const trackJsonFile = {
    //   pageHooks,
    //   pageEnv,
    //   spmDefinitions,
    // }

    const res = await axios.post('/api/track/publish', {
      userId: appData.user.id,
      fileId: appData.fileId,
      json: json.tracksJson,
      title: appData.fileContent.name
    }).catch(err => {
      message.error({
        content: err.message || '发布失败',
        duration: 2,
      })
    }).finally(() => {
      setPublishLoading(false)
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
        { 
          SPADesigner && latestComlibs && window?.mybricks?.createObservable && 
          <SPADesigner
            ref={designerRef}
            config={spaDesignerConfig({ appData, ctx: window?.mybricks?.createObservable(Object.assign(ctx, { latestComlibs })), designerRef, globalModel })}
            onEdit={onEdit}
          />
        }
      </div>
    </div>
  )
}

function spaDesignerConfig ({ appData, ctx, designerRef, globalModel }) {
  const content = appData.fileContent?.content || {}

  return {
    plugins: [
      versionPlugin({
        user: appData.user,
        file: appData.fileContent || {}
      }),
    ],
    ...(ctx.hasMaterialApp
      ? {
          comLibAdder: comLibAdderFunc(ctx),
        }
      : {}),
    comLibLoader: comlibLoaderFunc(ctx),
    pageContentLoader() {
      return new Promise((resolve) => {
        resolve(appData.fileContent.content)
      })
    },
    toplView: false,
    editView: {
      panelAppender(type, model, ...p) {
        if (type === 'com') {

          const namespace = model.def?.namespace;
          const editorsSpms = model.def?.editors?.[':root']?.spm ?? [];
          // const editorsSpms = [
          //   {
          //     id: 'button',
          //     type: ['CLK', 'EXP'],
          //     title: '按钮元素',
          //   },
          //   {
          //     id: 'ccc',
          //     title: '点击成功',
          //   }
          // ]

          const hasSpmDefines = !!(Array.isArray(editorsSpms) && editorsSpms?.length);

          const handleChange = defines => {
            globalModel.setSpmDefinitionsByNamespace(namespace, defines)
          }

          return hasSpmDefines ? {
            title: '埋点',
            render: () => <TrackPanelCom initValues={globalModel.spmDefinitions?.[namespace]} configs={editorsSpms} onChange={handleChange} />
          } : null
        }
      },
      // width: 1000,
      editorAppender(editConfig) {
        return myEditors({ editConfig, designerRef }, { fileId: appData.fileId })
      },
      items(_, cate0) {
        cate0.title = '埋点方案'
        cate0.items = [
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
            type: 'trackplan',
            options: {
              title: '埋点SDK注入',
              language: 'html',
              comments: CodeTemplate.Track.Initial.Comment
            },
            value: {
              get: () => {
                return globalModel.pageHooks?.initial;
              },
              set: (_, value) => {
                globalModel.setPageHooks({ initial: value });
              }
            }
          },
        ]
      },
      editorOptions: EditorsCdnOptions
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
