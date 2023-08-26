import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authReducer } from './auth/authSlice.ts'
import { authApi } from './auth/serverceAuth.ts'
import { decksReducer } from './decks/decksSlice.ts'
import { decksApi } from './decks/serveceDecks.ts'

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    auth: authReducer,
    [decksApi.reducerPath]: decksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(decksApi.middleware).concat(authApi.middleware),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)

/* @ts-ignore */ /* store.getState()  */
window.store = store
