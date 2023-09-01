import { useState } from 'react'

import { IconArrowBack } from '../../../assets/icons/iconArrowBack.tsx'
import { Button, TextField, Typography } from '../../../components/ui'
import { CardsItemsType } from '../../../service/cards/typeCards.ts'
import { ModalCreateCard } from '../modalCreateCard/modalCreateCard.tsx'

import st from './deckWithCards.module.scss'
import { TableWithCards } from './tableWithCards/tableWithCards.tsx'

type PropsType = {
  id: string
  handlerOnClickBackPage: () => void
  myUserId: string
  cardsItems: CardsItemsType[]
  currentUserId: string
}
export const DeckWithCards = ({
  handlerOnClickBackPage,
  myUserId,
  cardsItems,
  currentUserId,
  id,
}: PropsType) => {
  const [valueInput, setValueInput] = useState('')
  const handlerSendInputValue = () => {
    alert(valueInput)
    setValueInput('')
  }

  return (
    <div className={st.common}>
      <div className={st.blockArrowBack} onClick={handlerOnClickBackPage}>
        <IconArrowBack />
        <Typography variant={'body2'}>Back to Packs List</Typography>
      </div>
      {myUserId === currentUserId ? (
        <div className={st.blokButtonAddNewCard}>
          <Typography variant={'large'}>My Pack</Typography>
          <ModalCreateCard id={id} />
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
      <TableWithCards cardsItems={cardsItems} />
    </div>
  )
}
