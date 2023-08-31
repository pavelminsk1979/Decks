import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialStateType } from './typeAuth.ts'

const initialStateAuth: InitialStateType = {
  isLoggedIn: false,
  myUserId: '',
  currentUserId: '',
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
  },
})

export const authReducer = slice.reducer //это для СТОРА
export const authActions = slice.actions
