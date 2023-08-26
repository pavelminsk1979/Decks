import { useState } from 'react'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { decksActions } from '../../../service/decks/decksSlice.ts'
import { useCreateDeckMutation, useGetCardsQuery } from '../../../service/decks/serveceDecks.ts'
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

type MainStateType = {
  valueCurrentPage: number
  amountDecksInOnePage: number
  valueSortTable: null | string
  activeBattonTabPanel: string
  valueSlider: null | number[]
  valueTextField: string
  valueInput: string
}
export const TableDecksWithSettings = () => {
  const {} = useGetCardsQuery({})
  const dispatch = useAppDispatch()
  const [mainState, setMainState] = useState<MainStateType>({
    valueCurrentPage: 1,
    amountDecksInOnePage: 8,
    valueSortTable: null,
    activeBattonTabPanel: 'All Cards',
    valueSlider: null,
    valueTextField: '',
    valueInput: '',
  })

  let myUserId = 'fe158fab-0656-43b4-953b-7a851330b10d'

  if (mainState.activeBattonTabPanel === 'All Cards') {
    myUserId = ''
  }

  const { data } = useGetCardsQuery({
    name: mainState.valueTextField,
    minCardsCount: mainState.valueSlider !== null ? mainState.valueSlider[0] : undefined,
    maxCardsCount: mainState.valueSlider !== null ? mainState.valueSlider[1] : undefined,
    authorId: myUserId,
    orderBy: mainState.valueSortTable,
    currentPage: mainState.valueCurrentPage,
    itemsPerPage: mainState.amountDecksInOnePage,
  })
  const [createDeck] = useCreateDeckMutation()
  const decksItems: DecksItemsType[] | undefined = data?.items

  let startMaxValueSlider = 0

  if (data) {
    startMaxValueSlider = data.maxCardsCount
  }
  const handlerBattonClearFilter = () => {
    setMainState({
      ...mainState,
      valueCurrentPage: 1,
      amountDecksInOnePage: 8,
      valueSortTable: null,
      activeBattonTabPanel: 'All Cards',
      valueSlider: null,
      valueTextField: '',
      valueInput: '',
    })

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
    setMainState({ ...mainState, valueSlider: value })
    let minValue = value[0]
    let maxValue = value[1]

    dispatch(decksActions.setMinCardsCount({ minValue }))
    dispatch(decksActions.setMaxCardsCount({ maxValue }))
  }
  const setCurrentPage = (currentPage: number) => {
    setMainState({ ...mainState, valueCurrentPage: currentPage })
    dispatch(decksActions.setCurrentPage({ currentPage }))
  }
  const setAmountElementsInOnePage = (amountElementsInOnePage: number) => {
    setMainState({ ...mainState, amountDecksInOnePage: amountElementsInOnePage })
    dispatch(decksActions.setItemsPerPage({ amountElementsInOnePage }))
  }

  const handlerSendInputValue = (valueInput: string) => {
    setMainState({ ...mainState, valueTextField: valueInput })
    dispatch(decksActions.setName({ valueInput }))
  }

  const handlerTabPanelOnClick = (name: string) => {
    setMainState({ ...mainState, activeBattonTabPanel: name })
    dispatch(decksActions.setAuthorId({ name }))
  }

  const sendDataToServer = (value: string) => {
    setMainState({ ...mainState, valueSortTable: value })
    dispatch(decksActions.setOrderBy({ value }))
  }
  const handlerOnClickModal = () => {
    createDeck({ name: mainState.valueInput })
    setMainState({ ...mainState, valueInput: '' })
  }
  const handlerCloseModal = () => {
    setMainState({ ...mainState, valueInput: '' })
  }
  const handlersetValueInput = (valueInput: string) => {
    setMainState({ ...mainState, valueInput: valueInput })
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
          handlerCloseModal={handlerCloseModal}
        >
          <TextField
            sizeWidthTextField="480px"
            valueInput={mainState.valueInput}
            setValueInput={handlersetValueInput}
            placeholder={'Name'}
            label={'Name Deck'}
            type="email"
          />
        </Modal>
      </div>
      <div className={st.blockSettings}>
        <TextField
          handlerOnChange={handlerSendInputValue}
          valueInput={mainState.valueInput}
          setValueInput={handlersetValueInput}
          placeholder={'Input search'}
          type="text"
          showIconClose={false}
          label={'Write a symbol and  press еnter'}
        />
        <div className={st.tabPanel}>
          <TabPanel
            active={mainState.activeBattonTabPanel}
            title="Show packs cards"
            handlerOnClick={handlerTabPanelOnClick}
          />
        </div>

        <div className={st.slider}>
          <Typography variant={'body2'}>Number of cards</Typography>
          <SliderBar
            startMaxValueSlider={startMaxValueSlider}
            valueSliderSendSever={valueSliderSendSever}
            processResetAndValueSliderNull={mainState.valueSlider}
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
          amountDecksInOnePage={mainState.amountDecksInOnePage}
          setAmountElementsInOnePage={setAmountElementsInOnePage}
          valueCurrentPage={mainState.valueCurrentPage}
          setCurrentPage={setCurrentPage}
          allElements={data?.pagination.totalItems}
        />
      </div>
    </div>
  )
}
