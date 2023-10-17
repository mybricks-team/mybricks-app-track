import React, {
  useRef,
  useMemo,
  useState,
  useCallback
} from 'react'
import { createPortal } from 'react-dom'

import { message } from 'antd'
import domToImage from 'dom-to-image'
import API from '@mybricks/sdk-for-app/api'

import {
  Button,
  Select,
  Toggle,
  PlusOutlined,
  EditOutlined,
  RemoveOutlined,
  ArrorRightOutlined,
  CircleCheckOutlined
} from '../compoments'
import { DesignAll } from './all'
import { useUpdateEffect } from '../hooks'
import { uuid, deepCopy } from '../../../utils'
import { useThemeEditorContext } from '../../index'

import type { Data, Component } from '../type'

import viewStyle from '../view.less'
import configStyle from './index.less'

const TOGGLE_OPTIONS = [
  { label: '设计规范', value: 'all' },
  { label: '组件规范', value: 'component'}
]

export const ConfigView = () => {
  const [{ all, component }, setMode] = useState({
    all: {
      open: true,
      show: true
    },
    component: {
      open: false,
      show: false
    }
  })

  const onToggleChange = useCallback((value) => {
    if (value === 'all') {
      setMode(() => {
        return {
          all: {
            open: true,
            show: true
          },
          component: {
            open: true,
            show: false
          }
        }
      })
    } else {
      setMode(() => {
        return {
          all: {
            open: true,
            show: false
          },
          component: {
            open: true,
            show: true
          }
        }
      })
    }
  }, [])

  return (
    <div className={viewStyle.view}>
      <Toggle
        defaultValue={'all'}
        options={TOGGLE_OPTIONS}
        onChange={onToggleChange}
      />
      {all.open ? (
        <div style={{display: all.show ? 'inline' : 'none'}}>
          <DesignAll />
        </div>
      ) : null}
      {component.open ? (
        <div style={{display: component.show ? 'inline' : 'none'}}>
          <DesignComponent />
        </div>
      ) : null}
    </div>
  )
}

export function initThemeInfo (pageComponents: Array<Component>, themes: Data['themes']) {
  
  
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const themeIdToThemeMap = {}
  const copyThemes = deepCopy(themes)
  const notInPageNamespaceMap = {}
  
  copyThemes.forEach(({ namespace }) => {
    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      notInPageNamespaceMap[namespace] = true
    }
  })

  pageComponents.forEach(({
    id,
    def: {
      title: defTitle,
      namespace
    },
    model: {
      css
    },
    title,
    dom
  }) => {

    Reflect.deleteProperty(notInPageNamespaceMap, namespace)

    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      copyThemes.push({
        namespace,
        components: []
      })
    }

    if (!namespaceToAllMap[namespace]) {
      namespaceToAllMap[namespace] = {
        title: defTitle,
        options: []
      }
    }

    if (css) {
      themeIdToThemeMap[id] = {
        id,
        title,
        namespace,
        styleAry: css
      }
      namespaceToAllMap[namespace].options.push({label: title, value: id, dom})
    }
  })

  const finalThemes = []

  copyThemes.forEach(({ namespace, components }) => {
    if (!notInPageNamespaceMap[namespace]) {
      const finalComponents = []
      finalThemes.push({
        namespace,
        components: finalComponents
      })
      components.forEach((component) => {
        const theme = themeIdToThemeMap[component.themeId]
        if (theme) {
          finalComponents.push({ ...component, styleAry: theme.styleAry })
        }
      })
    }
  })

  return {
    themes: finalThemes,
    namespaceToAllMap,
    themeIdToThemeMap
  }
}

export function traverse (slots) {
  return slots.map(({ comAry }) => {
    if (Array.isArray(comAry)) {
      return comAry.map((com) => {
        const { slots } = com
        if (Array.isArray(slots)) {
          return [com, ...traverse(slots).reduce((f, s) => [...f, ...s], [])]
        }

        return [com]
      })
    }

    return []
  }).reduce((f, s) => [...f, ...s], [])
}

