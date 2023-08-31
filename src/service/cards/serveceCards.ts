import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '../refetch.ts'

import { CardsType } from './typeCards.ts'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: customFetchBase,
  endpoints: build => {
    return {
      getCards: build.query<CardsType, string>({
        query: (id: string) => {
          return {
            method: 'GET',
            url: `/v1/decks/${id}/cards`,
          }
        },
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsApi
