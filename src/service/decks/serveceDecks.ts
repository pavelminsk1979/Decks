import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '../refetch.ts'

import {
  ArgsGetDecksResponseType,
  DecksItemsType,
  DecksType,
  deleteDecksResponseType,
} from './typeDecks.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  tagTypes: ['Decks'],
  baseQuery: customFetchBase,
  endpoints: build => {
    return {
      deleteDecks: build.mutation<deleteDecksResponseType, string>({
        query: (id: string) => {
          return {
            method: 'DELETE',
            url: `/v1/decks/${id}`,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getDecks: build.query<DecksType, ArgsGetDecksResponseType>({
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

export const { useGetDecksQuery, useCreateDeckMutation, useDeleteDecksMutation } = decksApi
