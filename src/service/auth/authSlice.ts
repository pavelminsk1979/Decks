import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialStateType } from './typeAuth.ts'

const initialStateAuth: InitialStateType = {
  isLoggedIn: false,
  myUserId: '',
  currentUserId: '',
  currentError: null,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setValueIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    setCurrentUserId(state, action: PayloadAction<{ currentUserId: string }>) {
      state.currentUserId = action.payload.currentUserId
    },
    setMyUserId(state, action: PayloadAction<{ myUserId: string }>) {
      state.myUserId = action.payload.myUserId
    },
    setCurrentError(state, action: PayloadAction<{ currentError: string | null }>) {
      state.currentError = action.payload.currentError
    },
  },
})

export const authReducer = slice.reducer //это для СТОРА
export const authActions = slice.actions
