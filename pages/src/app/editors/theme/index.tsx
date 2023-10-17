import React, {
  useMemo,
  useContext,
  createContext
} from 'react'

import type { ReactNode } from 'react'

import { ConfigView } from './view'

import type { RenderProps, Data } from './view/type'

/** 获取默认css变量数组并设置antd@4.x css变量 */
function GET_DEFAULT_VARIABLES ({ themes: themesAPI }: { themes: RenderProps['themes'] }) {
  const variables = []
  const mybricksConfigs: Data['variables'][0]['configs'] = []

  MYBRICKS_VARIABLE_CSS_CONFIG.forEach(({ id, title, items }) => {
    mybricksConfigs.push({
      // id,
      // name: `${title}-默认`,
      key: id,
      value: MYBRICKS_VARIABLE_CSS[id]
    })

    if (Array.isArray(items)) {
      items.forEach(({ id, title: childTitle }) => {
        mybricksConfigs.push({
          // id,
          // name: `${title}-${childTitle}`,
          key: id,
          value: MYBRICKS_VARIABLE_CSS[id]
        })
      })
    }
  })

  variables.push({
    id: 'mybricks@theme',
    configs: mybricksConfigs
  })

  const antdConfigs: Data['variables'][0]['configs'] = []

  Object.entries(ANTD_VARIABLE_CSS).forEach(([ key, value ]) => {
    antdConfigs.push({
      // id: key,
      // name: key,
      key,
      value
    })
  })

  variables.push({
    id: 'antd@4.x',
    configs: antdConfigs
  })
  
  Object.entries(ANTD_VARIABLE_CSS).forEach(([ key, value ]) => {
    themesAPI.setCSSVar(key, value)
  })

  // TODO
  variables.push({
    id: 'custom@theme',
    configs: []
  })

  return variables
}

/** 设置mybrics css变量以及自定义 css 变量 */
export function SET_MYBRICKS_CSS_VARIABLE_LIST ({ data, themes: themesAPI }: { data: Data, themes: RenderProps['themes']}) {
  const { variables } = data
  
  const MYBRICKS_CSS_VARIABLE_LIST = []

  const mybricksConfig = variables.find(({ id }) => id === 'mybricks@theme').configs.reduce(( obj, item ) => {
    obj[item.key] = item.value
    return obj
  }, {})

  MYBRICKS_VARIABLE_CSS_CONFIG.forEach(({ id, title, items }, index) => {
    const resetValue = mybricksConfig[id]
    const options = [{
      label: `${title}-默认`,
      value: `var(${id})`,
      resetValue
    }]

    MYBRICKS_CSS_VARIABLE_LIST[index] = {
      title,
      options
    }

    themesAPI.setCSSVar(id, resetValue)

    if (Array.isArray(items)) {
      items.forEach(({ id, title: childTitle }) => {
        const resetValue = mybricksConfig[id]
        options.push({
          label: `${title}-${childTitle}`,
          value: `var(${id})`,
          resetValue
        })

        themesAPI.setCSSVar(id, resetValue)
      })
    }
  })

  const customConfigs = variables.find(({ id }) => id === 'custom@theme').configs
  const options = []
  MYBRICKS_CSS_VARIABLE_LIST.push({
    title: '自定义',
    options
  })
  customConfigs.forEach(({ name, key, value }) => {
    options.push({
      label: name,
      value: `var(${key})`,
      resetValue: value
    })
    themesAPI.setCSSVar(key, value)
  })

  window.MYBRICKS_CSS_VARIABLE_LIST = MYBRICKS_CSS_VARIABLE_LIST
}

const MYBRICKS_VARIABLE_PREFIX = 'mybricks'
/** mybricks定义css变量前缀 */
const MYBRICKS_VAR_PREFIX = `--${MYBRICKS_VARIABLE_PREFIX}-`

