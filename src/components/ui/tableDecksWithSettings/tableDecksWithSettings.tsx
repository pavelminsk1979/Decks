import { useState } from 'react'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { useGetCardsQuery } from '../../../service/decks/serveceDecks.ts'
import { DecksItemsType } from '../../../service/decks/typeDecks.ts'
import { Button } from '../button'
import { PaginationSamurai } from '../paginationSamurai'
import { SliderBar } from '../slider'
import { TableDecks } from '../tableDecks'
import { itemTabType, TabPanel } from '../tabPanel'
import { TextField } from '../textField'
import { Typography } from '../typography'

import st from './tableDecksWithSettings.module.scss'

export const TableDecksWithSettings = () => {
  const [valueCurrentPage, setValueCurrentPage] = useState<number>(1)
  const [amountDecksInOnePage, setAmountDecksInOnePage] = useState(7)

  const { data } = useGetCardsQuery({
    currentPage: valueCurrentPage,
    itemsPerPage: amountDecksInOnePage,
  })
  const setCurrentPage = (currentPage: number) => {
    setValueCurrentPage(currentPage)
  }
  const setAmountElementsInOnePage = (amountElementsInOnePage: number) => {
    setAmountDecksInOnePage(amountElementsInOnePage)
  }

  const decksItems: DecksItemsType[] | undefined = data?.items

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
        decksItems={decksItems}
        dataHeadersTable={dataHeadersTable}
        sendDataToServer={sendDataToServer}
      />
      <div className={st.pagination}>
        <PaginationSamurai
          amountDecksInOnePage={amountDecksInOnePage}
          setAmountElementsInOnePage={setAmountElementsInOnePage}
          valueCurrentPage={valueCurrentPage}
          setCurrentPage={setCurrentPage}
          allElements={data?.pagination.totalItems}
        />
      </div>
    </div>
  )
}
