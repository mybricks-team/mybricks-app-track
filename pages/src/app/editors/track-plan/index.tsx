import React, { useEffect, useState } from 'react';
import Editor from '@mybricks/code-editor'
import FullScreen from './components/full-screen';
import css from './index.less'

const Panel = ({ title, children }) => {
  return (
    <div className={css.panel}>
      <div className={css.title}>{title}</div>
      {children}
    </div>
  )
}

export default ({ editConfig, designer }) => {
  const { value } = editConfig;

  const [state, setState] = useState(value.get() ?? {});

  useEffect(() => {
    value.set(state)
  }, [state])

  return (
    <div className={css.track}>
      {/* <Editor 
        width={500} 
        height={400}
        fontSize={12}
        language="javascript"
        // theme="vs-dark"
      /> */}
      <Panel title={'注入SDK'}>
        <FullScreen>
          <Editor
            onMounted={(editor, monaco, container: HTMLDivElement) => {
              // paramRef.current = container;
              console.log('container', container)
              container.onclick = (e) => {
                if (e.target === container) {
                  // onParamsEditorFullscreenExit();
                }
              };
            }}
            width='100%'
            height='100%'
            minHeight={300}
            fontSize={12}
            language="html"
            value={state.initial}
            onChange={v => {
              setState(c => ({ ...c, initial: v }))
            }}

            theme='light'
            lineNumbers='off'
            /** @ts-ignore */
            scrollbar={{
              horizontalScrollbarSize: 2,
              verticalScrollbarSize: 2,
            }}
            minimap={{ enabled: false }}
            // theme="vs-dark"
          />
        </FullScreen>
      </Panel>
      {/* <Panel title={'生命周期'}>
        <Editor 
          // width={500} 
          height={200}
          fontSize={12}
          language="javascript"
          // theme="vs-dark"
        />
      </Panel> */}

    </div>
  )
}