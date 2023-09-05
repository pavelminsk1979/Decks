import * as RadioGroup from '@radix-ui/react-radio-group'

import st from './radioGroup.module.scss'

export type ElementRadio = {
  id: string
  name: string
  text: string
  disabled: boolean
}

type PropsType = {
  stateRadioGroup: ElementRadio[]
  callback: (value: string) => void
}
export const RadioGroupComponent = ({ stateRadioGroup, callback }: PropsType) => {
  const handlerOnValueChange = (value: string) => {
    callback(value)
  }

  return (
    <RadioGroup.Root name={stateRadioGroup[0].name} onValueChange={handlerOnValueChange}>
      {stateRadioGroup.map((e: ElementRadio) => {
        return (
          <label className={st.label} key={e.id}>
            <div className={e.disabled ? st.blockUnderRadioGroupDisabled : st.blockUnderRadioGroup}>
              <RadioGroup.Item
                disabled={e.disabled}
                className={e.disabled ? st.RadioGroupItemDisabled : st.RadioGroupItem}
                value={e.id}
              >
                <RadioGroup.Indicator className={st.RadioGroupIndicator} />
              </RadioGroup.Item>
            </div>

            <div className={st.text}>{e.text}</div>
          </label>
        )
      })}
    </RadioGroup.Root>
  )
}
