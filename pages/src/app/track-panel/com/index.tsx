import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import CodeEditor from '../components/code-editor'
import { CodeTemplate } from './../../constant'
import css from './index.less'

const popViewRootElement = document.createElement('div');
document.body.appendChild(popViewRootElement)

const popView = (title, render) => {
  const close = () => {
    ReactDOM.unmountComponentAtNode(popViewRootElement)
  }

  return ReactDOM.render((
    <div className={css.modal}>
      <div className={css.mask} onClick={close}/>
      <div className={css.body}>
        <div className={css.header}>
          <div>
            <svg onClick={close} t="1634129353244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7239" width="16" height="16"><path d="M426.1888 522.717867L40.004267 136.533333 136.533333 40.004267l386.184534 386.184533L908.9024 40.004267 1005.431467 136.533333 619.178667 522.717867l386.184533 386.184533-96.529067 96.529067L522.717867 619.178667 136.533333 1005.431467 40.004267 908.9024l386.184533-386.184533z" p-id="7240"></path></svg>
          </div>
          <span>{title}</span>
        </div>
        {render()}
      </div>
    </div>
  ), popViewRootElement)
}

enum CNType {
  'CLK' = '点击',
  'EXP' = '曝光',
}

const getCNType = (type) => {
  return CNType[type] ?? type
}

const Panel = ({ title, extra, children }) => {
  return (
    <div className={css.panel}>
      <div className={css.header}>
        <div className={css.title}>{title}</div>
        <div className={css.extra}>{extra}</div>
      </div>
      {children}
    </div>
  )
}

const Track = ({ type, title, id, value, onChange }) => {

  return (
    <div className={css.track}>
      <CodeEditor
        // title={title}
        language={'javascript'}
        comments={CodeTemplate.Track.Com.Comment}
        initValue={value}
        onBlur={(editor) => onChange?.({ id, type, func: editor.getValue()})}
        // onChange={(v) => onChange?.({ id, type, func: v })}
        popView={popView}
        // CDN={defaultOptions.CDN}
        height={'80px'}
      />
    </div>
  )
}

const MutiTrack = ({ spm, comSpmDefines, onChange }) => {
  const [active, setActive] = useState(0)

  const hasMutiType = Array.isArray(spm.type) && spm.type.length > 1;

  const extra = (
    <div className={css.types}>
      {hasMutiType ? (
        spm.type.map((t, index) => {
          return (
            <div
              className={active === index ? css.typeActive : css.type}
              onClick={() => setActive(index)}
            >
              {getCNType(t)}
            </div>
          )
        })
      ) : (
        <div className={css.typeActive} style={{ cursor: 'default' }}>
          自定义
        </div>
      )}
    </div>
  )

  return (
    <Panel title={spm.title} extra={extra}>
      {hasMutiType ? (
        spm.type.map((type, index) => {
          return (
            <div style={{ display: active === index ? 'block' : 'none' }}>
              <Track
                key={index + type}
                title={spm.title + `【${getCNType(type)}】`}
                type={type}
                id={spm.id}
                value={comSpmDefines.find((d) => d.id === spm.id && d.type === type)?.func}
                onChange={onChange}
              />
            </div>
          )
        })
      ) : (
        <Track
          title={spm.title}
          type={spm.type}
          id={spm.id}
          value={comSpmDefines.find((d) => d.id === spm.id)?.func}
          onChange={onChange}
        />
      )}
    </Panel>
  )
}

// 留着，说不定有用
const flattenSpms = (spms) => {
  return spms.reduce((acc, cur) => {
    if (Array.isArray(cur.type) && cur.type.length > 0) {
      return acc.concat(
        cur.type.map((type) => {
          return {
            id: cur.id,
            title: cur.title,
            type,
            func: cur.func,
          }
        })
      )
    }

    return acc.concat({
      id: cur.id,
      title: cur.title,
      func: cur.func,
    })
  })
}

export default ({ initValues, configs, onChange }) => {
  const [comSpmDefines, setComSpmDefines] = useState(initValues ?? [])

  useEffect(() => {
    onChange?.(comSpmDefines)
  }, [comSpmDefines])

  const setComSpm = useCallback(({ id, type, func }) => {
    setComSpmDefines((c) => {
      const targetSpmDefine = c.find((spmDefine) => spmDefine.id === id && spmDefine.type === type)

      if (targetSpmDefine) {
        targetSpmDefine.func = func
        return Array.from(c)
      }
      return c.concat({ id, type, func })
    })
  }, [])

  return (
    <div className={css.trackPanel}>
      {configs?.map((spm) => {
        return (
          <div style={{ marginBottom: 15 }}>
            <MutiTrack
              spm={spm}
              comSpmDefines={comSpmDefines}
              onChange={(define) => setComSpm(define)}
            />
          </div>
        )
      })}
    </div>
  )
}
