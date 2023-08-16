import { useEffect, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import { useGetCardsQuery } from '../../../service/decks/serveceDecks.ts'

import st from './slider.module.scss'

type PropsType = {
  valueSliderSendSever: (value: number[]) => void
}

export const SliderBar = ({ valueSliderSendSever }: PropsType) => {
  const { data } = useGetCardsQuery({})
  const [flag, setFlag] = useState(false)

  let startMaxValueSlider = 0

  if (data) {
    startMaxValueSlider = data.maxCardsCount
  }

  const [value, setValue] = useState([0, 0])

  useEffect(() => {
    if (!flag && data?.maxCardsCount) {
      setValue([0, data.maxCardsCount])
      setFlag(true)
    }
  }, [data])
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

/*




import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import { useGetCardsQuery } from '../../../service/decks/serveceDecks.ts'

import st from './slider.module.scss'

type PropsType = {
    onValueCommit: (value: number[]) => void
}

export const SliderBar = ({ onValueCommit }: PropsType) => {
    const { data } = useGetCardsQuery({})
    let startMaxValueSlider = 0
    let startMinValueSlider = 0

    if (data) {
        startMaxValueSlider = data.maxCardsCount
    }
    const startValueSlider = [0, startMaxValueSlider]

    console.log(startValueSlider, 'startValueSlider')

    console.log(startMaxValueSlider, 'startMaxValueSlider')
    const [value, setValue] = useState(startValueSlider)

    console.log(value, 'value')

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
                min={startMinValueSlider}
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
}*/
