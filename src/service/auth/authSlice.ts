import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialStateType } from './typeAuth.ts'

const initialStateAuth: InitialStateType = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setValueIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const authReducer = slice.reducer //это для СТОРА
export const authActions = slice.actions
