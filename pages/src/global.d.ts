declare module '*.less' {
	const classes: { [key: string]: string };
	export default classes;
}

interface Window {
  mybricks: {
		SPADesigner(props: any): React.JSX.Element
	}
}
