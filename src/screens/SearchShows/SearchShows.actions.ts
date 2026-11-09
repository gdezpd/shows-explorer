import type { RequestErrorKind } from '../../api/fetcher'
import type { Show } from '../../entities/show'

export const searchShowsRequestedType = 'searchShows/requested' as const
export const searchShowsSucceededType = 'searchShows/succeeded' as const
export const searchShowsFailedType = 'searchShows/failed' as const
export const searchClearedType = 'searchShows/cleared' as const
export const genreToggledType = 'searchShows/genreToggled' as const
export const genresClearedType = 'searchShows/genresCleared' as const
export const pageChangedType = 'searchShows/pageChanged' as const

export function searchShowsRequested(query: string) {
  return { type: searchShowsRequestedType, query }
}

export function searchShowsSucceeded(shows: Show[]) {
  return { type: searchShowsSucceededType, shows }
}

export function searchShowsFailed(kind: RequestErrorKind) {
  return { type: searchShowsFailedType, kind }
}

export function searchCleared() {
  return { type: searchClearedType }
}

export function genreToggled(genre: string) {
  return { type: genreToggledType, genre }
}

export function genresCleared() {
  return { type: genresClearedType }
}

export function pageChanged(page: number) {
  return { type: pageChangedType, page }
}

export type SearchShowsAction =
  | ReturnType<typeof searchShowsRequested>
  | ReturnType<typeof searchShowsSucceeded>
  | ReturnType<typeof searchShowsFailed>
  | ReturnType<typeof searchCleared>
  | ReturnType<typeof genreToggled>
  | ReturnType<typeof genresCleared>
  | ReturnType<typeof pageChanged>
