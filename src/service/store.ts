import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { decksReducer } from './decks/decksSlice.ts'
import { decksApi } from './decks/serveceDecks.ts'

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    [decksApi.reducerPath]: decksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(decksApi.middleware),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)

/* @ts-ignore */ /* store.getState()  */
window.store = store
