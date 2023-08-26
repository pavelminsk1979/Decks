import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialStateType } from './typeAuth.ts'

const initialStateAuth: InitialStateType = {
  isLoggedIn: false,
  isInitialized: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setValueIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    setValueIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value
    },
  },
})

export const authReducer = slice.reducer //это для СТОРА
export const authActions = slice.actions
