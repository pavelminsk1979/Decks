import { useState } from 'react'

import { ArrowIconDown } from '../../../assets/icons/arrowIconDown.tsx'
import { ArrowUpIcon } from '../../../assets/icons/arrowUpIcon.tsx'
import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { EditIcon } from '../../../assets/icons/editIcon.tsx'
import { PlayIcon } from '../../../assets/icons/playIcon.tsx'

import st from './tableDecks.module.scss'

type DataItemType = {
  title: string
  cardsCount: number
  updated: string
  createdBy: string
}
type DataHeaderType = {
  key: string
  title: string
}
type PropsType = {
  dataContentTable: DataItemType[]
  dataHeadersTable: DataHeaderType[]
  sendDataToServer: (value: string) => void
}
type SortType = {
  key: string
  direction: 'asc' | 'desc'
} | null
export const TableDecks = ({ dataContentTable, dataHeadersTable, sendDataToServer }: PropsType) => {
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

  return (
    <table className={st.table}>
      <thead>
        <tr className={st.header}>
          {dataHeadersTable.map(el => (
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
        {dataContentTable.map(item => (
          <tr key={item.title} className={st.tr}>
            <td className={st.tdCommonStyle}>{item.title}</td>
            <td className={st.tdCommonStyle}>{item.cardsCount}</td>
            <td className={st.tdCommonStyle}>{item.updated}</td>
            <td className={st.tdCreatedBy}>{item.createdBy}</td>
            <td className={st.tdIcons}>
              <PlayIcon />
              <EditIcon />
              <DeleteIcon />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
