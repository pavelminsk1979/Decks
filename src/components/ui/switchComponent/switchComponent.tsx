import * as Switch from '@radix-ui/react-switch'
import st from './switchComponent.module.scss'

type PropsType = {
  handlerOnChackedChange: (checked: boolean) => void
}
export const SwitchComponent = ({ handlerOnChackedChange }: PropsType) => {
  return (
    <div>
      <div>
        <Switch.Root onCheckedChange={handlerOnChackedChange} className={st.SwitchRoot}>
          <Switch.Thumb className={st.SwitchThumb} />
        </Switch.Root>
      </div>
    </div>
  )
}
