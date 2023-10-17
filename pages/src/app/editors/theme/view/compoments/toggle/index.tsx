import React, {
  useState,
  ReactNode,
  useCallback
} from 'react'

import css from './index.less'
import { useUpdateEffect } from '../../hooks'

interface ToggleProps {
  defaultValue?: any
  onChange: (value: any) => void
  options: Array<{label: ReactNode, value: any, tip?: string, disabled?: boolean}>
}

export function Toggle ({
  defaultValue,
  onChange,
  options
}: ToggleProps) {
  const [toggleIndex, setToggleIndex] = useState(options.findIndex(({value}) => value === defaultValue))

  const handleItemClick = useCallback((index) => {
    setToggleIndex(index)
  }, [])

  useUpdateEffect(() => {
    onChange(options[toggleIndex].value)
  }, [toggleIndex])

  return (
    <div className={css.toggle}>
      {options.map((option, index) => {
        const { value, label, tip, disabled } = option
        return (
          <div
            data-mybricks-tip={tip}
            key={index}
            className={`${css.item}${index === toggleIndex ? ` ${css.selectItem}` : ''}${disabled ? ` ${css.disabledItem}` : ''}`}
            onClick={() => !disabled && handleItemClick(index)}
          >
            {!index && <MoveBlock index={toggleIndex}/>}
            <div className={css.label}>{label}</div>
          </div>
        )
      })}
    </div>
  )
}

function MoveBlock ({index}: {index: number}) {
  return (
    <div
      className={css.moveBlock}
      style={{
        visibility: index === -1 ? 'hidden' : 'visible',
        transform: `translateX(calc(${100 * index}% + ${2 * index}px))`
      }}
    />
  )
}
