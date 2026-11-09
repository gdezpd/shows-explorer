import type { UnknownAction } from 'redux'
import type { RequestErrorKind } from '../../api/fetcher'
import type { Show } from '../../entities/show'
import {
  genreToggledType,
  genresClearedType,
  pageChangedType,
  searchClearedType,
  searchShowsFailedType,
  searchShowsRequestedType,
  searchShowsSucceededType,
  type SearchShowsAction,
} from './SearchShows.actions'

export type SearchStatus = 'idle' | 'loading' | 'error'

export type SearchShowsState = {
  query: string
  results: Show[]
  status: SearchStatus
  error: string | null
  selectedGenres: string[]
  page: number
}

export const initialSearchShowsState: SearchShowsState = {
  query: '',
  results: [],
  status: 'idle',
  error: null,
  selectedGenres: [],
  page: 1,
}

const errorMessage: Record<RequestErrorKind, string> = {
  network: 'Нет соединения с TVmaze. Проверьте сеть и попробуйте снова.',
  http: 'TVmaze не смог выполнить запрос. Попробуйте ещё раз.',
  unknown: 'Не получилось загрузить шоу. Попробуйте ещё раз.',
}

export function searchShowsReducer(
  state: SearchShowsState = initialSearchShowsState,
  action: SearchShowsAction | UnknownAction,
): SearchShowsState {
  if (!isSearchShowsAction(action)) return state

  switch (action.type) {
    case searchShowsRequestedType:
      return {
        query: action.query,
        results: [],
        status: 'loading',
        error: null,
        selectedGenres: [],
        page: 1,
      }
    case searchShowsSucceededType:
      return {
        ...state,
        results: action.shows,
        status: 'idle',
        error: null,
      }
    case searchShowsFailedType:
      return {
        ...state,
        results: [],
        status: 'error',
        error: errorMessage[action.kind],
        selectedGenres: [],
        page: 1,
      }
    case searchClearedType:
      return isInitial(state) ? state : initialSearchShowsState
    case genreToggledType: {
      const selected = state.selectedGenres.includes(action.genre)
        ? state.selectedGenres.filter((genre) => genre !== action.genre)
        : [...state.selectedGenres, action.genre]

      return { ...state, selectedGenres: selected, page: 1 }
    }
    case genresClearedType:
      return state.selectedGenres.length === 0 && state.page === 1
        ? state
        : { ...state, selectedGenres: [], page: 1 }
    case pageChangedType:
      return { ...state, page: action.page }
    default:
      return state
  }
}

function isSearchShowsAction(action: UnknownAction): action is SearchShowsAction {
  return (
    action.type === searchShowsRequestedType ||
    action.type === searchShowsSucceededType ||
    action.type === searchShowsFailedType ||
    action.type === searchClearedType ||
    action.type === genreToggledType ||
    action.type === genresClearedType ||
    action.type === pageChangedType
  )
}

function isInitial(state: SearchShowsState): boolean {
  return (
    state.query === '' &&
    state.results.length === 0 &&
    state.status === 'idle' &&
    state.error === null &&
    state.selectedGenres.length === 0 &&
    state.page === 1
  )
}
