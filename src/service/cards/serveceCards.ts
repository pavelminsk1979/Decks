import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '../refetch.ts'

import { CardsType, CreateCardType, ResponceCreateCardType } from './typeCards.ts'

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
      createCards: build.mutation<ResponceCreateCardType, CreateCardType>({
        query: ({ id, body }) => {
          return {
            method: 'POST',
            url: `/v1/decks/${id}/cards`,
            body: body,
          }
        },
      }),
    }
  },
})

export const { useGetCardsQuery, useCreateCardsMutation } = cardsApi
