import { useNavigate } from 'react-router-dom'

import { IconArrowBack } from '../../assets/icons/iconArrowBack.tsx'
import { Typography } from '../../components/ui'

import st from './tableCards.module.scss'

export const TableCards = () => {
  const navigate = useNavigate()
  const handlerOnClick = () => {
    navigate('/decks')
  }

  return (
    <div className={st.common}>
      <div className={st.blockArrowBack} onClick={handlerOnClick}>
        <IconArrowBack />
        <Typography variant={'body2'}>Back to Packs List</Typography>
      </div>
    </div>
  )
}
