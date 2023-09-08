import { useNavigate } from 'react-router-dom'

import { PlayIcon } from '../../../../assets/icons/playIcon.tsx'
import { DATA_HEADERS_TABLE_CARDS } from '../../../../common/constants.ts'
import { CardsItemsType } from '../../../../service/cards/typeCards.ts'

import { ComponentIconsStar } from './componentIconsStar/componentIconsStar.tsx'
import { ModalDeleteCard } from './modalDeleteCard/modalDeleteCard.tsx'
import { ModalEditCard } from './modalEditCard/modalEditCard.tsx'
import st from './tableWithCards.module.scss'

type PropsType = {
  cardsItems: CardsItemsType[]
  myUserId: string
  currentUserId: string
}
export const TableWithCards = ({ cardsItems, currentUserId, myUserId }: PropsType) => {
  const navigate = useNavigate()
  const handlerOnClikLearm = (idDeck: string) => {
    navigate('/learn/' + idDeck)
  }

  return (
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
        {cardsItems?.map((card: CardsItemsType) => (
          <tr key={card.id} className={st.tr}>
            <td className={st.tdCommonStyle}>{card.question}</td>
            <td className={st.tdCommonStyle}>{card.answer}</td>
            <td className={st.tdCommonStyle}>{new Date(card.updated).toLocaleString('ru-Ru')}</td>
            <td className={st.tdCreatedBy}>
              <ComponentIconsStar grade={card.grade} />
            </td>
            {myUserId === currentUserId && (
              <td>
                <PlayIcon onClick={() => handlerOnClikLearm(card.deckId)} />
                <ModalEditCard
                  currentAnswer={card.answer}
                  curentQuestion={card.question}
                  cardId={card.id}
                />
                <ModalDeleteCard cardId={card.id} questionCard={card.question} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
