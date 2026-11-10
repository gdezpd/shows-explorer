import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
  type UnknownAction,
} from 'redux'
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

const composeEnhancers =
  import.meta.env.DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(searchShowsEpic)
