import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../../../../assets/icons/iconArrowBack.tsx'
import { Button, Typography } from '../../../../../components/ui'

import st from './learnQuestion.module.scss'

export const LearnQuestion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const handlerOnClickBackPage = () => {
    navigate('/decks')
  }
  const nameDeck = id

  return (
    <div className={st.common}>
      <div className={st.blockArrowBack} onClick={handlerOnClickBackPage}>
        <IconArrowBack />
        <Typography variant={'body2'}>Back to Packs List</Typography>
      </div>
      <div className={st.frame}>
        <Typography variant={'large'}>{`Learn : "${nameDeck}"`}</Typography>
        <div className={st.question}>
          <Typography variant={'subtitle1'}>Qusetion:</Typography>
          <Typography variant={'body1'}>{nameDeck}</Typography>
        </div>
        <div className={st.amount}>
          <Typography variant={'body2'}>Количество попыток ответов на вопрос:</Typography>
          <Typography variant={'subtitle2'}>3</Typography>
        </div>
        <Button fullWidth={true}>Show Answer</Button>
      </div>
    </div>
  )
}
