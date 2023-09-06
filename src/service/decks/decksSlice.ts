import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ArgsGetDecksResponseType } from './typeDecks.ts'

const initialStateDecks: ArgsGetDecksResponseType = {
  minCardsCount: 0,
  maxCardsCount: 0,
  name: '',
  authorId: 'All Cards',
  orderBy: '',
  currentPage: 1,
  itemsPerPage: 8,
  currentNameDack: '',
  currentGradeCard: 0,
  currentQuestionCard: '',
}

const slice = createSlice({
  name: 'decks',
  initialState: initialStateDecks,
  reducers: {
    setMinCardsCount(state, action: PayloadAction<{ minValue: number }>) {
      state.minCardsCount = action.payload.minValue
    },
    setMaxCardsCount(state, action: PayloadAction<{ maxValue: number }>) {
      state.maxCardsCount = action.payload.maxValue
    },
    setName(state, action: PayloadAction<{ valueInput: string }>) {
      state.name = action.payload.valueInput
    },
    setAuthorId(state, action: PayloadAction<{ authorId: string }>) {
      state.authorId = action.payload.authorId
    },
    setOrderBy(state, action: PayloadAction<{ value: string }>) {
      state.orderBy = action.payload.value
    },
    setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      state.currentPage = action.payload.currentPage
    },
    setItemsPerPage(state, action: PayloadAction<{ amountElementsInOnePage: number }>) {
      state.itemsPerPage = action.payload.amountElementsInOnePage
    },
    setCurrentNameDack(state, action: PayloadAction<{ currentNameDack: string }>) {
      state.currentNameDack = action.payload.currentNameDack
    },
    setCurrentGradeCard(state, action: PayloadAction<{ currentGradeCard: number }>) {
      state.currentGradeCard = action.payload.currentGradeCard
    },
    setCurrentQuestionCard(state, action: PayloadAction<{ currentQuestionCard: string }>) {
      state.currentQuestionCard = action.payload.currentQuestionCard
    },
  },
})

export const decksReducer = slice.reducer //это для СТОРА

export const decksActions =
  slice.actions /*   это обьект и в нем все методы из reducers: {}...вызов метода будет по такому примеру dispatch(authActions.setIsLoggedIn({value: true}))
 */
