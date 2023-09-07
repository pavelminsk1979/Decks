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
import { authActions } from '../../../service/auth/authSlice.ts'
import { useMeQuery } from '../../../service/auth/serverceAuth.ts'
import { decksActions } from '../../../service/decks/decksSlice.ts'
import { useCreateDeckMutation, useGetDecksQuery } from '../../../service/decks/serveceDecks.ts'
import { DecksItemsType } from '../../../service/decks/typeDecks.ts'
import { RootState } from '../../../service/store.ts'

import { ModalCreateDeck } from './modal/modalCreateDeck.tsx'
import { TableDecks } from './tableDecks/tableDecks.tsx'
import st from './tableDecksWithSettings.module.scss'

export const TableDecksWithSettings = () => {
  const { data: meData } = useMeQuery()
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const valueTextField = useSelector((state: RootState) => state.decks.name)
  const valueCurrentPage = useSelector((state: RootState) => state.decks.currentPage)
  const amountDecksInOnePage = useSelector((state: RootState) => state.decks.itemsPerPage)
  const valueSortTable = useSelector((state: RootState) => state.decks.orderBy)
  const activeBattonTabPanel = useSelector((state: RootState) => state.decks.authorId)

  const [valueSlider, setValueSlider] = useState<null | number[]>(null)

  let myUserId = ''

  if (meData) {
    myUserId = meData.id
  }
  if (activeBattonTabPanel === 'All Cards') {
    myUserId = ''
  }
  const { data } = useGetDecksQuery({
    name: valueTextField,
    minCardsCount: valueSlider !== null ? valueSlider[0] : undefined,
    maxCardsCount: valueSlider !== null ? valueSlider[1] : undefined,
    authorId: myUserId,
    orderBy: valueSortTable,
    currentPage: valueCurrentPage,
    itemsPerPage: amountDecksInOnePage,
  })
  const [createDeck] = useCreateDeckMutation()
  const decksItems: DecksItemsType[] | undefined = data?.items

  let startMaxValueSlider = 0

  if (data) {
    startMaxValueSlider = data.maxCardsCount
  }
  const handlerBattonClearFilter = () => {
    setValueSlider(null)

    dispatch(decksActions.setMinCardsCount({ minValue: 0 }))
    dispatch(decksActions.setMaxCardsCount({ maxValue: 0 }))
    dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
    dispatch(decksActions.setItemsPerPage({ amountElementsInOnePage: 8 }))
    dispatch(decksActions.setName({ valueInput: '' }))
    dispatch(decksActions.setAuthorId({ authorId: 'All Cards' }))
    dispatch(decksActions.setOrderBy({ value: '' }))
  }

  const valueSliderSendSever = (value: number[]) => {
    setValueSlider(value)
    let minValue = value[0]
    let maxValue = value[1]

    dispatch(decksActions.setMinCardsCount({ minValue }))
    dispatch(decksActions.setMaxCardsCount({ maxValue }))
  }
  const setCurrentPage = (currentPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
  }
  const setAmountElementsInOnePage = (amountElementsInOnePage: number) => {
    dispatch(decksActions.setItemsPerPage({ amountElementsInOnePage }))
  }

  const handlerTabPanelOnClick = (authorId: string) => {
    dispatch(decksActions.setAuthorId({ authorId }))
  }

  const sendDataToServer = (value: string) => {
    dispatch(decksActions.setOrderBy({ value }))
  }
  const onClickModalCreateDeck = (valueInputModalCreateDeck: string) => {
    createDeck({ name: valueInputModalCreateDeck })
      .unwrap()
      .catch(err => {
        dispatch(authActions.setCurrentError({ currentError: err.data.errorMessages[0].message }))
        console.log(err)
      })
  }

  const handlersetValueInput = (valueInput: string) => {
    dispatch(decksActions.setName({ valueInput }))
  } //для сортировки по сседенному символу

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
          valueInput={valueTextField}
          setValueInput={handlersetValueInput}
          placeholder={'Input search'}
          type="text"
          showIconClose={false}
          label={'Write a symbol '}
        />
        <div className={st.tabPanel}>
          <TabPanel
            active={activeBattonTabPanel ?? 'All Cards'}
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
          amountDecksInOnePage={amountDecksInOnePage ?? 8}
          setAmountElementsInOnePage={setAmountElementsInOnePage}
          valueCurrentPage={valueCurrentPage ?? 1}
          setCurrentPage={setCurrentPage}
          allElements={data?.pagination.totalItems}
        />
      </div>
    </div>
  )
}
