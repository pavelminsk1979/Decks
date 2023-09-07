import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { authActions } from '../service/auth/authSlice.ts'
import { RootState } from '../service/store.ts'

export const GlobalError = () => {
  const error = useSelector<RootState, string | null>(state => state.auth.currentError)
  const dispatch = useDispatch()

  if (error !== null) {
    toast.error(error)
  }

  // Данный код необходим для того, чтобы занулять ошибку в стейте
  // после того как ошибка установилась.
  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(authActions.setCurrentError({ currentError: null }))
      }, 1000)
    }
  }, [error])

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  )
}
