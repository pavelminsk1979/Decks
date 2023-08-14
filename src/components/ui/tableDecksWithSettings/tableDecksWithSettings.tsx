import { useState } from 'react'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { useGetCardsQuery } from '../../../service/decks/serveceDecks.ts'
import { Button } from '../button'
import { PaginationSamurai } from '../paginationSamurai'
import { SliderBar } from '../slider'
import { TableDecks } from '../tableDecks'
import { itemTabType, TabPanel } from '../tabPanel'
import { TextField } from '../textField'
import { Typography } from '../typography'

import st from './tableDecksWithSettings.module.scss'

export const TableDecksWithSettings = () => {
  const {} = useGetCardsQuery()
  const [valueInput, setValueInput] = useState('')

  const handlerSendInputValue = (valueInput: string) => {
    alert(valueInput)
  }
  const [active, setActive] = useState('All Cards')

  const handlerTabPanel1 = (name: string) => {
    alert(`Мне показалось или вы нажали кнопку ${name}...Перепроверьте лучше!`)
    setActive(name)
  }
  const handlerTabPanel2 = (name: string) => {
    alert(`Мне показалось или вы нажали кнопку ${name}...Перепроверьте лучше!`)
    setActive(name)
  }
  const dataTabPanel: itemTabType[] = [
    { id: 'tab1', name: 'My Cards', onClick: handlerTabPanel1, disabled: false },
    { id: 'tab2', name: 'All Cards', onClick: handlerTabPanel2, disabled: false },
  ]
  const startArrayValue = [2, 10]
  const handlerOnValueCommit = (value: number[]) => {
    alert(`Вы поставили левый ползунок на ${value[0]}  а правый на ${value[1]}`)
  }
  const dataContentTable = [
    {
      title: 'Pack Name1',
      cardsCount: 10,
      updated: '2023-07-07',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name2',
      cardsCount: 5,
      updated: '2023-07-06',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name3',
      cardsCount: 8,
      updated: '2023-07-05',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name4',
      cardsCount: 3,
      updated: '2023-07-07',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name5',
      cardsCount: 12,
      updated: '2023-07-04',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name6',
      cardsCount: 10,
      updated: '2023-07-07',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name7',
      cardsCount: 5,
      updated: '2023-07-06',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name8',
      cardsCount: 8,
      updated: '2023-07-05',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name9',
      cardsCount: 3,
      updated: '2023-07-07',
      createdBy: 'Ivan Ivanov',
    },
    {
      title: 'Pack Name10',
      cardsCount: 12,
      updated: '2023-07-04',
      createdBy: 'Ivan Ivanov',
    },
  ]

  const dataHeadersTable = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'createdBy',
      title: 'Created by',
    },
  ]
  const sendDataToServer = (value: string) => {
    alert('sendDataToServer...   ' + value)
  }

  return (
    <div className={st.common}>
      <div className={st.blockTitleButton}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'}>Add New Pack</Button>
      </div>
      <div className={st.blockSettings}>
        <TextField
          handlerOnChange={handlerSendInputValue}
          valueInput={valueInput}
          setValueInput={setValueInput}
          placeholder={'Input search'}
          type="text"
          showIconClose={false}
        />
        <div className={st.tabPanel}>
          <TabPanel active={active} data={dataTabPanel} title="Show packs cards" />
        </div>

        <div className={st.slider}>
          <Typography variant={'body2'}>Number of cards</Typography>
          <SliderBar onValueCommit={handlerOnValueCommit} startArrayValue={startArrayValue} />
        </div>
        <Button className={st.buttonIconDelete} variant={'secondary'}>
          <DeleteIcon />
          Clear Filter
        </Button>
      </div>
      <TableDecks
        dataContentTable={dataContentTable}
        dataHeadersTable={dataHeadersTable}
        sendDataToServer={sendDataToServer}
      />
      <div className={st.pagination}>
        <PaginationSamurai allElements={1200} />
      </div>
    </div>
  )
}