function DesignComponent () {
  const { data, component, popView } = useThemeEditorContext()
  const [themePanlOpen, setThemePanlOpen] = useState(false)
  const [themePanelFormData, setThemePanelFormData] = useState(null)
  const [themes, setThemes] = useState<Data['themes']>([])
  // const [searchValue, setSearchValue] = useState('')
  const [themeExpandMap, setThemeExpandMap] = useState({})

  const { namespaceToAllMap, themeIdToThemeMap } = useMemo(() => {
    const { themes, ...other } = initThemeInfo(traverse(component.getAll()).reduce((f, s) => [...f, ...s], []), data.themes)
    data.themes = themes
    setThemes(themes)

    return other
  }, [])

  const themeOperate = useCallback(({
    id,
    title,
    themeId,
    namespace,
    previewUrl
  }: {
    id: string
    title?: string
    themeId?: string
    namespace: string
    previewUrl?: string
  }, operate) => {
    const themeIndex = data.themes.findIndex((theme) => theme.namespace === namespace)
    const components = data.themes[themeIndex].components
    switch (operate) {
      case 'add':
        components.push({...themeIdToThemeMap[themeId], title, id: uuid(), themeId, previewUrl, isDefault: components.length ? false : true})
        break
      case 'delete':
        const deleteIndex = components.findIndex((component) => component.id === id)
        const deleteComponent = components[deleteIndex]
        components.splice(deleteIndex, 1)
        if (deleteComponent.isDefault && components.length) {
          components[0].isDefault = true
        }
        break
      case 'edit':
        const editIndex = components.findIndex((component) => component.id === id)
        const editComponent = components[editIndex]
        components.splice(editIndex, 1, {...themeIdToThemeMap[themeId], title, id, themeId, previewUrl, isDefault: editComponent.isDefault})
        break
      case 'default':
        components.forEach((component) => {
          if (component.id === id) {
            component.isDefault = true
          } else {
            component.isDefault = false
          }
        })
      default:
        break
    }

    setThemes([...data.themes])

    // TODO: 查询功能
    // if (!searchValue) {
    //   setThemes([...data.themes])
    // } else {
    //   setThemes(() => {
    //     return data.themes.filter((theme) => theme.title.indexOf(searchValue) !== -1)
    //   })
    // }
  }, [])

  const actionOperate = useCallback((e, formData, type) => {
    e.stopPropagation()
    if (type === 'add') {
      setThemePanelFormData(formData)
      setThemePanlOpen(true)
    } else if (type === 'edit') {
      const editId = themePanelFormData?.id
      const editNamespace = themePanelFormData?.namespace
      if (editNamespace === formData.namespace && editId === formData.id) {
        onAddThemePanelCancel()
      } else {
        setThemePanelFormData(formData)
        setThemePanlOpen(true)
      }
    } else {
      const editId = themePanelFormData?.id
      const editNamespace = themePanelFormData?.namespace
      if (editNamespace === formData.namespace && editId === formData.id) {
        onAddThemePanelCancel()
      }
      themeOperate(formData, 'delete')
    }
    
  }, [themePanelFormData])

  // const onSearchValueChange = useCallback((e) => {
  //   setSearchValue(e.target.value)
  //   const value = e.target.value.trim()
  //   console.log(value, 'value')
  //   console.log(data.themes, 'data.themes')
  //   if (!value) {
  //     setThemes(data.themes)
  //   } else {
  //     const finalThemes = []
  //     const themeExpandMap = {}
  //     data.themes.filter(({ namespace, components }) => {
  //       const theme = { namespace, components: []}
  //       const { title } = namespaceToAllMap[namespace]
  //       if (components.length) {
  //         const filterComponents = components.filter(({ title }) => title.indexOf(value) !== -1)
  //         if (filterComponents.length) {
  //           theme.components = filterComponents
  //         }
  //       }
        
  //     })
  //   }
  // }, [])

  const onAddThemePanelOk = useCallback((value) => {
    themeOperate(value, themePanelFormData.id ? 'edit' : 'add')
    onAddThemePanelCancel()
  }, [themePanelFormData])

  const onAddThemePanelCancel = useCallback(() => {
    setThemePanlOpen(false)
    setThemePanelFormData(null)
  }, [])

  const onExpandSwitch = useCallback(({ namespace }) => {
    setThemeExpandMap((value) => {
      return {
        ...value,
        [namespace]: !value[namespace]
      }
    })
  }, [])

  useUpdateEffect(() => {
    if (themePanlOpen) {
      const { id, namespace } = themePanelFormData
      const { title, options } = namespaceToAllMap[namespace]

      popView(`${id ? '编辑' : `新建"${title}"`}主题`, ({ close }) => {
        return (
          <ThemePanel
            onOk={(value) => {
              onAddThemePanelOk(value)
              close()
            }}
            defaultValue={themePanelFormData}
            options={options}
            themeIdToThemeMap={themeIdToThemeMap}
          />
        )
      }, {width: 320, beforeEditView: true})
    }
  }, [themePanlOpen, themePanelFormData])

  // const themePanel = useMemo(() => {
  //   if (themePanlOpen) {
  //     const { id, namespace } = themePanelFormData
  //     const { title, options } = namespaceToAllMap[namespace]
  //     const container = document.querySelector('div[class^="lyStage-"]')

  //     return (
  //       <div key={id + namespace}>
  //         <ThemePanel
  //           title={`${id ? '编辑' : `新建"${title}"`}主题`}
  //           onOk={onAddThemePanelOk}
  //           defaultValue={themePanelFormData}
  //           onCancel={onAddThemePanelCancel}
  //           style={{ right: 0 }}
  //           container={container}
  //           options={options}
  //         />
  //       </div>
  //     )
  //   }

  //   return null
  // }, [themePanlOpen, themePanelFormData])

  const configThemeList = useMemo(() => {
    const editId = themePanelFormData?.id
    const editNamespace = themePanelFormData?.namespace

    return (
      <div className={configStyle.themeList}>
        {themes.length ? themes.map(({ namespace, components }) => {
          const { title } = namespaceToAllMap[namespace]
          const expand = themeExpandMap[namespace]

          return (
            <div key={namespace}>
              <div className={configStyle.themeItem} onClick={() => onExpandSwitch({ namespace })}>
                <div className={configStyle.left}>
                  <div className={expand ? configStyle.iconExpand : configStyle.icon}>
                    {ArrorRightOutlined}
                  </div>
                  <div className={configStyle.title}>
                    {title}
                  </div>
                </div>
                <div
                  className={`${configStyle.icon}${!editId && namespace === editNamespace ? ` ${configStyle.iconActive}` : ''}`}
                  data-mybricks-tip={`{content:'新建主题',position:'left'}`}
                  onClick={(e) => actionOperate(e, { namespace }, 'add')}
                >
                  {PlusOutlined}
                </div>
              </div>

              <div className={`${configStyle.itemPanel}${expand ? ` ${configStyle.itemPanelOpen}` : ''}`}>
                {components.length ? components.map(({
                  id,
                  title,
                  themeId,
                  isDefault,
                  namespace
                }) => {
                  return (
                    <div key={id} className={`${configStyle.item}${editId ? (editId === id ? ` ${configStyle.itemActive}` : ``) : ''}`}>
                      <div className={configStyle.left}>
                        <div className={configStyle.name}>
                          <span data-mybricks-tip={title}>{title}</span>
                        </div>
                      </div>
                      <div className={configStyle.right}>
                        <div
                          data-mybricks-tip={isDefault ? '默认主题' : '设置为默认主题'}
                          className={`${configStyle.action}${isDefault ? ` ${configStyle.actionIsDefault}` : ''}`}
                          onClick={() => themeOperate({namespace, id}, 'default')}
                        >
                          {CircleCheckOutlined}
                        </div>
                        <div
                          data-mybricks-tip='编辑'
                          className={`${configStyle.action} ${configStyle.actionEdit}`}
                          onClick={(e) => actionOperate(e, { id, title, themeId, namespace }, 'edit')}
                        >
                          {EditOutlined}
                        </div>
                        <div
                          data-mybricks-tip='删除'
                          className={configStyle.action}
                          onClick={(e) => actionOperate(e, { id, namespace }, 'delete')}
                        >
                          {RemoveOutlined}
                        </div>
                      </div>
                    </div>
                  )
                }) : (
                  <div className={configStyle.empty}>
                    无定制组件，请添加
                  </div>
                )}
              </div>
            </div>
          )
        }) : (
          <div className={configStyle.empty}>
            请在画布中添加组件
          </div>
        )}
      </div>
    )
  }, [themes, themePanelFormData, themeExpandMap])

  return (
    <>
      {/* <div className={configStyle.toolbar}>
        <div className={configStyle.search}>
          <input
            type={'text'}
            placeholder={'请输入名称搜索主题'}
            onChange={onSearchValueChange}
          />
        </div>
      </div> */}
      {configThemeList}
      {/* {themePanel} */}
    </>
  )
}

