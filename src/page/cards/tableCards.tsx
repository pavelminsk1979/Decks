import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../assets/icons/iconArrowBack.tsx'
import { Typography } from '../../components/ui'
import { useGetCardsQuery } from '../../service/cards/serveceCards.ts'
import { CardsItemsType } from '../../service/cards/typeCards.ts'
import { RootState } from '../../service/store.ts'

import { DeckWithCards } from './deckWithCards/deckWithCards.tsx'
import { ModalCreateCard } from './modalCreateCard/modalCreateCard.tsx'
import st from './tableCards.module.scss'

export const TableCards = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const myUserId = useSelector((state: RootState) => state.auth.myUserId)
  const currentUserId = useSelector((state: RootState) => state.auth.currentUserId)
  const { data } = useGetCardsQuery(id ?? '')
  let cardsItems: CardsItemsType[] = []
  let deckWithCard = true

  if (data) {
    cardsItems = data.items
    if (data.items.length === 0) {
      deckWithCard = false
    }
  }
  const handlerOnClickBackPage = () => {
    navigate('/decks')
  }

  if (data) {
    return deckWithCard ? (
      <DeckWithCards
        id={id}
        currentUserId={currentUserId}
        myUserId={myUserId}
        cardsItems={cardsItems}
        handlerOnClickBackPage={handlerOnClickBackPage}
      />
    ) : (
      <div className={st.common}>
        <div className={st.blockArrowBack} onClick={handlerOnClickBackPage}>
          <IconArrowBack />
          <Typography variant={'body2'}>Back to Packs List</Typography>
        </div>
        <div className={st.blokButtonAddNewCard}>
          <Typography variant={'large'}>Empty Pack</Typography>
          {currentUserId === myUserId && id && <ModalCreateCard id={id} />}
        </div>
      </div>
    )
  }
}
