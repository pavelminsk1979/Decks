import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom'

import { App } from '../App.tsx'
import { Login, Profile, Register, TableDecksWithSettings } from '../components/ui'
import { RootState } from '../service/store.ts'

function PrivateRoutes() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

const privateRoutes: RouteObject[] = [
  {
    path: '/decks',
    element: <TableDecksWithSettings />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]
const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/404',
    element: <h2>404: СТРАНИЦА НЕ НАЙДЕНА...ОШИБКА!</h2>,
  },
  {
    path: '/',
    element: <Login />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
      },
    ],
  },
])
