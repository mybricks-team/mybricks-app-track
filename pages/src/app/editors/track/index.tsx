import React, { useEffect, useState } from 'react';
import CodeEditor from './../components/code-editor'
import css from './index.less'

export default ({ editConfig }) => {
  const { value, options } = editConfig;

  const [state, setState] = useState(value.get() ?? '')

  useEffect(() => {
    value.set(state)
  }, [state])

  return (
    <div className={css.track}>
      <CodeEditor
        title='编辑代码'
        language={options?.language ?? "javascript"}
        comments={options?.comments}
        value={state}
        onChange={v => setState(v)}
        popView={editConfig.popView}
        CDN={{}}
        height={'100px'}
        // theme="vs-dark"
      />
    </div>
  )
}