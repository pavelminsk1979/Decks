import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ArgsGetDecksResponseType, DecksItemsType, DecksType } from './typeDecks.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  tagTypes: ['Decks'],
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
        providesTags: ['Decks'],
      }),
      createDeck: build.mutation<DecksItemsType, { name: string }>({
        query: ({ name }) => {
          return {
            url: '/v1/decks',
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetCardsQuery, useCreateDeckMutation } = decksApi
