import { DATA_HEADERS_TABLE_CARDS } from '../../../../common/constants.ts'
import { CardsItemsType } from '../../../../service/cards/typeCards.ts'

import st from './tableWithCards.module.scss'

type PropsType = {
  cardsItems: CardsItemsType[]
}
export const TableWithCards = ({ cardsItems }: PropsType) => {
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
        {cardsItems?.map((deck: CardsItemsType) => (
          <tr key={deck.id} className={st.tr}>
            <td className={st.tdCommonStyle}>{deck.question}</td>
            <td className={st.tdCommonStyle}>{deck.answer}</td>
            <td className={st.tdCommonStyle}>{new Date(deck.updated).toLocaleString('ru-Ru')}</td>
            <td className={st.tdCreatedBy}>{deck.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
