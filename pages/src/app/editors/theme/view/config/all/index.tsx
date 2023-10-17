import React, {
  useRef,
  useMemo,
  useState,
  useCallback
} from 'react'
import { createPortal } from 'react-dom'

import { generate } from '@ant-design/colors'

import {
  Toggle,
  Button,
  Colorpicker,
  PlusOutlined,
  RemoveOutlined,
  ArrorRightOutlined
} from '../../compoments'
import { uuid } from '../../../../utils'

import { useThemeEditorContext, MYBRICKS_VARIABLE_CSS_CONFIG, SET_MYBRICKS_CSS_VARIABLE_LIST } from '../../../index'

import css from './index.less'

const MYBRICKS_VARIABLE_CSS_TITLES = ['主题色分类', '成功色分类', '错误色分类', '警告色分类', '信息色分类']
const ColorIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><path d="M5.12244 13.2087L14.4632 20.0582C15.151 20.746 17.2416 19.7702 19.1332 17.8787C21.0248 15.9871 22.0005 13.8965 21.3127 13.2087L14.4632 3.86792"></path><path d="M11.6601 10.4063C14.2394 7.82703 15.4939 4.89976 14.4622 3.86806C13.4305 2.83635 10.5032 4.09089 7.92396 6.67016C5.34469 9.24942 4.09015 12.1767 5.12185 13.2084C6.15356 14.2401 9.08083 12.9856 11.6601 10.4063Z"></path><path d="M3 20.2387C3 19.2657 4.76125 16.7162 4.76125 16.7162C4.76125 16.7162 6.5225 19.2657 6.5225 20.2387C6.5225 21.2118 5.73434 22 4.76125 22C3.78816 22 3 21.2118 3 20.2387Z"></path><path d="M14.4481 12.3131H17.9706C18.9631 12.3131 19.8597 11.9026 20.5 11.2421C21.1147 10.608 21.4931 9.74347 21.4931 8.79063C21.4931 6.84533 19.9159 5.26813 17.9706 5.26813H15.4899"></path></svg>
const TextIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><path d="M12 4H4V8.44444M12 4H20V8.44444M12 4V20M12 20H15.5556M12 20H8.44444"></path></svg>
const BorderIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><path d="M10 3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V10"></path><path d="M10 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V14"></path><path d="M14 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V10"></path><path d="M14 20.5H18.5C19.6046 20.5 20.5 19.6046 20.5 18.5V14"></path></svg>
const BoxShadowIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><circle cx="11.8304" cy="12.3307" r="2.83333"></circle><path d="M11.8333 5.66667V3M11.8333 21.6667V19M21.1667 12.3333H18.5M5.16667 12.3333H2.5M16.5475 7.61929L18.4331 5.73368M5.23372 18.933L7.11934 17.0474M18.4328 18.933L16.5472 17.0474M7.11937 7.61929L5.23375 5.73367"></path></svg>
const FilterIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><circle opacity="0.4" cx="8" cy="15.5" r="5.5"></circle><circle opacity="0.7" cx="16" cy="15.5" r="5.5"></circle><circle cx="12" cy="8.5" r="5.5"></circle></svg>
const CSS_MODE_OPTIONS = [
  { label: ColorIcon, value: 'color', tip: '颜色' },
  { label: TextIcon, value: 'text', tip: '文字', disabled: true },
  { label: BorderIcon, value: 'border', tip: '边框', disabled: true },
  { label: BoxShadowIcon, value: 'boxShadow', tip: '阴影', disabled: true },
  { label: FilterIcon, value: 'filter', tip: '滤镜', disabled: true }
]

export function DesignAll () {
  const [cssMode, setCssMode] = useState('color')

  return (
    <>
      <div className={css.cssModeSelect}>
        <Toggle
          defaultValue={cssMode}
          onChange={() => {}}
          options={CSS_MODE_OPTIONS}
        />
      </div>
      <ThemeContainer title='常规主题'>
        <GeneralTheme />
      </ThemeContainer>
      <ThemeContainer title='扩展色'>
        <CustomVariables />
      </ThemeContainer>
    </>
  )
}

function ThemeContainer ({ children, title }) {
  return (
    <div className={css.themeContainer}>
      <div className={css.themeTitle}>{title}</div>
      <div className={css.themeList}>
        {children}
      </div>
    </div>
  )
}

