import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../service/store.ts'

export const useAppDispatch = () => useDispatch<AppDispatch>()
