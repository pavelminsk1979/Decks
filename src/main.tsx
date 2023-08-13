import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes/router.tsx'

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
