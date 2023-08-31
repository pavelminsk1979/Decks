import { useState } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import {
  Button,
  PaginationSamurai,
  SliderBar,
  TabPanel,
  TextField,
  Typography,
} from '../../../components/ui'
import { useMeQuery } from '../../../service/auth/serverceAuth.ts'
import { decksActions } from '../../../service/decks/decksSlice.ts'
import {
  useCreateDeckMutation,
  useDeleteDecksMutation,
  useEditDecksMutation,
  useGetDecksQuery,
} from '../../../service/decks/serveceDecks.ts'
import { DecksItemsType } from '../../../service/decks/typeDecks.ts'
import { RootState } from '../../../service/store.ts'

import { ModalCreateDeck } from './modal/modalCreateDeck.tsx'
import { TableDecks } from './tableDecks/tableDecks.tsx'
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
  const { data: meData } = useMeQuery()
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const [deleteCard] = useDeleteDecksMutation()
  const [editCard] = useEditDecksMutation()
  const [mainState, setMainState] = useState<MainStateType>({
    valueCurrentPage: 1,
    amountDecksInOnePage: 8,
    valueSortTable: null,
    activeBattonTabPanel: 'All Cards',
    valueSlider: null,
    valueTextField: '',
    valueInput: '',
  })

  let myUserId = ''

  if (meData) {
    myUserId = meData.id
  }
  if (mainState.activeBattonTabPanel === 'All Cards') {
    myUserId = ''
  }
  const { data } = useGetDecksQuery({
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
  const onClickModalCreateDeck = (valueInput: string) => {
    createDeck({ name: valueInput })
  }

  const handlersetValueInput = (valueInput: string) => {
    setMainState({ ...mainState, valueInput: valueInput })
  }
  const onClickModalDeleteDeck = (idDeck: string) => {
    deleteCard(idDeck)
  }
  const onClickModalEditDeck = (idDeck: string, valueInput: string) => {
    const arg = { id: idDeck, name: valueInput }

    editCard(arg)
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={st.common}>
      <div className={st.blockTitleButton}>
        <Typography variant={'large'}>Packs list</Typography>
        <ModalCreateDeck onClickModalCreateDeck={onClickModalCreateDeck} />
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
      <TableDecks
        setValueInput={handlersetValueInput}
        valueInput={mainState.valueInput}
        onClickModalEditDeck={onClickModalEditDeck}
        onClickModalDeleteDeck={onClickModalDeleteDeck}
        decksItems={decksItems}
        sendDataToServer={sendDataToServer}
      />
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
