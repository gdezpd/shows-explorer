import { configureStore, type UnknownAction } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import {
  searchShowsReducer,
  type SearchShowsState,
} from '../screens/SearchShows/SearchShows.reducer'
import { searchShowsEpic } from '../screens/SearchShows/SearchShows.epic'
import type { SearchShowsAction } from '../screens/SearchShows/SearchShows.actions'

export type RootState = {
  searchShows: SearchShowsState
}

export type AppAction = SearchShowsAction

function rootReducer(state: RootState | undefined, action: AppAction | UnknownAction): RootState {
  return {
    searchShows: searchShowsReducer(state?.searchShows, action),
  }
}

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, RootState>()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
})

epicMiddleware.run(searchShowsEpic)
