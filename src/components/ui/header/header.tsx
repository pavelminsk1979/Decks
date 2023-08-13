import { ComponentProps, FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './header.module.scss'
import im from './Logo.png'

export type HeaderProps = {
  children: ReactNode
  name?: string
} & Omit<ComponentProps<'header'>, 'children'>

export const Header: FC<HeaderProps> = ({ children, className, name, ...rest }) => {
  const classNames = {
    header: clsx(s.header, className),
  }

  return (
    <header className={classNames.header} {...rest}>
      <img src={im} alt={'logo'}></img>
      <div style={{ display: 'flex' }}>
        {name && (
          <Typography variant={'h1'} style={{ marginRight: 25 }}>
            {name}
          </Typography>
        )}
        {children}
      </div>
    </header>
  )
}
