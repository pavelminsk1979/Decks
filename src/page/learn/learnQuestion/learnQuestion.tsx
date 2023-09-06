import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../../assets/icons/iconArrowBack.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { Button, Typography } from '../../../components/ui'
import {
  useGetRandomCardQuery,
  useUpdateGradeCardsMutation,
} from '../../../service/cards/serveceCards.ts'
import { decksActions } from '../../../service/decks/decksSlice.ts'
import { RootState } from '../../../service/store.ts'

import st from './learnQuestion.module.scss'

export const LearnQuestion = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const currentGradeCard = useSelector((state: RootState) => state.decks.currentGradeCard)
  const { data } = useGetRandomCardQuery(id ?? '')
  const currentNameDack = useSelector((state: RootState) => state.decks.currentNameDack)
  const [updateGradeCard, { data: dataResponse }] = useUpdateGradeCardsMutation()

  useEffect(() => {
    if (currentGradeCard && currentGradeCard > 0) {
      const body = { cardId: data ? data.id : '', grade: currentGradeCard }

      updateGradeCard({ id: id ? id : '', body })
      dispatch(decksActions.setCurrentGradeCard({ currentGradeCard: 0 }))
      console.log(dataResponse)
      dispatch(
        decksActions.setCurrentQuestionCard({
          currentQuestionCard: dataResponse ? dataResponse?.question : '',
        })
      )
    }
  }, [id, data?.id])
  let currentQuestion = data?.question

  if (dataResponse?.question) {
    currentQuestion = dataResponse.question
  }
  console.log(dataResponse?.question + 'компонента ВОПРОС')
  const handlerOnClickBackPage = () => {
    navigate('/decks')
  }
  const handlerOnClickShowAnswer = () => {
    navigate('/learnAnswer/' + id)

    dispatch(
      decksActions.setCurrentQuestionCard({
        currentQuestionCard: dataResponse ? dataResponse?.question : '',
      })
    )
  }

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
        <div className={st.amount}>
          <Typography variant={'body2'}>Количество попыток ответов на вопрос:</Typography>
          <Typography variant={'subtitle2'}>{data ? data.shots : 0}</Typography>
        </div>
        <Button onClick={handlerOnClickShowAnswer} fullWidth={true}>
          Show Answer
        </Button>
      </div>
    </div>
  )
}
