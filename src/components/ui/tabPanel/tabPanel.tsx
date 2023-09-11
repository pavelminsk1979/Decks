import * as Tabs from '@radix-ui/react-tabs'

import { DATA_TAB_PANEL } from '../../../common/constants.ts'
import { Typography } from '../typography'

import st from './tabPanel.module.scss'

type PropsType = {
  active: string
  title: string
  handlerOnClick: (name: string) => void
  data?: any
}

export const TabPanel = ({ active, title, handlerOnClick }: PropsType) => {
  return (
    <Tabs.Root className={st.common}>
      <Typography variant={'body2'}>{title}</Typography>

      <Tabs.List>
        {DATA_TAB_PANEL.map(e => {
          return (
            <Tabs.Trigger
              onClick={() => handlerOnClick(e.name)}
              key={e.id}
              className={active === e.name ? st.active : st.tabTrigger}
              value={e.id}
            >
              <Typography variant={'body1'}>{e.name}</Typography>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
