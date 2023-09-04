import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '../refetch.ts'

import {
  CardsType,
  CreateCardType,
  EditCardType,
  RandomCardType,
  ResponceCreateCardType,
} from './typeCards.ts'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  tagTypes: ['Cards'],
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
        providesTags: ['Cards'],
      }),
      createCards: build.mutation<ResponceCreateCardType, CreateCardType>({
        query: ({ id, body }) => {
          return {
            method: 'POST',
            url: `/v1/decks/${id}/cards`,
            body: body,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCards: build.mutation<void, string>({
        query: (id: string) => {
          return {
            method: 'DELETE',
            url: `/v1/cards/${id}`,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      editCards: build.mutation<ResponceCreateCardType, EditCardType>({
        query: arg => {
          return {
            method: 'PATCH',
            url: `/v1/cards/${arg.id}`,
            body: { question: arg.question, answer: arg.answer },
          }
        },
        invalidatesTags: ['Cards'],
      }),
      getRandomCard: build.query<RandomCardType, string>({
        query: (id: string) => {
          return {
            method: 'GET',
            url: `/v1/decks/${id}/learn`,
          }
        },
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useCreateCardsMutation,
  useDeleteCardsMutation,
  useEditCardsMutation,
  useGetRandomCardQuery,
} = cardsApi
