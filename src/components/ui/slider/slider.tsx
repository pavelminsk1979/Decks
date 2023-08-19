import { useEffect, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import st from './slider.module.scss'

type PropsType = {
  valueSliderSendSever: (value: number[]) => void
  startMaxValueSlider: number
  processResetAndValueSliderNull: null | number[]
}

export const SliderBar = ({
  valueSliderSendSever,
  startMaxValueSlider,
  processResetAndValueSliderNull,
}: PropsType) => {
  const [value, setValue] = useState([0, 0])

  useEffect(() => {
    if (processResetAndValueSliderNull === null) {
      setValue([0, startMaxValueSlider])
    }
  }, [processResetAndValueSliderNull, startMaxValueSlider])
  const handlerOnValueChange = (event: number[]) => {
    setValue([event[0], event[1]])
  } // это перерисовывает каждое изменение в слайднре

  const handlerOnValueCommit = () => {
    valueSliderSendSever(value)
  } // когда я поуправлял ползунком и убрал от него мышку--это запускает функцию которая содержит значение

  return (
    <div className={st.common}>
      <div className={st.value}>{value[0]}</div>
      <Slider.Root
        onValueCommit={handlerOnValueCommit}
        min={0}
        max={startMaxValueSlider}
        value={value}
        onValueChange={handlerOnValueChange}
        className={st.SliderRoot}
      >
        <Slider.Track className={st.SliderTrack}>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb className={st.SliderThumb} />
        <Slider.Thumb className={st.SliderThumb} />
      </Slider.Root>
      <div className={st.value}>{value[1]}</div>
    </div>
  )
}
