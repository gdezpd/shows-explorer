import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  genreToggled,
  genresCleared,
  pageChanged,
  searchCleared,
  searchShowsRequested,
} from '../SearchShows.actions'
import { PAGE_SIZE, selectCurrentPage, selectFilteredShows, selectGenres, selectPageCount, selectPageItems } from '../SearchShows.selectors'

const DEBOUNCE_MS = 400

export type SearchPhase = 'idle' | 'loading' | 'error' | 'empty' | 'empty-filter' | 'results'

export function useSearchShowsPresenter() {
  const dispatch = useAppDispatch()
  const query = useAppSelector((state) => state.searchShows.query)
  const status = useAppSelector((state) => state.searchShows.status)
  const error = useAppSelector((state) => state.searchShows.error)
  const selectedGenres = useAppSelector((state) => state.searchShows.selectedGenres)
  const resultCount = useAppSelector((state) => state.searchShows.results.length)
  const genres = useAppSelector(selectGenres)
  const filteredCount = useAppSelector((state) => selectFilteredShows(state).length)
  const shows = useAppSelector(selectPageItems)
  const page = useAppSelector(selectCurrentPage)
  const pageCount = useAppSelector(selectPageCount)
  const [input, setInput] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextQuery = input.trim()

      if (!nextQuery) {
        dispatch(searchCleared())
        return
      }

      dispatch(searchShowsRequested(nextQuery))
    }, DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [dispatch, input])

  const phase = getPhase(status, query, resultCount, filteredCount)

  return {
    input,
    onInput: setInput,
    queryLabel: query ? `Результаты по запросу «${query}»` : null,
    phase,
    error,
    genres,
    selectedGenres,
    shows,
    page,
    pageCount,
    showGenres: resultCount > 0 && status === 'idle',
    showPagination: phase === 'results' && filteredCount > PAGE_SIZE,
    onToggleGenre: (genre: string) => dispatch(genreToggled(genre)),
    onClearGenres: () => dispatch(genresCleared()),
    onPageChange: (nextPage: number) => dispatch(pageChanged(nextPage)),
  }
}

function getPhase(
  status: 'idle' | 'loading' | 'error',
  query: string,
  resultCount: number,
  filteredCount: number,
): SearchPhase {
  if (status === 'loading') return 'loading'
  if (status === 'error') return 'error'
  if (!query) return 'idle'
  if (resultCount === 0) return 'empty'
  if (filteredCount === 0) return 'empty-filter'
  return 'results'
}
