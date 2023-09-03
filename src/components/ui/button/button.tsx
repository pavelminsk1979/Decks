import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: any) => {
    const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props

    return (
      <Component
        ref={ref}
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className} ${s.button} ${
          s.primary
        }`}
        {...rest}
      />
    )
  }
)
