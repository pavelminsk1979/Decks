import { useState } from 'react'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { decksActions } from '../../../service/decks/decksSlice.ts'
import { useGetCardsQuery } from '../../../service/decks/serveceDecks.ts'
import { DecksItemsType } from '../../../service/decks/typeDecks.ts'
import { Button } from '../button'
import { Modal } from '../modal'
import { PaginationSamurai } from '../paginationSamurai'
import { SliderBar } from '../slider'
import { TableDecks } from '../tableDecks'
import { TabPanel } from '../tabPanel'
import { TextField } from '../textField'
import { Typography } from '../typography'

import st from './tableDecksWithSettings.module.scss'

export const TableDecksWithSettings = () => {
  const dispatch = useAppDispatch()
  const [valueCurrentPage, setValueCurrentPage] = useState<number>(1)
  const [amountDecksInOnePage, setAmountDecksInOnePage] = useState(8)
  const [valueSortTable, setValueSortTable] = useState<string | null>(null)
  const [activeBattonTabPanel, setActiveBattonTabPanel] = useState('All Cards')
  const [valueSlider, setValueSlider] = useState<number[] | null>(null)
  const [valueTextField, setValueTextField] = useState('')
  const [valueInput, setValueInput] = useState('')

  let myUserId = '4b29a9f4-745a-44eb-8a94-1c85c5650dbe'

  if (activeBattonTabPanel === 'All Cards') {
    myUserId = ''
  }

  const { data } = useGetCardsQuery({
    name: valueTextField,
    minCardsCount: valueSlider !== null ? valueSlider[0] : undefined,
    maxCardsCount: valueSlider !== null ? valueSlider[1] : undefined,
    authorId: myUserId,
    orderBy: valueSortTable,
    currentPage: valueCurrentPage,
    itemsPerPage: amountDecksInOnePage,
  })
  const decksItems: DecksItemsType[] | undefined = data?.items

  let startMaxValueSlider = 0

  if (data) {
    startMaxValueSlider = data.maxCardsCount
  }
  const handlerBattonClearFilter = () => {
    setValueCurrentPage(1)
    setAmountDecksInOnePage(8)
    setValueSortTable(null)
    setActiveBattonTabPanel('All Cards')
    setValueTextField('')
    setValueInput('')
    setValueSlider(null)
    let minValue = 0
    let maxValue = 0
    let currentPage = 0
    let amountElementsInOnePage = 0
    let valueInput = ''
    let name = ''
    let value = ''

    dispatch(decksActions.setMinCardsCount({ minValue }))
    dispatch(decksActions.setMaxCardsCount({ maxValue }))
    dispatch(decksActions.setCurrentPage({ currentPage }))
    dispatch(decksActions.setItemsPerPage({ amountElementsInOnePage }))
    dispatch(decksActions.setName({ valueInput }))
    dispatch(decksActions.setAuthorId({ name }))
    dispatch(decksActions.setOrderBy({ value }))
  }

  const valueSliderSendSever = (value: number[]) => {
    setValueSlider(value)
    let minValue = value[0]
    let maxValue = value[1]

    dispatch(decksActions.setMinCardsCount({ minValue }))
    dispatch(decksActions.setMaxCardsCount({ maxValue }))
  }
  const setCurrentPage = (currentPage: number) => {
    setValueCurrentPage(currentPage)
    dispatch(decksActions.setCurrentPage({ currentPage }))
  }
  const setAmountElementsInOnePage = (amountElementsInOnePage: number) => {
    setAmountDecksInOnePage(amountElementsInOnePage)
    dispatch(decksActions.setItemsPerPage({ amountElementsInOnePage }))
  }

  const handlerSendInputValue = (valueInput: string) => {
    setValueTextField(valueInput)
    dispatch(decksActions.setName({ valueInput }))
  }

  const handlerTabPanelOnClick = (name: string) => {
    setActiveBattonTabPanel(name)
    dispatch(decksActions.setAuthorId({ name }))
  }

  const sendDataToServer = (value: string) => {
    setValueSortTable(value)
    dispatch(decksActions.setOrderBy({ value }))
  }
  const handlerOnClickModal = () => {
    alert(valueInput)
    setValueInput('')
  }

  return (
    <div className={st.common}>
      <div className={st.blockTitleButton}>
        <Typography variant={'large'}>Packs list</Typography>
        <Modal
          titleButtonOpenModal={'Add New Deck'}
          sizeWidthModal={'540px'}
          sizeHeightModal={'290px'}
          titleModal={'Add New Deck'}
          titleButtonExecutor={'Add New Deck'}
          handlerOnClick={handlerOnClickModal}
        >
          <TextField
            sizeWidthTextField="480px"
            valueInput={valueInput}
            setValueInput={setValueInput}
            placeholder={'Name'}
            label={'Name Deck'}
            type="email"
          />
        </Modal>
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
          <TabPanel
            active={activeBattonTabPanel}
            title="Show packs cards"
            handlerOnClick={handlerTabPanelOnClick}
          />
        </div>

        <div className={st.slider}>
          <Typography variant={'body2'}>Number of cards</Typography>
          <SliderBar
            startMaxValueSlider={startMaxValueSlider}
            valueSliderSendSever={valueSliderSendSever}
            processResetAndValueSliderNull={valueSlider}
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
      <TableDecks decksItems={decksItems} sendDataToServer={sendDataToServer} />
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
