import React from 'react'

import type { HTMLAttributes } from 'react'


import css from './index.less'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: 'primary'
}

export const Button = ({ type, children, ...props }: ButtonProps) => {
  return (
    <button className={css.button} {...props} data-button-type={type}>
      <span>{children}</span>
    </button>
  )
}
