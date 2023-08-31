import { useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { IconArrowBack } from '../../assets/icons/iconArrowBack.tsx'
import { DATA_HEADERS_TABLE_CARDS } from '../../common/constants.ts'
import { Button, TextField, Typography } from '../../components/ui'
import { useGetCardsQuery } from '../../service/cards/serveceCards.ts'
import { CardsItemsType } from '../../service/cards/typeCards.ts'
import { RootState } from '../../service/store.ts'

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
  const handlerOnClick = () => {
    navigate('/decks')
  }
  const [valueInput, setValueInput] = useState('')
  const handlerSendInputValue = () => {
    alert(valueInput)
    setValueInput('')
  }

  if (data) {
    return deckWithCard ? (
      <div className={st.common}>
        <div className={st.blockArrowBack} onClick={handlerOnClick}>
          <IconArrowBack />
          <Typography variant={'body2'}>Back to Packs List</Typography>
        </div>
        {myUserId === data?.items[0].userId ? (
          <div className={st.blokButtonAddNewCard}>
            <Typography variant={'large'}>My Pack</Typography>
            <Button variant={'primary'}>Add New Card</Button>
          </div>
        ) : (
          <div className={st.blokButtonAddNewCard}>
            <Typography variant={'large'}>Friend’s Pack</Typography>
            <Button variant={'primary'}>Learn to Pack</Button>
          </div>
        )}

        <div className={st.textField}>
          <TextField
            sizeWidthTextField={'4000px'}
            handlerOnChange={handlerSendInputValue}
            valueInput={valueInput}
            setValueInput={setValueInput}
            placeholder={'Input search'}
            type="text"
            showIconClose={false}
            label={'Write a symbol and  press еnter'}
          />
        </div>
        <table className={st.table}>
          <thead>
            <tr className={st.header}>
              {DATA_HEADERS_TABLE_CARDS.map(el => (
                <th key={el.key} className={st.thHeader}>
                  {el.title}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cardsItems?.map((deck: CardsItemsType) => (
              <tr key={deck.id} className={st.tr}>
                <td className={st.tdCommonStyle}>{deck.question}</td>
                <td className={st.tdCommonStyle}>{deck.answer}</td>
                <td className={st.tdCommonStyle}>
                  {new Date(deck.updated).toLocaleString('ru-Ru')}
                </td>
                <td className={st.tdCreatedBy}>{deck.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className={st.common}>
        <div className={st.blockArrowBack} onClick={handlerOnClick}>
          <IconArrowBack />
          <Typography variant={'body2'}>Back to Packs List</Typography>
        </div>
        <div className={st.blokButtonAddNewCard}>
          <Typography variant={'large'}>Empty Pack</Typography>
        </div>
        {currentUserId === myUserId && <Button variant={'primary'}>Add New Card</Button>}
      </div>
    )
  }
}
