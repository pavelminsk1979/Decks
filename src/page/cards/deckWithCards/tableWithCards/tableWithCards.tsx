import { DATA_HEADERS_TABLE_CARDS } from '../../../../common/constants.ts'
import { CardsItemsType } from '../../../../service/cards/typeCards.ts'

import { ModalDeleteCard } from './modalDeleteCard/modalDeleteCard.tsx'
import st from './tableWithCards.module.scss'

type PropsType = {
  cardsItems: CardsItemsType[]
  myUserId: string
  currentUserId: string
}
export const TableWithCards = ({ cardsItems, currentUserId, myUserId }: PropsType) => {
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
            <td className={st.tdCreatedBy}>{card.grade}</td>
            {myUserId === currentUserId && (
              <td>
                <ModalDeleteCard cardId={card.id} questionCard={card.question} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