/** mybricks定义css变量 */
export const MYBRICKS_VARIABLE_CSS = {
  // 主色
  [`${MYBRICKS_VAR_PREFIX}primary-color`]: '#1890ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-hover`]: '#40a9ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active`]: '#096dd9',
  [`${MYBRICKS_VAR_PREFIX}primary-color-outline`]: 'rgba(24,144,255,0.2)',
  [`${MYBRICKS_VAR_PREFIX}primary-1`]: '#e6f7ff',
  [`${MYBRICKS_VAR_PREFIX}primary-2`]: '#bae7ff',
  [`${MYBRICKS_VAR_PREFIX}primary-3`]: '#91d5ff',
  [`${MYBRICKS_VAR_PREFIX}primary-4`]: '#69c0ff',
  [`${MYBRICKS_VAR_PREFIX}primary-5`]: '#40a9ff',
  [`${MYBRICKS_VAR_PREFIX}primary-6`]: '#1890ff',
  [`${MYBRICKS_VAR_PREFIX}primary-7`]: '#096dd9',
  // 主色废弃
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35`]: '#cbe6ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20`]: '#7ec1ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20`]: '#46a6ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50`]: '#8cc8ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12`]: 'rgba(24,144,255,0.12)',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30`]: 'rgba(230,247,255,0.3)',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02`]: '#dcf4ff',
  // 成功
  [`${MYBRICKS_VAR_PREFIX}success-color`]: '#52c41a',
  [`${MYBRICKS_VAR_PREFIX}success-color-hover`]: '#73d13d',
  [`${MYBRICKS_VAR_PREFIX}success-color-active`]: '#389e0d',
  [`${MYBRICKS_VAR_PREFIX}success-color-outline`]: 'rgba(82,196,26,0.2)',
  // 成功废弃
  [`${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg`]: '#f6ffed',
  [`${MYBRICKS_VAR_PREFIX}success-color-deprecated-border`]: '#b7eb8f',
  // 错误
  [`${MYBRICKS_VAR_PREFIX}error-color`]: '#ff4d4f',
  [`${MYBRICKS_VAR_PREFIX}error-color-hover`]: '#ff7875',
  [`${MYBRICKS_VAR_PREFIX}error-color-active`]: '#d9363e',
  [`${MYBRICKS_VAR_PREFIX}error-color-outline`]: 'rgba(255,77,79,0.2)',
  // 错误废弃
  [`${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg`]: '#fff2f0',
  [`${MYBRICKS_VAR_PREFIX}error-color-deprecated-border`]: '#ffccc7',
  // 警告
  [`${MYBRICKS_VAR_PREFIX}warning-color`]: '#faad14',
  [`${MYBRICKS_VAR_PREFIX}warning-color-hover`]: '#ffc53d',
  [`${MYBRICKS_VAR_PREFIX}warning-color-active`]: '#d48806',
  [`${MYBRICKS_VAR_PREFIX}warning-color-outline`]: 'rgba(250,173,20,0.2)',
  // 警告废弃
  [`${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg`]: '#fffbe6',
  [`${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border`]: '#ffe58f',
  // 信息
  [`${MYBRICKS_VAR_PREFIX}info-color`]: '#1890ff',
  // 信息废弃
  [`${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg`]: '#e6f7ff',
  [`${MYBRICKS_VAR_PREFIX}info-color-deprecated-border`]: '#91d5ff',
}

