import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ArgsGetDecksResponseType } from './typeDecks.ts'

const initialStateDecks: ArgsGetDecksResponseType = {
  minCardsCount: 0,
  maxCardsCount: 0,
  name: '',
  authorId: '',
  orderBy: '',
  currentPage: 0,
  itemsPerPage: 0,
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
    setAuthorId(state, action: PayloadAction<{ name: string }>) {
      state.authorId = action.payload.name
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
  },
})

export const decksReducer = slice.reducer //это для СТОРА

export const decksActions =
  slice.actions /*   это обьект и в нем все методы из reducers: {}...вызов метода будет по такому примеру dispatch(authActions.setIsLoggedIn({value: true}))
 */
