import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import { FullscreenOutlined } from '@ant-design/icons'
import MonacoEditor from '@mybricks/code-editor'
import css from './index.less'

const ICONS = {
  min: (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6239"
      width="12"
      height="12"
    >
      <path
        d="M78.633918 396.690788l858.20393 0 0 158.309562-858.20393 0 0-158.309562Z"
        p-id="6240"
      ></path>
    </svg>
  ),
  recover: (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3949"
      width="12"
      height="12"
    >
      <path
        d="M739.95130434 284.04869566v658.32336695H81.62793739V284.04869566h658.32336695m0.60787015-75.98376812H80.4121971c-41.33516985 0-75.37589797 33.43285797-75.37589797 75.37589797V943.5878029c0 41.33516985 33.43285797 75.37589797 75.37589797 75.37589797h660.14697739c41.33516985 0 75.37589797-33.43285797 75.37589797-75.37589797V283.44082551c0-41.94304-33.43285797-75.37589797-75.37589797-75.37589797z"
        p-id="3950"
        fill="#555555"
      ></path>
      <path
        d="M944.19567304 5.64416928H282.83295536c-41.33516985 0-74.16015768 33.43285797-74.76802782 74.16015768v77.1995084h75.98376812V81.62793739h658.32336695v658.32336695h-75.98376812V815.93507246H943.5878029c41.33516985 0 74.16015768-33.43285797 74.76802782-74.76802782V79.80432696c0-40.72729971-33.43285797-74.16015768-74.16015768-74.16015768z"
        p-id="3951"
        fill="#555555"
      ></path>
    </svg>
  ),
  close: (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7239"
      width="12"
      height="12"
    >
      <path
        d="M426.1888 522.717867L40.004267 136.533333 136.533333 40.004267l386.184534 386.184533L908.9024 40.004267 1005.431467 136.533333 619.178667 522.717867l386.184533 386.184533-96.529067 96.529067L522.717867 619.178667 136.533333 1005.431467 40.004267 908.9024l386.184533-386.184533z"
        p-id="7240"
      ></path>
    </svg>
  ),
}

const languageMap: { [language: string]: string } = {
  jsx: 'javascript',
}

export default function ({
  value = '',
  title = '',
  onChange = (val: string) => {},
  language = 'javascript',
  comments = '',
  readonly = false,
  enableFullscreen = true,
  CDN,
  popView,
  ...extraOpt
}): JSX.Element {
  const commentRef: any = useRef()
  const editorRef = useRef<MonacoEditor>()

  const [model, setModel] = useState({
    commentVisible: true,
    commentHeight: comments ? 400 : 0,
    icon: 'min',
    iconsVisible: false,
    modalVisible: false,
  })

  const onClose = () => {
    onChange?.(editorRef.current?.getValue())
    setModel((c) => ({ ...c, iconsVisible: false, modalVisible: false }))
  }

  const onIconClick = (type: string) => {
    if (type === 'recover') {
      setModel((c) => ({ ...c, commentHeight: 0 }))
    } else {
      setModel((c) => ({ ...c, commentHeight: 400 }))
    }
    setModel((c) => ({ ...c, icon: type }))
  }

  const onMonacoMounted = (editor: any) => {
    editorRef.current = editor
  }

  const onFormatIconClick = useCallback(() => {
    editorRef.current?.getAction?.(['editor.action.formatDocument'])._run()
  }, [editorRef.current])

  const renderToolbar = useMemo(() => {
    return (
      <div className={css['editor-code__modal-toolbar']}>
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3890"
          width="24"
          height="24"
          onClick={onFormatIconClick}
        >
          <path
            d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z"
            p-id="3891"
          ></path>
        </svg>
      </div>
    )
  }, [])

  const onBlur = useCallback(
    (editor, monaco, container) => {
      if (monaco) {
        onChange?.(editor.getValue())
      }
    },
    [onChange]
  )

  const open = useCallback(() => {
    if (!model.modalVisible) {
      setModel((c) => ({ ...c, modalVisible: true }))
      popView(
        title,
        () => {
          return (
            <div className={css['editor-code__modal']}>
              {renderToolbar}
              {
                <>
                  <div
                    style={{
                      height: `calc(100% - ${model.commentHeight + 30}px)`,
                    }}
                  >
                    <MonacoEditor
                      {...extraOpt}
                      onMounted={onMonacoMounted}
                      value={value}
                      readOnly={readonly}
                      onChange={handleChange}
                      CDN={CDN}
                      onBlur={onBlur}
                      height="100%"
                      width="100%"
                      language={languageMap[language] || language}
                      autoSave={true}
                    />
                  </div>
                  {comments && (
                    <>
                      <div
                      // className={css.sperH}
                      // onMouseDown={evt(moveConsole).stop}
                      // onClick={evt().stop}
                      />
                      <div className={css.icons}>
                        <div className={css['icons__left']}>注释</div>
                        <div className={css['icons__right']}>
                          {model.icon === 'min' && (
                            <div onClick={() => onIconClick('recover')}>
                              {ICONS.min}
                            </div>
                          )}
                          {model.icon === 'recover' && (
                            <div onClick={() => onIconClick('min')}>
                              {ICONS.recover}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        ref={commentRef}
                        style={{ height: model.commentHeight }}
                      >
                        <MonacoEditor
                          value={comments}
                          readOnly
                          CDN={CDN}
                          width="100%"
                          height="100%"
                          lineNumbers="off"
                          language={languageMap[language] || language}
                          useExtraLib={false}
                        />
                      </div>
                    </>
                  )}
                </>
              }
            </div>
          )
        },
        {
          onClose,
        }
      )
    }
  }, [model, value, readonly, comments, CDN, title, extraOpt, language])

  const handleChange = useCallback((v: string, e: any) => {
    onChange?.(v)
  }, [])

  return (
    <div className={css['editor-code']}>
      <div className={css['editor-code__container']}>
        <div className={css['editor-code__modal']}>
          <div className={css['editor-code__header']}>
            {renderToolbar}
            <div className={css['editor-code__title']}>{title}</div>
            {enableFullscreen && (
              <div>
                <div className={css.action} onClick={open}>
                  <FullscreenOutlined />
                </div>
              </div>
            )}
          </div>
          {!model.modalVisible && (
            <>
              <MonacoEditor
                width="100%"
                height="100%"
                {...extraOpt}
                onMounted={onMonacoMounted}
                value={value}
                readOnly={readonly}
                onChange={handleChange}
                CDN={CDN}
                onBlur={onBlur}
                className={css['editor-code__min-container']}
                language={languageMap[language] || language}
                autoSave={true}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