/** antd@4.x 废弃变量 */
const DEPRECATED_CSS_VARIABLE = {
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35`]: '#cbe6ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20`]: '#7ec1ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20`]: '#46a6ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50`]: '#8cc8ff',
  [`${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12`]: 'rgba(24,144,255,0.12)',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30`]: 'rgba(230,247,255,0.3)',
  [`${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02`]: '#dcf4ff',

  [`${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg`]: '#f6ffed',
  [`${MYBRICKS_VAR_PREFIX}success-color-deprecated-border`]: '#b7eb8f',

  [`${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg`]: '#fff2f0',
  [`${MYBRICKS_VAR_PREFIX}error-color-deprecated-border`]: '#ffccc7',

  [`${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg`]: '#fffbe6',
  [`${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border`]: '#ffe58f',

  [`${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg`]: '#e6f7ff',
  [`${MYBRICKS_VAR_PREFIX}info-color-deprecated-border`]: '#91d5ff',
}

/** 设置 antd@4.x 废弃变量 */
export function SET_DEPRECATED_CSS_VARIABLE ({ themes: themesAPI }: { themes: RenderProps['themes'] }) {
  Object.entries(DEPRECATED_CSS_VARIABLE).forEach(([ key, value ]) => {
    themesAPI.setCSSVar(key, value)
  })
}

/** mybricks定义css变量分类 */
export const MYBRICKS_VARIABLE_CSS_CONFIG = [
  {
    id: `${MYBRICKS_VAR_PREFIX}primary-color`,
    title: '主色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-color-hover`,
        title: '悬停',
        colorListIndex: 4
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-color-active`,
        title: '激活',
        colorListIndex: 6
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-color-outline`,
        title: '轮廓线',
        colorListIndex: 2
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-1`,
        title: '主色-1',
        colorListIndex: 0
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-2`,
        title: '主色-2',
        colorListIndex: 1
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-3`,
        title: '主色-3',
        colorListIndex: 2
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-4`,
        title: '主色-4',
        colorListIndex: 3
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-5`,
        title: '主色-5',
        colorListIndex: 4
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-6`,
        title: '主色-6',
        colorListIndex: 5
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}primary-7`,
        title: '主色-7',
        colorListIndex: 6
      },
      // 废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35`,
      //   title: 'l-35'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20`,
      //   title: 'l-20'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20`,
      //   title: 't-20'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50`,
      //   title: 't-50'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12`,
      //   title: 'f-12'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30`,
      //   title: 'f-30'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02`,
      //   title: 'd-02'
      // }
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}success-color`,
    title: '成功色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}success-color-hover`,
        title: '悬停',
        colorListIndex: 4,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}success-color-active`,
        title: '激活',
        colorListIndex: 6,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}success-color-outline`,
        title: '轮廓线',
        colorListIndex: 2,
      },
      // 废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg`,
      //   title: '背景'
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}success-color-deprecated-border`,
      //   title: '边框',
      // }
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}error-color`,
    title: '错误色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}error-color-hover`,
        title: '悬停',
        colorListIndex: 4,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}error-color-active`,
        title: '激活',
        colorListIndex: 6,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}error-color-outline`,
        title: '轮廓线',
        colorListIndex: 2,
      },
      // 错误废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg`,
      //   title: '背景',
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}error-color-deprecated-border`,
      //   title: '边框',
      // },
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}warning-color`,
    title: '警告色',
    items: [
      {
        id: `${MYBRICKS_VAR_PREFIX}warning-color-hover`,
        title: '悬停',
        colorListIndex: 4,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}warning-color-active`,
        title: '激活',
        colorListIndex: 6,
      },
      {
        id: `${MYBRICKS_VAR_PREFIX}warning-color-outline`,
        title: '轮廓线',
        colorListIndex: 2,
      },
      // 警告废弃
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg`,
      //   title: '背景',
      // },
      // {
      //   id: `${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border`,
      //   title: '边框',
      // },
    ]
  },
  {
    id: `${MYBRICKS_VAR_PREFIX}info-color`,
    title: '信息色',
    // items: [
    //   // 信息废弃
    //   {
    //     id: `${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg`,
    //     title: '背景'
    //   },
    //   {
    //     id: `${MYBRICKS_VAR_PREFIX}info-color-deprecated-border`,
    //     title: '边框',
    //   }
    // ]
  }
]

