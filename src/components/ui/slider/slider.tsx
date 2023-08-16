import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import st from './slider.module.scss'

type PropsType = {
  startValueSlider: number[]
  onValueCommit: (value: number[]) => void
}

export const SliderBar = ({ startValueSlider, onValueCommit }: PropsType) => {
  const [value, setValue] = useState(startValueSlider)
  const handlerOnValueChange = (event: number[]) => {
    setValue([event[0], event[1]])
  }

  const handlerOnValueCommit = () => {
    onValueCommit(value)
  }

  return (
    <div className={st.common}>
      <div className={st.value}>{value[0]}</div>
      <Slider.Root
        onValueCommit={handlerOnValueCommit}
        min={startValueSlider[0]}
        max={startValueSlider[1]}
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

/*import { useEffect, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import st from './slider.module.scss'

type PropsType = {
  startArrayValue: number[]
  valueSlider: number[]
  onValueCommit: (value: number[]) => void
}

export const SliderBar = ({ startArrayValue, onValueCommit, valueSlider }: PropsType) => {
  const [value, setValue] = useState(startArrayValue)

  useEffect(() => {
    if (valueSlider[0] !== 0 && valueSlider[1] !== 0) {
      setValue(valueSlider)
    }
  }, [valueSlider])
  useEffect(() => {
    if (startArrayValue) {
      setValue(startArrayValue)
    }
  }, [startArrayValue])
  const handlerOnValueChange = (event: number[]) => {
    setValue([event[0], event[1]])
  }

  const handlerOnValueCommit = () => {
    onValueCommit(value)
  }

  return (
    <div className={st.common}>
      <div className={st.value}>{value[0]}</div>
      <Slider.Root
        onValueCommit={handlerOnValueCommit}
        min={startArrayValue[0]}
        max={startArrayValue[1]}
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
}*/
