import { createApi } from '@reduxjs/toolkit/query/react'

import { FormLoginType, FormRegisterType } from '../../components/ui'
import { customFetchBase } from '../refetch.ts'

import { ResponseLoginType, ResponseRegisterType } from './typeAuth.ts'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: build => {
    return {
      me: build.query<any, void>({
        query: () => {
          return {
            method: 'GET',
            url: '/v1/auth/me',
          }
        },
      }),
      register: build.mutation<ResponseRegisterType, FormRegisterType>({
        query: data => {
          return {
            method: 'POST',
            url: '/v1/auth/sign-up',
            body: data,
          }
        },
      }),
      login: build.mutation<ResponseLoginType, FormLoginType>({
        query: data => {
          return {
            method: 'POST',
            url: '/v1/auth/login',
            body: data,
          }
        },
      }),
      logout: build.mutation<void, void>({
        query: () => {
          return {
            method: 'POST',
            url: '/v1/auth/logout',
          }
        },
      }),
    }
  },
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useMeQuery } = authApi
