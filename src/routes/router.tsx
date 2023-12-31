import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom'

import { App } from '../App.tsx'
import { Login, Profile, Register } from '../components/ui'
import { TableCards } from '../page/cards/tableCards.tsx'
import { TableDecksWithSettings } from '../page/decks/tableDecksWithSettings/tableDecksWithSettings.tsx'
import { Learn } from '../page/learn/learn.tsx'
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
  {
    path: '/cards/:id',
    element: <TableCards />,
  },
  {
    path: '/learn/:id',
    element: <Learn />,
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
    element: <Navigate to="/login" />,
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
