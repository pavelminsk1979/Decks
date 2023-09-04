import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../../assets/icons/iconArrowBack.tsx'
import { Button, Typography } from '../../../components/ui'
import { useGetRandomCardQuery } from '../../../service/cards/serveceCards.ts'
import { RootState } from '../../../service/store.ts'

import st from './learnQuestion.module.scss'

export const LearnQuestion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data } = useGetRandomCardQuery(id ?? '')
  const currentNameDack = useSelector((state: RootState) => state.decks.currentNameDack)

  console.log(data)
  const handlerOnClickBackPage = () => {
    navigate('/decks')
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
          <Typography variant={'body1'}>{data ? data.question : ''}</Typography>
        </div>
        <div className={st.amount}>
          <Typography variant={'body2'}>Количество попыток ответов на вопрос:</Typography>
          <Typography variant={'subtitle2'}>{data ? data.shots : 0}</Typography>
        </div>
        <Button fullWidth={true}>Show Answer</Button>
      </div>
    </div>
  )
}
