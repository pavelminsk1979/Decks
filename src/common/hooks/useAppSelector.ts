import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '../../service/store.ts'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
