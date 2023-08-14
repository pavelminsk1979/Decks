import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom'

import { Login, Profile, Register, TableDecksWithSettings } from '../components/ui'
import {App} from "../App.tsx";

function PrivateRoutes() {
  const isLoggedIn = true

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
]

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
        path: '/',
        element: <Login />,
      },
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
