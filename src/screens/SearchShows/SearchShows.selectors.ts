import type { Show } from '../../entities/show'
import type { RootState } from '../../app/store'

export const PAGE_SIZE = 3

export const selectGenres = memo((state: RootState): string[] => {
  const genres = new Set<string>()

  for (const show of state.searchShows.results) {
    for (const genre of show.genres) genres.add(genre)
  }

  return [...genres].sort((left, right) => left.localeCompare(right, 'en'))
})

export const selectFilteredShows = memo((state: RootState): Show[] => {
  const { results, selectedGenres } = state.searchShows

  if (selectedGenres.length === 0) return results

  return results.filter((show) => selectedGenres.every((genre) => show.genres.includes(genre)))
})

export function selectPageCount(state: RootState): number {
  return Math.max(1, Math.ceil(selectFilteredShows(state).length / PAGE_SIZE))
}

export function selectCurrentPage(state: RootState): number {
  return Math.min(Math.max(state.searchShows.page, 1), selectPageCount(state))
}

export const selectPageItems = memo((state: RootState): Show[] => {
  const start = (selectCurrentPage(state) - 1) * PAGE_SIZE
  return selectFilteredShows(state).slice(start, start + PAGE_SIZE)
})

function memo<Result>(selector: (state: RootState) => Result): (state: RootState) => Result {
  let hasCache = false
  let lastState: RootState | undefined
  let lastResult: Result

  return (state) => {
    if (hasCache && lastState === state) return lastResult

    lastResult = selector(state)
    lastState = state
    hasCache = true
    return lastResult
  }
}
