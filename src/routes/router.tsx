import { createBrowserRouter, Navigate } from 'react-router-dom'

import { App } from '../App.tsx'
import {
  CheckEmail,
  CreateNewPasswordComponent,
  EditProfile,
  ForgotYourPassword,
  Login,
  Profile,
  Register,
} from '../components/ui'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        path: '/404',
        element: <h2>404: СТРАНИЦА НЕ НАЙДЕНА...ОШИБКА!</h2>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forgotYourPassword',
        element: <ForgotYourPassword />,
      },
      {
        path: '/checkEmail',
        element: <CheckEmail />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/editProfile',
        element: <EditProfile />,
      },

      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/createNewPasswordComponent',
        element: <CreateNewPasswordComponent />,
      },
    ],
  },
])
