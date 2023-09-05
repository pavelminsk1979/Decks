import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../../../assets/icons/iconArrowBack.tsx'
import { Button, Typography } from '../../../../components/ui'
import { useGetRandomCardQuery } from '../../../../service/cards/serveceCards.ts'
import { RootState } from '../../../../service/store.ts'

import st from './learnAnswer.module.scss'

export const LearnAnswer = () => {
  const navigate = useNavigate()
  const currentNameDack = useSelector((state: RootState) => state.decks.currentNameDack)
  const { id } = useParams()
  const { data } = useGetRandomCardQuery(id ?? '')
  const handlerOnClickBackPage = () => {
    navigate('/decks')
  }
  const handlerOnClickNextQuestion = () => {
    alert('kjjdfkjjsf')
  }

  console.log(data)

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
          <Typography variant={'body1'}>{data ? data.question : ''}</Typography>
        </div>
        <div className={st.amount}>
          <Typography variant={'body2'}>Количество попыток ответов на вопрос:</Typography>
          <Typography variant={'subtitle2'}>{data ? data.shots : 0}</Typography>
        </div>
        <div className={st.answer}>
          <Typography variant={'subtitle1'}>Answer: </Typography>
          <Typography variant={'body1'}>{data ? data.answer : ''}</Typography>
        </div>
        <div>
          <Typography variant={'subtitle1'}>Rate yourself: </Typography>
        </div>
        <Button onClick={handlerOnClickNextQuestion} fullWidth={true}>
          Next Question
        </Button>
      </div>
    </div>
  )
}
