import { useState } from 'react'

import { ArrowIconDown } from '../../../../../assets/icons/arrowIconDown.tsx'
import { ArrowUpIcon } from '../../../../../assets/icons/arrowUpIcon.tsx'
import { DATA_HEADERS_TABLE } from '../../../../../common/constants.ts'
import st from '../tableDecks.module.scss'

type SortType = {
  key: string
  direction: 'asc' | 'desc'
} | null
type PropsType = {
  sendDataToServer: (value: string) => void
}

export const HeaderTable = ({ sendDataToServer }: PropsType) => {
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
  )
}