function ThemePanel ({
  onOk,
  options,
  defaultValue,
  themeIdToThemeMap
}: any) {
  const idRef = useRef<HTMLDivElement>()
  const titleRef = useRef<HTMLDivElement>()
  const [formData] = useState({ ...defaultValue })
  const [saveLoading, setSaveLoading] = useState(false)

  const validate = useCallback(() => {
    const title = formData.title?.trim()
    const themeId = formData.themeId
    let result: any = {
      id: formData.id,
      namespace: formData.namespace,
      themeId,
      title
    }
    if (!title) {
      result = false
      titleRef.current.classList.add(configStyle.error)
    }
    if (!themeId) {
      result = false
      idRef.current.classList.add(configStyle.error)
    }

    return result
  }, [])

  const onSaveClick = useCallback(async () => {
    if (saveLoading) {
      return
    }
    const result = validate()
    if (result) {
      const messageKey = 'upload' + uuid()
      message.loading({ content: '预览图生成中...', key: messageKey });
      setSaveLoading(true)
      const { themeId } = result
      const option = options.find((option) => option.value === themeId)
      const dom = option.dom
      const copyDom = dom.cloneNode(true)

      copyDom.style.top = '0px'
      copyDom.style.left = '0px'
      copyDom.style.right = '0px'
      copyDom.style.bottom = '0px'
      copyDom.style.position = 'relative'
      copyDom.style.width = dom.offsetWidth
      copyDom.style.height = dom.offsetHeight
      copyDom.style.zIndex = '-1'

      const domParent = dom.parentElement
      domParent.appendChild(copyDom)

      domToImage.toSvg(copyDom, {
        filter: (dom) => {
          const className = dom.className
          if (typeof className === 'string' && className.startsWith('append-')) {
            return false
          }
          return true
        }
      })
        .then((dataUrl) => {
          const { id, styleAry } = themeIdToThemeMap[option.value]
          let innerText = '';

          // 这里需要将变量转换为具体的值设置，否则生成svg后样式丢失，变量没必要写入svg
          const cssVarToValueMap = getCssVarToValueMap()

          styleAry.forEach(({css, selector, global}) => {
            if (selector === ':root') {
              selector = '> *:first-child'
            }
            if (Array.isArray(selector)) {
              selector.forEach((selector) => {
                innerText = innerText + getStyleInnerText({id, css, selector, global, cssVarToValueMap})
              })
            } else {
              innerText = innerText + getStyleInnerText({id, css, selector, global, cssVarToValueMap})
            }
          })

          API.Upload.toOss({
            content: dataUrl.replace('data:image/svg+xml;charset=utf-8,', '').replace(`<foreignObject`, `<style>${innerText}</style><foreignObject`),
            folderPath: '/theme_pack_app',
            fileName: `${uuid()}_${themeId}.svg`
          }).then((value: any) => {
            result.previewUrl = value.url
            // function copyText(txt: string): boolean {
            //   const input = document.createElement('input')
            //   document.body.appendChild(input)
            //   input.value = txt
            //   input.select()
            //   document.execCommand('copy')
            //   document.body.removeChild(input)
            //   return true
            // }
            // copyText(value.url)
            message.destroy(messageKey)
            setSaveLoading(false)
            onOk(result)
          }).catch((error) => {
            console.error('预览图上传失败: ', error)
            setSaveLoading(false)
            onOk(result)
          })
        })
        .catch((error) => {
          console.error('截图失败: ', error)
          setSaveLoading(false)
          onOk(result)
        })
        .finally(() => {
          domParent.removeChild(copyDom)
        })
    }
  }, [saveLoading])

  const onTitleInputChange = useCallback((e) => {
    const value = e.target.value.trim()
    formData.title = value
    if (!value.length) {
      titleRef.current.classList.add(configStyle.error)
    } else {
      titleRef.current.classList.remove(configStyle.error)
    }
  }, [])

  const onSelectChange = useCallback((value) => {
    formData.themeId = value
    idRef.current.classList.remove(configStyle.error)
  }, [])

  return (
    <div className={configStyle.popView}>
      <div className={configStyle.toolbar}>
        <Button type='primary' onClick={onSaveClick}>保存</Button>
      </div>
      <div className={configStyle.form}>
        <div className={configStyle.formItem}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={titleRef}
            className={`${configStyle.editor} ${configStyle.textEdt}`}
            data-err={'请输入主题名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入主题名称'}
              defaultValue={formData.title}
              onChange={onTitleInputChange}
            />
          </div>
        </div>
        <div className={configStyle.formItem}>
          <label>
            <i>*</i>配置
          </label>
          <div
            ref={idRef}
            className={`${configStyle.editor} ${configStyle.textEdt}`}
            data-err={'请选择主题配置'}
          >
            <Select
              defaultValue={formData.themeId}
              placeholder='请选择主题'
              options={options}
              onChange={onSelectChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


// function ThemePanel ({
//   title,
//   onOk,
//   onCancel,
//   style,
//   options,
//   defaultValue,
//   container
// }: any) {
//   const idRef = useRef<HTMLDivElement>()
//   const titleRef = useRef<HTMLDivElement>()
//   const [formData] = useState({ ...defaultValue })
//   const [saveLoading, setSaveLoading] = useState(false)

//   const validate = useCallback(() => {
//     const title = formData.title?.trim()
//     const themeId = formData.themeId
//     let result: any = {
//       id: formData.id,
//       namespace: formData.namespace,
//       themeId,
//       title
//     }
//     if (!title) {
//       result = false
//       titleRef.current.classList.add(configStyle.error)
//     }
//     if (!themeId) {
//       result = false
//       idRef.current.classList.add(configStyle.error)
//     }

//     return result
//   }, [])

//   const onSaveClick = useCallback(async () => {
//     if (saveLoading) {
//       return
//     }
//     const result = validate()
//     if (result) {
//       const messageKey = 'upload' + uuid()
//       message.loading({ content: '预览图生成中...', key: messageKey });
//       setSaveLoading(true)
//       const { themeId } = result
//       const option = options.find((option) => option.value === themeId)
//       const dom = option.dom
//       // console.time('克隆耗时: ')
//       const copyDom = dom.cloneNode(true)

//       copyDom.style.top = '0px'
//       copyDom.style.left = '0px'
//       copyDom.style.right = '0px'
//       copyDom.style.bottom = '0px'
//       copyDom.style.position = 'relative'
//       copyDom.style.width = 'fit-content'
//       copyDom.style.height = 'fit-content'
//       copyDom.style.zIndex = '-1'

//       const domParent = dom.parentElement.parentElement
//       domParent.appendChild(copyDom)
//       // console.timeEnd('克隆耗时: ')

//       // console.time('截图耗时: ')
//       domToImage.toSvg(copyDom)
//         .then((dataUrl) => {
//           // console.timeEnd('截图耗时: ')
//           domParent.removeChild(copyDom)

//           API.Upload.toOss({
//             content: dataUrl.replace('data:image/svg+xml;charset=utf-8,', ''),
//             folderPath: '/theme_pack_app',
//             fileName: `${uuid()}_${themeId}.svg`
//           }).then((value: any) => {
//             result.previewUrl = value.url
//             message.destroy(messageKey)
//             setSaveLoading(false)
//             onOk(result)
//           }).catch((error) => {
//             console.error('预览图上传失败: ', error)
//             setSaveLoading(false)
//             onOk(result)
//           })
//         })
//         .catch((error) => {
//           console.error('截图失败: ', error)
//           setSaveLoading(false)
//           onOk(result)
//         })

//       // domToImage.toPng(option.dom.firstChild)
//       //   .then((dataUrl) => {
//       //     const binaryString = window.atob(dataUrl.split(',')[1])
//       //     const length = binaryString.length
//       //     const binaryArray = new Uint8Array(length)

//       //     for (let i = 0; i < length; i++) {
//       //       binaryArray[i] = binaryString.charCodeAt(i)
//       //     }
//       //     API.Upload.toOss({
//       //       // @ts-ignore
//       //       content: binaryArray,
//       //       folderPath: '/theme_pack_app',
//       //       fileName: `${uuid()}_${themeId}.png`
//       //     }).then((value: any) => {
//       //       result.previewUrl = value.url
//       //       message.destroy(messageKey)
//       //       setSaveLoading(false)
//       //       onOk(result)
//       //     }).catch((error) => {
//       //       console.error('预览图上传失败: ', error)
//       //       setSaveLoading(false)
//       //       onOk(result)
//       //     })
//       //   })
//       //   .catch((error) => {
//       //     console.error('截图失败: ', error)
//       //     setSaveLoading(false)
//       //     onOk(result)
//       //   })
//     }
//   }, [saveLoading])

//   const onTitleInputChange = useCallback((e) => {
//     const value = e.target.value.trim()
//     formData.title = value
//     if (!value.length) {
//       titleRef.current.classList.add(configStyle.error)
//     } else {
//       titleRef.current.classList.remove(configStyle.error)
//     }
//   }, [])

//   const onSelectChange = useCallback((value) => {
//     formData.themeId = value
//     idRef.current.classList.remove(configStyle.error)
//   }, [])

//   return createPortal(
//     <div className={configStyle.themePanel} style={style} key={formData}>
//       <div className={configStyle.header}>
//         <div>
//           {title}
//         </div>
//         <div>
//           <Button onClick={onCancel}>关闭</Button>
//           <Button type='primary' onClick={onSaveClick}>保存</Button>
//         </div>
//       </div>
//       <div className={configStyle.form}>
//         <div className={configStyle.formItem}>
//           <label>
//             <i>*</i>名称
//           </label>
//           <div
//             ref={titleRef}
//             className={`${configStyle.editor} ${configStyle.textEdt}`}
//             data-err={'请输入主题名称'}
//           >
//             <input
//               type={'text'}
//               placeholder={'请输入主题名称'}
//               defaultValue={formData.title}
//               onChange={onTitleInputChange}
//             />
//           </div>
//         </div>
//         <div className={configStyle.formItem}>
//           <label>
//             <i>*</i>配置
//           </label>
//           <div
//             ref={idRef}
//             className={`${configStyle.editor} ${configStyle.textEdt}`}
//             data-err={'请选择主题配置'}
//           >
//             <Select
//               defaultValue={formData.themeId}
//               placeholder='请选择主题'
//               options={options}
//               onChange={onSelectChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>,
//     // document.body
//     container
//   )
// }

function getStyleInnerText ({id, css, selector, global, cssVarToValueMap}) {
  return `
    ${global ? '' : `.${id} `}${selector.replace(/\{id\}/g, `${id}`)} {
      ${Object.keys(css).map(key => {
        let value = css[key]
        if (typeof value === 'string' && value.startsWith('var')) {
          const varValue = cssVarToValueMap[value]
          if (varValue) {
            value = varValue
          }
        }
        return `${convertCamelToHyphen(key)}: ${value}${/!important/.test(value) ? '' : '!important'};`
      }).join('\n')}
    }
  `
}

function convertCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function getCssVarToValueMap () {
  const result = {}
  window['MYBRICKS_CSS_VARIABLE_LIST'].forEach(({options}) => {
    options.forEach(({value, resetValue}) => {
      result[value] = resetValue
    })
  })
  return result
}
