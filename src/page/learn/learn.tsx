import { useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../assets/icons/iconArrowBack.tsx'
import { Button, RadioGroupComponent, Typography } from '../../components/ui'
import {
  useGetRandomCardQuery,
  useUpdateGradeCardsMutation,
} from '../../service/cards/serveceCards.ts'
import { RootState } from '../../service/store.ts'

import st from './learn.module.scss'

type ElementsRadioType = {
  id: string
  name: string
  text: string
  disabled: boolean
}
export const Learn = () => {
  const navigate = useNavigate()
  const currentNameDack = useSelector((state: RootState) => state.decks.currentNameDack)
  const { id } = useParams()

  const { data } = useGetRandomCardQuery(id ?? '')
  const [updateGradeCard, { data: dataUpdateGrade }] = useUpdateGradeCardsMutation()
  const [mode, setMode] = useState(false)
  let [currentQuestion, setCurrentQuestion] = useState(data?.question)

  const handlerOnClickBackPage = () => {
    navigate('/decks')
  }
  const handlerOnClickNextQuestion = () => {
    setMode(!mode)
    if (dataUpdateGrade) {
      setCurrentQuestion(dataUpdateGrade.question)
    }
  }
  const stateRadioGroup: ElementsRadioType[] = [
    { id: '1', text: 'Did not know', name: 'trainGroup', disabled: false },
    { id: '2', text: 'Forgot', name: 'trainGroup', disabled: false },
    { id: '3', text: 'A lot of thought', name: 'trainGroup', disabled: false },
    { id: '4', text: 'Confused', name: 'trainGroup', disabled: false },
    { id: '5', text: 'Knew the answer', name: 'trainGroup', disabled: false },
  ]
  const handlerCallbackRadioGroup = (value: string) => {
    const body = { cardId: data ? data.id : '', grade: Number(value) }

    updateGradeCard({ id: id ? id : '', body })
  }

  console.log(data)
  console.log(dataUpdateGrade, '66666')

  let currentGrade = data?.grade
  let currentAnswer = 'JJJJJJJJJJJ'

  return (
    <div className={st.common}>
      <div className={st.blockArrowBack} onClick={handlerOnClickBackPage}>
        <IconArrowBack />
        <Typography variant={'body2'}>Back to Packs List</Typography>
      </div>
      <div className={st.frame}>
        <Typography variant={'large'}>{`Learn : "${currentNameDack}"`}</Typography>
        <div className={st.question}>
          <Typography variant={'subtitle1'}>Qusetion: </Typography>
          <Typography variant={'body1'}>{currentQuestion}</Typography>
        </div>
        <div className={mode ? st.amount : st.amountMode}>
          <Typography variant={'body2'}>Количество попыток ответов на вопрос:</Typography>
          <Typography variant={'subtitle2'}>{currentGrade}</Typography>
        </div>
        {mode && (
          <div className={st.answer}>
            <Typography variant={'subtitle1'}>Answer: </Typography>
            <Typography variant={'body1'}>{currentAnswer}</Typography>
          </div>
        )}

        {mode && (
          <div className={st.radioGroup}>
            <Typography variant={'subtitle1'}>Rate yourself: </Typography>
            <RadioGroupComponent
              callback={handlerCallbackRadioGroup}
              stateRadioGroup={stateRadioGroup}
            />
          </div>
        )}

        <Button onClick={handlerOnClickNextQuestion} fullWidth={true}>
          {mode ? 'Next Question' : 'ShowAnswer'}
        </Button>
      </div>
    </div>
  )
}
