import { ofType, type Epic } from 'redux-observable'
import { EMPTY, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { isAbortError, RequestError, type RequestErrorKind } from '../../api/fetcher'
import { searchShows } from '../../api/tvmaze/searchShows'
import type { RootState } from '../../app/store'
import {
  searchClearedType,
  searchShowsFailed,
  searchShowsRequestedType,
  searchShowsSucceeded,
  type SearchShowsAction,
} from './SearchShows.actions'

export const searchShowsEpic: Epic<SearchShowsAction, SearchShowsAction, RootState> = (action$) =>
  action$.pipe(
    ofType(searchShowsRequestedType, searchClearedType),
    switchMap((action) => {
      if (action.type === searchClearedType) return EMPTY

      const query = action.query

      return new Observable<SearchShowsAction>((subscriber) => {
        const controller = new AbortController()

        searchShows(query, controller.signal).then(
          (shows) => {
            subscriber.next(searchShowsSucceeded(shows))
            subscriber.complete()
          },
          (error: unknown) => {
            if (isAbortError(error)) {
              subscriber.complete()
              return
            }

            subscriber.next(searchShowsFailed(toErrorKind(error)))
            subscriber.complete()
          },
        )

        return () => controller.abort()
      })
    }),
  )

function toErrorKind(error: unknown): RequestErrorKind {
  return error instanceof RequestError ? error.kind : 'unknown'
}
