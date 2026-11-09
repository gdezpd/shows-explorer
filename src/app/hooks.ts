import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { Dispatch } from 'redux'
import type { AppAction, RootState } from './store'

export function useAppDispatch() {
  return useDispatch<Dispatch<AppAction>>()
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
