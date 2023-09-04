import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CardsIcon } from '../../../../assets/icons/iconCards.tsx'
import { PlayIcon } from '../../../../assets/icons/playIcon.tsx'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch.ts'
import { authActions } from '../../../../service/auth/authSlice.ts'
import { decksActions } from '../../../../service/decks/decksSlice.ts'
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

  const handlerOnClick = (idDeck: string, currentUserId: string) => {
    dispatch(authActions.setCurrentUserId({ currentUserId }))
    navigate('/cards/' + idDeck)
  }
  const handlerOnClikLearmDeckQuestion = (idDeck: string, currentNameDack: string) => {
    navigate('/learnQuestion/' + idDeck)
    dispatch(decksActions.setCurrentNameDack({ currentNameDack }))
  }

  console.log(decksItems)

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
              {deck.cardsCount > 0 && (
                <PlayIcon onClick={() => handlerOnClikLearmDeckQuestion(deck.id, deck.name)} />
              )}

              <CardsIcon
                width="18"
                height="18"
                onClick={() => handlerOnClick(deck.id, deck.userId)}
              />
              {deck.userId === myUserId && (
                <>
                  <ModalEditDeck deckId={deck.id} />
                  <span className={st.modal}>
                    <ModalDeleteDeck idDeck={deck.id} nameDeck={deck.name} />
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
