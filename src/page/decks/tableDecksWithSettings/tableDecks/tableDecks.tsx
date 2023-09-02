import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CardsIcon } from '../../../../assets/icons/iconCards.tsx'
import { PlayIcon } from '../../../../assets/icons/playIcon.tsx'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch.ts'
import { authActions } from '../../../../service/auth/authSlice.ts'
import {
  useDeleteDecksMutation,
  useEditDecksMutation,
} from '../../../../service/decks/serveceDecks.ts'
import { DecksItemsType } from '../../../../service/decks/typeDecks.ts'
import { RootState } from '../../../../service/store.ts'

import { HeaderTable } from './headerTable/headerTable.tsx'
import { ModalDeleteDeck } from './modals/modalDeleteDeck.tsx'
import { ModalEditDeck } from './modals/modalEditDeck.tsx'
import st from './tableDecks.module.scss'

type PropsType = {
  decksItems: DecksItemsType[] | undefined
  sendDataToServer: (value: string) => void
}

export const TableDecks = ({ decksItems, sendDataToServer }: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const myUserId = useSelector((state: RootState) => state.auth.myUserId)
  const [deleteDeck] = useDeleteDecksMutation()
  const [editDeck] = useEditDecksMutation()

  const handlerOnClickModalDeleteDeck = (idDeck: string) => {
    deleteDeck(idDeck)
  }
  const handlerOnClickModalEditDeck = (idDeck: string, valueInput: string) => {
    const arg = { id: idDeck, name: valueInput }

    editDeck(arg)
  }
  const handlerOnClick = (idDeck: string, currentUserId: string) => {
    dispatch(authActions.setCurrentUserId({ currentUserId }))
    navigate('/cards/' + idDeck)
  }

  return (
    <table className={st.table}>
      <HeaderTable sendDataToServer={sendDataToServer} />
      <tbody>
        {decksItems?.map(deck => (
          <tr key={deck.id} className={st.tr}>
            <td className={st.tdCommonStyle}>{deck.name}</td>
            <td className={st.tdCommonStyle}>{deck.cardsCount}</td>
            <td className={st.tdCommonStyle}>{new Date(deck.updated).toLocaleString('ru-Ru')}</td>
            <td className={st.tdCreatedBy}>{deck.author.name}</td>

            <td className={st.tdIcons}>
              <PlayIcon />
              <CardsIcon
                width="18"
                height="18"
                onClick={() => handlerOnClick(deck.id, deck.userId)}
              />
              {deck.userId === myUserId && (
                <>
                  <ModalEditDeck
                    OnClickModalEditDeck={(valueInput: string) =>
                      handlerOnClickModalEditDeck(deck.id, valueInput)
                    }
                  />
                  <span className={st.modal}>
                    <ModalDeleteDeck
                      handlerOnClickModalDeleteDeck={() => handlerOnClickModalDeleteDeck(deck.id)}
                      nameDeck={deck.name}
                    />
                  </span>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
