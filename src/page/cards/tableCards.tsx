import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { IconArrowBack } from '../../assets/icons/iconArrowBack.tsx'
import { DATA_HEADERS_TABLE_CARDS } from '../../common/constants.ts'
import { Button, TextField, Typography } from '../../components/ui'

import st from './tableCards.module.scss'

export const TableCards = () => {
  const navigate = useNavigate()
  const handlerOnClick = () => {
    navigate('/decks')
  }
  const [valueInput, setValueInput] = useState('')
  const handlerSendInputValue = () => {
    alert(valueInput)
    setValueInput('')
  }
  const cardsItems: any[] = [
    { id: 1, name: 'ttt', cardsCount: '999', author: '7u7u7u' },
    { id: 2, name: 'ttt', cardsCount: '999', author: '7u7u7u' },
    { id: 3, name: 'ttt', cardsCount: '999', author: '7u7u7u' },
    { id: 4, name: 'ttt', cardsCount: '999', author: '7u7u7u' },
    { id: 5, name: 'ttt', cardsCount: '999', author: '7u7u7u' },
  ]

  return (
    <div className={st.common}>
      <div className={st.blockArrowBack} onClick={handlerOnClick}>
        <IconArrowBack />
        <Typography variant={'body2'}>Back to Packs List</Typography>
      </div>
      <div className={st.blokButtonAddNewCard}>
        <Typography variant={'large'}>My Pack</Typography>
        <Button variant={'primary'}>Add New Card</Button>
      </div>
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
          {cardsItems?.map(deck => (
            <tr key={deck.id} className={st.tr}>
              <td className={st.tdCommonStyle}>{deck.name}</td>
              <td className={st.tdCommonStyle}>{deck.cardsCount}</td>
              <td className={st.tdCommonStyle}>{new Date(deck.updated).toLocaleString('ru-Ru')}</td>
              <td className={st.tdCreatedBy}>{deck.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
