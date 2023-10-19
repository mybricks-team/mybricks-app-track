import React, { useEffect, useState, useMemo } from 'react';
import CodeEditor from './../../track-panel/components/code-editor';
import css from './index.less'

export default ({ editConfig }) => {
  const { value, options, getDefaultOptions } = editConfig;

  const [state, setState] = useState(value.get() ?? '');

  const defaultOptions = useMemo(() => getDefaultOptions?.('code') ?? {}, []);

  useEffect(() => {
    value.set(state)
  }, [state])

  return (
    <div className={css.track}>
      <CodeEditor
        title={options?.title ?? '编辑代码'}
        language={options?.language ?? "javascript"}
        comments={options?.comments}
        initValue={state}
        onChange={v => setState(v)}
        popView={editConfig.popView}
        CDN={defaultOptions.CDN}
        height={options?.height ?? '300px'}
      />
    </div>
  )
}