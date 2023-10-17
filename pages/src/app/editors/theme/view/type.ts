import type { CSSProperties } from 'react'

export interface CSSFromStyle {
  selector: string
  css: CSSProperties
}

export interface Component {
  id: string
  title: string
  dom: HTMLDivElement
  def: {
    namespace: string
    version: string
    title: string
  }
  model: {
    css?: Array<CSSFromStyle>
  }
  slots?: Array<Slot>
}

export interface Slot {
  id: string
  type: string
  title: string
  style: any
  comAry: Array<Component>
}

export interface RenderProps {
  component: {
    // 获取页面内所有组件
    getAll: () => Array<Slot>
  }
  themes: {
    // 设置组件风格
    setComThemes: (comThemes: Array<ComTheme>) => void

    // 设置css变量
    setCSSVar: (key: string, value: string) => void

    // 清除css变量
    removeCSSVar: (key: string) => void

    // 一次性清除所有css变量
    clearCSSVar: () => void

    // 获取css变量值
    getCSSVar: (key: string) => string
  }
}

export interface ComTheme {
  id: string
  title: string
  themeId: string
  styleAry: Array<CSSFromStyle>
  isDefault: boolean
  namespace: string
}

export interface Data {
  themes: Array<{
    namespace: string
    components: Array<ComTheme>
  }>
  variables: Array<{
    id: string
    configs: Array<{
      name?: string
      key: string
      value: string
    }>
  }>
}
