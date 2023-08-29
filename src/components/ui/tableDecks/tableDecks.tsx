import { useState } from 'react'

import { ArrowIconDown } from '../../../assets/icons/arrowIconDown.tsx'
import { ArrowUpIcon } from '../../../assets/icons/arrowUpIcon.tsx'
import { CardsIcon } from '../../../assets/icons/iconCards.tsx'
import { PlayIcon } from '../../../assets/icons/playIcon.tsx'
import { DATA_HEADERS_TABLE } from '../../../common/constants.ts'
import { ModalDeleteDeck } from '../../../service/decks/modals/modalDeleteDeck.tsx'
import { ModalEditDeck } from '../../../service/decks/modals/modalEditDeck.tsx'
import { DecksItemsType } from '../../../service/decks/typeDecks.ts'

import st from './tableDecks.module.scss'

type PropsType = {
  myUserIdForTableDecks: string
  decksItems: DecksItemsType[] | undefined
  sendDataToServer: (value: string) => void
  onClickModalDeleteDeck: (idDeck: string) => void
  onClickModalEditDeck: (idDeck: string, valueInput: string) => void
  valueInput: string
  setValueInput: (valueInput: string) => void
}
type SortType = {
  key: string
  direction: 'asc' | 'desc'
} | null
export const TableDecks = ({
  decksItems,
  sendDataToServer,
  myUserIdForTableDecks,
  onClickModalDeleteDeck,
  onClickModalEditDeck,
}: PropsType) => {
  const [sort, setSort] = useState<SortType>(null)
  const handlerSort = (key: string) => {
    if (key !== 'action') {
      if (sort && sort.key === key) {
        const updatedSort: SortType = {
          key: key,
          direction: sort.direction === 'asc' ? 'desc' : 'asc',
        }

        setSort(updatedSort)
        sendDataToServer(`${updatedSort.key}-${updatedSort.direction}`)
      } else {
        const updatedSort: SortType = {
          key: key,
          direction: 'asc',
        }

        setSort(updatedSort)
        sendDataToServer(`${updatedSort.key}-${updatedSort.direction}`)
      }
    }
  }

  const handlerOnClickModalDeleteDeck = (idDeck: string) => {
    onClickModalDeleteDeck(idDeck)
  }
  const handlerOnClickModalEditDeck = (idDeck: string, valueInput: string) => {
    onClickModalEditDeck(idDeck, valueInput)
  }

  return (
    <table className={st.table}>
      <thead>
        <tr className={st.header}>
          {DATA_HEADERS_TABLE.map(el => (
            <th key={el.key} className={st.thHeader} onClick={() => handlerSort(el.key)}>
              {el.title}
              {sort === null && <ArrowUpIcon />}
              {sort?.key === el.key && sort?.direction === 'asc' && <ArrowUpIcon />}
              {sort?.key === el.key && sort?.direction === 'desc' && <ArrowIconDown />}
              {sort && sort?.key !== el.key && <ArrowUpIcon />}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {decksItems?.map(deck => (
          <tr key={deck.id} className={st.tr}>
            <td className={st.tdCommonStyle}>{deck.name}</td>
            <td className={st.tdCommonStyle}>{deck.cardsCount}</td>
            <td className={st.tdCommonStyle}>{new Date(deck.updated).toLocaleString('ru-Ru')}</td>
            <td className={st.tdCreatedBy}>{deck.author.name}</td>

            {deck.userId === myUserIdForTableDecks ? (
              <td className={st.tdIcons}>
                <PlayIcon />
                <ModalEditDeck
                  OnClickModalEditDeck={(valueInput: string) =>
                    handlerOnClickModalEditDeck(deck.id, valueInput)
                  }
                />
                <ModalDeleteDeck
                  handlerOnClickModalDeleteDeck={() => handlerOnClickModalDeleteDeck(deck.id)}
                  nameDeck={deck.name}
                />

                <CardsIcon width="18" height="18" />
              </td>
            ) : (
              <td className={st.tdIcons}>
                <PlayIcon />
                <CardsIcon width="18" height="18" />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
