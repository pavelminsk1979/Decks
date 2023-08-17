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
  const [amountDecksInOnePage, setAmountDecksInOnePage] = useState(8)
  const [valueSortTable, setValueSortTable] = useState<string | null>(null)
  const [activeBattonTabPanel, setActiveBattonTabPanel] = useState('All Cards')
  let myUserId = '4b29a9f4-745a-44eb-8a94-1c85c5650dbe'

  if (activeBattonTabPanel === 'All Cards') {
    myUserId = ''
  }
  const [valueSlider, setValueSlider] = useState<number[] | null>(null)
  const [valueTextField, setValueTextField] = useState('')

  const { data } = useGetCardsQuery({
    name: valueTextField,
    minCardsCount: valueSlider !== null ? valueSlider[0] : undefined,
    maxCardsCount: valueSlider !== null ? valueSlider[1] : undefined,
    authorId: myUserId,
    orderBy: valueSortTable,
    currentPage: valueCurrentPage,
    itemsPerPage: amountDecksInOnePage,
  })

  const handlerBattonClearFilter = () => {
    setValueCurrentPage(1)
    setAmountDecksInOnePage(8)
    setValueSortTable(null)
    setActiveBattonTabPanel('All Cards')
    setValueTextField('')
    setValueInput('')
    setValueSlider(null)
  }

  let startMaxValueSlider = 0

  if (data) {
    startMaxValueSlider = data.maxCardsCount
  }
  const valueSliderSendSever = (value: number[]) => {
    setValueSlider(value)
  }
  const setCurrentPage = (currentPage: number) => {
    setValueCurrentPage(currentPage)
  }
  const setAmountElementsInOnePage = (amountElementsInOnePage: number) => {
    setAmountDecksInOnePage(amountElementsInOnePage)
  }

  const decksItems: DecksItemsType[] | undefined = data?.items

  const [valueInput, setValueInput] = useState('')

  const handlerSendInputValue = (valueInput: string) => {
    setValueTextField(valueInput)
  }

  const handlerTabPanel1 = (name: string) => {
    setActiveBattonTabPanel(name)
  }
  const handlerTabPanel2 = (name: string) => {
    setActiveBattonTabPanel(name)
  }
  const dataTabPanel: itemTabType[] = [
    { id: 'tab1', name: 'My Cards', onClick: handlerTabPanel1, disabled: false },
    { id: 'tab2', name: 'All Cards', onClick: handlerTabPanel2, disabled: false },
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
    setValueSortTable(value)
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
          label={'Write a symbol and  press еnter'}
        />
        <div className={st.tabPanel}>
          <TabPanel active={activeBattonTabPanel} data={dataTabPanel} title="Show packs cards" />
        </div>

        <div className={st.slider}>
          <Typography variant={'body2'}>Number of cards</Typography>
          <SliderBar
            startMaxValueSlider={startMaxValueSlider}
            valueSliderSendSever={valueSliderSendSever}
          />
        </div>
        <Button
          onClick={handlerBattonClearFilter}
          className={st.buttonIconDelete}
          variant={'secondary'}
        >
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