function GeneralTheme () {
  const { data, themes } = useThemeEditorContext()

  useMemo(() => {
    console.log('主题包配置: ', data)
  }, [])

  const [expandMap, setExpandMap] = useState({
    '--mybricks-primary-color': true,
    '--mybricks-success-color': true,
    '--mybricks-error-color': true,
    '--mybricks-warning-color': true,
    '--mybricks-info-color': true
  })

  const onTitleClick = useCallback((id) => {
    setExpandMap((expandMap) => {
      return {
        ...expandMap,
        [id]: !expandMap[id]
      }
    })
  }, [])

  const onColorChange = useCallback(({ id, color, items }: { id, color, items?}) => {
    themes.setCSSVar(id, color)
    // TODO
    const config = data.variables[0].configs.find(({ key }) => key === id)
    config.value = color
    // 自动计算
    if (Array.isArray(items)) {
      generateColors({ data, themes, primaryColor: color, children: items })
    }

    SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
  }, [])

  return (
    <>
      {MYBRICKS_VARIABLE_CSS_CONFIG.map(({ id, title, items }, index) => {
        const open = expandMap[id]
        return (
          <div className={css.catelogGroup}>
            <div className={css.catelogTitle} onClick={() => onTitleClick(id)}>
              <div
                className={`${css.switchIcon}${open ? ` ${css.switchIconOpen}` : ''}`}
              >
                {ArrorRightOutlined}
              </div>
              <div>{MYBRICKS_VARIABLE_CSS_TITLES[index]}</div>
            </div>
            <div className={`${css.catelogContent} ${open ? css.catelogContentOpen : css.catelogContentHidden}`}>
              <Colorpicker value={themes.getCSSVar(id)} onChange={(color) => onColorChange({ id, color, items })}>
                <div className={css.catelogContentItem} data-mybricks-tip={`修改${title}将自动计算相应色值`}>
                  <div className={css.catelogContentItemInfo}>
                    <div
                      className={css.colorBlock}
                      style={{backgroundColor: themes.getCSSVar(id)}}
                    />
                    <div>{title}-默认</div>
                  </div>
                </div>
              </Colorpicker>
              {Array.isArray(items) && items.map(({ id, title: childTitle }) => {
                return (
                  <Colorpicker value={themes.getCSSVar(id)} onChange={(color) => onColorChange({ id, color })}>
                    <div className={css.catelogContentItem}>
                      <div className={css.catelogContentItemInfo}>
                        <div
                          className={css.colorBlock}
                          style={{backgroundColor: themes.getCSSVar(id)}}
                        />
                        <div>{title}-{childTitle}</div>
                      </div>
                    </div>
                  </Colorpicker>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

function CustomVariables () {
  const { data, themes } = useThemeEditorContext()
  const [variables, setVariables] = useState(data.variables[2].configs)
  const [variableConfigPanelOpen, setVariableConfigPanelOpen] = useState(false)
  const [variableConfigPanelFormData, setVariableConfigPanelFormData] = useState(null)

  const onAddClick = useCallback(() => {
    setVariableConfigPanelOpen(true)
    setVariableConfigPanelFormData(null)
  }, [])

  const onEditClick = useCallback((formData) => {
    setVariableConfigPanelOpen(true)
    setVariableConfigPanelFormData(formData)
  }, [])

  const onDeleteClick = useCallback((e, { key }) => {
    e.stopPropagation()

    const variables = data.variables[2].configs
    const index = variables.findIndex((variable) => variable.key === key)
    variables.splice(index, 1)
    data.variables[2].configs = variables
    SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
    setVariables([...variables])

    if (key === variableConfigPanelFormData?.key) {
      onVariableConfigPanelCancel()
    }

    themes.removeCSSVar(key)
  }, [variableConfigPanelFormData])

  const onVariableConfigPanelOk = useCallback(({ key, name, value }) => {
    setVariables((variables) => {
      const index = variables.findIndex((variable) => variable.key === key)
      if (index !== -1) {
        // 编辑
        variables.splice(index, 1, { key, name, value })
        data.variables[2].configs = variables
        SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
        return [...variables]
      } else {
        // 新增
        const finalVariables = variables.concat({ key, name, value })
        data.variables[2].configs = finalVariables
        SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
        return finalVariables
      }
    })

    onVariableConfigPanelCancel()
  }, [])

  const onVariableConfigPanelCancel = useCallback(() => {
    setVariableConfigPanelOpen(false)
    setVariableConfigPanelFormData(null)
  }, [])

  const themePanel = useMemo(() => {
    if (variableConfigPanelOpen) {
      const { id, key } = variableConfigPanelFormData || {}
      const container = document.querySelector('div[class^="lyStage-"]')

      return (
        <div key={id + key}>
          <ThemePanel
            title={`${id ? '编辑' : '新建'}自定义变量`}
            onOk={onVariableConfigPanelOk}
            defaultValue={variableConfigPanelFormData}
            onCancel={onVariableConfigPanelCancel}
            container={container}
            style={{ right: 0}}
          />
        </div>
      )
    }

    return null
  }, [variableConfigPanelOpen, variableConfigPanelFormData])

  return (
    <div className={css.catelogGroup}>
      <div className={css.catelogContent}>
        {variables.map(({ key, name, value }) => {
          return (
            <div className={css.catelogContentItem} onClick={() => onEditClick({ key, name, value })}>
              <div className={css.catelogContentItemInfo}>
                <div
                  className={css.colorBlock}
                  style={{backgroundColor: themes.getCSSVar(key)}}
                />
                <div>{name}</div>
              </div>
              <div className={css.catelogContentItemAction}>
                <div className={css.catelogContentItemActionIcon} onClick={(e) => onDeleteClick(e, { key })}>
                  {RemoveOutlined}
                </div>
              </div>
            </div>
          )
          })}
          <div className={`${css.catelogContentItem} ${css.center}`} data-mybricks-tip='添加变量' onClick={onAddClick}>
            <div className={`${css.circel} ${css.addIcon}`}>
              {PlusOutlined}
            </div>
          </div>
        </div>
      {themePanel}
    </div>
  )
}

function ThemePanel ({
  title,
  onOk,
  onCancel,
  style,
  // options,
  defaultValue,
  container
}: any) {
  const nameRef = useRef<HTMLDivElement>()
  const [formData] = useState({ ...defaultValue })
  // const [edit] = useState(formData.key)
  const [color, setColor] = useState(defaultValue?.value || '#ffffff')

  const validate = useCallback(() => {
    const name = formData.name?.trim()
    const key = formData.key?.trim()
    let result: any = {
      // id: formData.id,
      name,
      key,
      value: formData.value || '#ffffff'
    }
    if (!name) {
      result = false
      nameRef.current.classList.add(css.error)
    }

    if (result && (!key || !/^--[\w-]+$/.test(key))) {
      result.key = `--mybricks-${uuid()}-${uuid()}`
    }

    return result
  }, [])

  const onSaveClick = useCallback(() => {
    const result = validate()
    if (result) {
      onOk(result)
    }
  }, [])

  const onNameChange = useCallback((e) => {
    const value = e.target.value.trim()
    formData.name = value
    if (!value.length) {
      nameRef.current.classList.add(css.error)
    } else {
      nameRef.current.classList.remove(css.error)
    }
  }, [])

  // const onKeyChange = useCallback((e) => {
  //   const value = e.target.value.trim()
  //   formData.key = value
  // }, [])

  const onColorChange = useCallback(({ color }) => {
    formData.value = color
    setColor(color)
  }, [])

  return createPortal(
    <div className={css.themePanel} style={style} key={formData}>
      <div className={css.header}>
        <div>
          {title}
        </div>
        <div>
          <Button onClick={onCancel}>关闭</Button>
          <Button type='primary' onClick={onSaveClick}>保存</Button>
        </div>
      </div>
      <div className={css.form}>
        <div className={css.formItem}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={nameRef}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请输入变量名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入变量名称'}
              defaultValue={formData.name}
              onChange={onNameChange}
            />
          </div>
        </div>
        {/* {!edit && <div className={css.formItem}>
            <label>
              key
            </label>
            <div className={`${css.editor} ${css.textEdt}`}>
              <input
                type={'text'}
                placeholder={'不输入则自动生成(例: --xxx-x)'}
                defaultValue={formData.key}
                onChange={onKeyChange}
              />
            </div>
          </div>} */}
        <div className={css.formItem}>
          <label>
            颜色
          </label>
          <div className={`${css.editor} ${css.textEdt}`}>
            <Colorpicker value={color} onChange={(color) => onColorChange({ color })}>
              <div className={css.colorRectangle} style={{backgroundColor: color}}/>
            </Colorpicker>
          </div>
        </div>
      </div>
    </div>,
    // document.body
    container
  )
}

// TODO: antd 基于主色设计同色系颜色值
function generateColors ({
  data,
  themes,
  primaryColor,
  children
}) {
  const colors = generate(primaryColor)
  children?.forEach(item => {
    const { id, colorListIndex } = item
    themes.setCSSVar(id, colors[colorListIndex])
    const config = data.variables[0].configs.find(({ key }) => key === id)
    config.value = colors[colorListIndex]
  })
}
