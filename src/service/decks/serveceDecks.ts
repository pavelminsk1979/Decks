import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ArgsGetDecksResponseType, DecksType } from './typeDecks.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es/',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: build => {
    return {
      getCards: build.query<DecksType, ArgsGetDecksResponseType>({
        query: args => {
          return {
            method: 'GET',
            url: '/v1/decks',
            params: args,
          }
        },
      }),
    }
  },
})

export const { useGetCardsQuery } = decksApi
