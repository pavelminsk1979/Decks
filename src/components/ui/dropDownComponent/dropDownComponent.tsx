import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import st from './dropDownComponent.module.scss'

type PropsType = {
  data: any[]
  dataHeader?: any
  component?: any
}
export const DropDownComponent = ({ data, dataHeader, component }: PropsType) => {
  const handlerOnClick = (id: any) => {
    data.find(e => e.id == id).callback()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={st.trigger}>{component}</DropdownMenu.Trigger>

      <DropdownMenu.Content className={st.blockMenu}>
        {dataHeader && (
          <DropdownMenu.Item className={st.blockIconNameEmail}>
            {dataHeader.icon}
            <div>
              <div>{dataHeader.name}</div>
              <div className={st.gmail}>{dataHeader.gmail}</div>
            </div>
          </DropdownMenu.Item>
        )}

        {data.map((e: any) => {
          return (
            <div key={e.id}>
              <DropdownMenu.Item onClick={() => handlerOnClick(e.id)} className={st.repeatBloks}>
                {e.icon} {e.name}
              </DropdownMenu.Item>

              <div className={st.line}></div>
            </div>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
