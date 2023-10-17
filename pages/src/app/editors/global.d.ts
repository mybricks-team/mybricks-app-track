declare module '*.less' {
	const classes: { [key: string]: string }
	export default classes
}

interface Window {
  MYBRICKS_CSS_VARIABLE_LIST: Array<{
		title: string
		options: Array<{
			label: string
			value: string
			resetValue: string
		}>
	}>
}