/** antd定义css变量 */
const ANTD_VARIABLE_CSS = {
  '--ant-primary-color': `var(${MYBRICKS_VAR_PREFIX}primary-color)`,
  '--ant-primary-color-hover': `var(${MYBRICKS_VAR_PREFIX}primary-color-hover)`,
  '--ant-primary-color-active': `var(${MYBRICKS_VAR_PREFIX}primary-color-active)`,
  '--ant-primary-color-outline': `var(${MYBRICKS_VAR_PREFIX}primary-color-outline)`,
  '--ant-primary-1': `var(${MYBRICKS_VAR_PREFIX}primary-1)`,
  '--ant-primary-2': `var(${MYBRICKS_VAR_PREFIX}primary-2)`,
  '--ant-primary-3': `var(${MYBRICKS_VAR_PREFIX}primary-3)`,
  '--ant-primary-4': `var(${MYBRICKS_VAR_PREFIX}primary-4)`,
  '--ant-primary-5': `var(${MYBRICKS_VAR_PREFIX}primary-5)`,
  '--ant-primary-6': `var(${MYBRICKS_VAR_PREFIX}primary-6)`,
  '--ant-primary-7': `var(${MYBRICKS_VAR_PREFIX}primary-7)`,
  // 废弃
  '--ant-primary-color-deprecated-l-35': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-35)`,
  '--ant-primary-color-deprecated-l-20': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-l-20)`,
  '--ant-primary-color-deprecated-t-20': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-20)`,
  '--ant-primary-color-deprecated-t-50': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-t-50)`,
  '--ant-primary-color-deprecated-f-12': `var(${MYBRICKS_VAR_PREFIX}primary-color-deprecated-f-12)`,
  '--ant-primary-color-active-deprecated-f-30': `var(${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-f-30)`,
  '--ant-primary-color-active-deprecated-d-02': `var(${MYBRICKS_VAR_PREFIX}primary-color-active-deprecated-d-02)`,
  // '--ant-primary-color-deprecated-l-35': '#cbe6ff',
  // '--ant-primary-color-deprecated-l-20': '#7ec1ff',
  // '--ant-primary-color-deprecated-t-20': '#46a6ff',
  // '--ant-primary-color-deprecated-t-50': '#8cc8ff',
  // '--ant-primary-color-deprecated-f-12': 'rgba(24,144,255,0.12)',
  // '--ant-primary-color-active-deprecated-f-30': 'rgba(230,247,255,0.3)',
  // '--ant-primary-color-active-deprecated-d-02': '#dcf4ff',
  '--ant-success-color': `var(${MYBRICKS_VAR_PREFIX}success-color)`,
  '--ant-success-color-hover': `var(${MYBRICKS_VAR_PREFIX}success-color-hover)`,
  '--ant-success-color-active': `var(${MYBRICKS_VAR_PREFIX}success-color-active)`,
  '--ant-success-color-outline': `var(${MYBRICKS_VAR_PREFIX}success-color-outline)`,
  // 废弃
  '--ant-success-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}success-color-deprecated-bg)`,
  '--ant-success-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}success-color-deprecated-border)`,
  // '--ant-success-color-deprecated-bg': '#f6ffed',
  // '--ant-success-color-deprecated-border': '#b7eb8f',
  '--ant-error-color': `var(${MYBRICKS_VAR_PREFIX}error-color)`,
  '--ant-error-color-hover': `var(${MYBRICKS_VAR_PREFIX}error-color-hover)`,
  '--ant-error-color-active': `var(${MYBRICKS_VAR_PREFIX}error-color-active)`,
  '--ant-error-color-outline': `var(${MYBRICKS_VAR_PREFIX}error-color-outline)`,
  // 废弃
  '--ant-error-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}error-color-deprecated-bg)`,
  '--ant-error-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}error-color-deprecated-border)`,
  // '--ant-error-color-deprecated-bg': '#fff2f0',
  // '--ant-error-color-deprecated-border': '#ffccc7',
  '--ant-warning-color': `var(${MYBRICKS_VAR_PREFIX}warning-color)`,
  '--ant-warning-color-hover': `var(${MYBRICKS_VAR_PREFIX}warning-color-hover)`,
  '--ant-warning-color-active': `var(${MYBRICKS_VAR_PREFIX}warning-color-active)`,
  '--ant-warning-color-outline': `var(${MYBRICKS_VAR_PREFIX}warning-color-outline)`,
  // 废弃
  '--ant-warning-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}warning-color-deprecated-bg)`,
  '--ant-warning-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}warning-color-deprecated-border)`,
  // '--ant-warning-color-deprecated-bg': '#fffbe6',
  // '--ant-warning-color-deprecated-border': '#ffe58f',
  '--ant-info-color': `var(${MYBRICKS_VAR_PREFIX}info-color)`,
  // 废弃
  '--ant-info-color-deprecated-bg': `var(${MYBRICKS_VAR_PREFIX}info-color-deprecated-bg)`,
  '--ant-info-color-deprecated-border': `var(${MYBRICKS_VAR_PREFIX}info-color-deprecated-border)`,
  // '--ant-info-color-deprecated-bg': '#e6f7ff',
  // '--ant-info-color-deprecated-border': '#91d5ff',

  '--antd-wave-shadow-color': 'var(--ant-primary-color)'
}

interface ThemeEditorProviderPropsValue extends RenderProps {
  data: Data
  popView: any
}

export interface ThemeEditorProviderProps {
  value: ThemeEditorProviderPropsValue
  children: ReactNode
}

const ThemeEditorContext = createContext<ThemeEditorProviderProps['value']>({} as any)

export function useThemeEditorContext () {
  const context = useContext(ThemeEditorContext)

  return context
}

function StyleEditorProvider ({children, value}: ThemeEditorProviderProps) {
  return (
    <ThemeEditorContext.Provider value={value}>
      {children}
    </ThemeEditorContext.Provider>
  )
}

export default function ThemeEditor ({ editConfig, designer, context }) {
  const themeContext = useMemo(() => {
    const { themes, components } = designer
    const { popView } = editConfig

    return {
      get data() {
        return context.theme
      },
      themes,
      component: {
        getAll: components.getAll
      },
      popView
    }
  }, [])

  useMemo(() => {
    const data = themeContext.data
    const { variables } = data
    const themes = themeContext.themes

    /**
     * TODO
     * 1. 目前默认支持antd样式，后续直接手动配置JSON？
     * 2. variables 给个默认值（不配置死）
     * 3. 后续全局配置分 系统自带、组件库配置，当前仅配置系统自带
     */
    if (!variables.length) {
      const variables = GET_DEFAULT_VARIABLES({ themes })
      data.variables = variables
    } else {
      GET_DEFAULT_VARIABLES({ themes })
    }

    SET_MYBRICKS_CSS_VARIABLE_LIST(themeContext)

    SET_DEPRECATED_CSS_VARIABLE({ themes })
  }, [])

  return {
    render: (
      <StyleEditorProvider value={themeContext}>
        <ConfigView />
      </StyleEditorProvider>
    )
  }
}
