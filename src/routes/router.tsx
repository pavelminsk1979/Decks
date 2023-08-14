import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom'

import { App } from '../App.tsx'
import { EditProfile, Login, Profile, Register, TableDecksWithSettings } from '../components/ui'

function PrivateRoutes() {
  const isLoggedIn = false

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

const privateRoutes: RouteObject[] = [
  {
    path: '/decks',
    element: <TableDecksWithSettings />,
  },
  {
    path: '/editProfile',
    element: <EditProfile />,
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
