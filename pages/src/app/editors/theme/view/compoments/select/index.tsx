import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useCallback
} from 'react'
import { createPortal } from 'react-dom'

import { useUpdateEffect } from '../../hooks'

import css from './index.less'

interface SelectProps {
  placeholder?: string
  defaultValue?: any
  options: Array<{label: string, value: string}>
  onChange: (value: any) => void
  value?: any
}

export const Select = ({
  defaultValue,
  placeholder,
  options: defaultOptions,
  onChange,
  value
}: SelectProps) => {
  const inputRef = useRef<HTMLInputElement>()
  const [dropDownValue, setDropDownValue] = useState(value || defaultValue)
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [inputValue, setInputValue] = useState(defaultOptions.find((option) => option.value === dropDownValue)?.label || '')

  useUpdateEffect(() => {
    setInputValue(defaultOptions.find((option) => option.value === dropDownValue)?.label || '')
  }, [value, defaultOptions])

  useUpdateEffect(() => {
    setOptions(defaultOptions)
  }, [defaultOptions])

  const onInputChange = useCallback((e) => {
    const value = e.target.value
    setInputValue(value)
    setOptions(() => {
      return defaultOptions.filter(({label}) => {
        return label.indexOf(value) !== -1
      })
    })
  }, [])

  const onInputFocus = useCallback(() => {
    setDropDownOpen(true)
    inputRef.current.onblur = () => {
      onInputBlur()
    }
  }, [dropDownValue])

  const onInputBlur = useCallback(() => {
    setDropDownOpen(false)
    setOptions(defaultOptions)
    setInputValue(options.find((option) => option.value === dropDownValue)?.label || '')
  }, [dropDownValue])

  const onDropdownChange = useCallback((value) => {
    setInputValue(options.find((option) => option.value === value)?.label || '')
    onChange(value)
    setDropDownValue(value)
    setDropDownOpen(false)
  }, [])

  const onDropdownMouseEnter = useCallback(() => {
    inputRef.current.onblur = null
  }, [])

  const onDropdownMouseLeave = useCallback(() => {
    inputRef.current.onblur = () => {
      onInputBlur()
    }
  }, [dropDownValue])

  return (
    <>
      <input
        ref={inputRef}
        type='text'
        className={css.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={onInputChange}
        onFocus={onInputFocus}
      />
      <Dropdown
        open={dropDownOpen}
        value={dropDownValue}
        onChange={onDropdownChange}
        options={options}
        positionElement={inputRef.current}
        onMouseEnter={onDropdownMouseEnter}
        onMouseLeave={onDropdownMouseLeave}
      />
    </>
  )
}

interface DropdownProps {
  open: boolean
  options: SelectProps['options']
  positionElement: HTMLElement
  value: any
  onChange: (value: any) => void
  onMouseLeave: () => void
  onMouseEnter: () => void
}

export const Dropdown = ({
  open,
  options,
  positionElement,
  value: currentValue,
  onChange,
  onMouseLeave,
  onMouseEnter
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement>()

  const onItemClick = useCallback((value) => {
    onChange(value)
  }, [])

  useEffect(() => {
    if (open) {
      const dropdownContainer = ref.current!
      const positionElementBct = positionElement.getBoundingClientRect()
      const dropdownContainerBct = ref.current!.getBoundingClientRect()
      const totalHeight = window.innerHeight || document.documentElement.clientHeight
      const top = positionElementBct.top + positionElementBct.height
      const right = positionElementBct.left + positionElementBct.width
      const letf = right - positionElementBct.width
      const bottom = top + dropdownContainerBct.height

      if (bottom > totalHeight) {
        // 目前判断下方是否超出即可
        // 向上
        dropdownContainer.style.top = (positionElementBct.top - dropdownContainerBct.height) + 'px'
      } else {
        dropdownContainer.style.top = top + 'px'
      }

      // 保证完全展示
      if (dropdownContainerBct.width > positionElementBct.width) {
        dropdownContainer.style.left = letf - dropdownContainerBct.width + positionElementBct.width + 'px'
      } else {
        dropdownContainer.style.width = positionElementBct.width + 'px'
        dropdownContainer.style.left = letf + 'px'
      }

      dropdownContainer.style.visibility = 'visible'
    }
  }, [open])

  return open && createPortal(
    <div
      ref={ref}
      className={css.items}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {options.length ? options.map(({label, value}, index) => {
        return (
          <div
            key={index}
            className={`${css.item}${currentValue === value ? ` ${css.active}` : ''}`}
            onClick={() => onItemClick(value)}
          >
            {label}
          </div>
        )
      }) : (
        <div className={css.empty}>
          暂无可选主题
        </div>
      )}
    </div>,
    document.body
  )
}


// const Dropdown: FC<any> = ({ dropDownStyle, children, overlay, onBlur }) => {
//   const [visible, setVisible] = useState(false);
//   const onClick = useCallback(event => {
// 	  event.stopPropagation();
//     setVisible(visible => !visible);
//   }, [])
	
// 	useEffect(() => {
// 		onBlur?.(() => setVisible(false));
// 	}, []);
	
//   return (
//     <div className={css.dropdown}>
//       <div onClick={onClick}>{children}</div>
//       <div style={dropDownStyle} className={css.content}>
//         {visible ? overlay : null}
//       </div>
//     </div>
//   );
// };