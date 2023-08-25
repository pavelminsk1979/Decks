import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { FormRegisterType } from '../../components/ui'

import { RegisterType } from './typeAuth.ts'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es/',
    credentials: 'include',
  }),
  endpoints: build => {
    return {
      register: build.mutation<RegisterType, FormRegisterType>({
        query: data => {
          return {
            method: 'POST',
            url: '/v1/auth/sign-up',
            body: data,
          }
        },
      }),
    }
  },
})

export const { useRegisterMutation } = authApi
