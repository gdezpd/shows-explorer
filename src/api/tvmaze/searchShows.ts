import type { Show } from '../../entities/show'
import { getJson, RequestError } from '../fetcher'

const SEARCH_URL = 'https://api.tvmaze.com/search/shows'

type TvmazeSearchItem = {
  show: {
    id: number
    name: string
    genres?: string[]
    premiered: string | null
    rating?: { average: number | null }
    status?: string
    summary: string | null
    image: { medium?: string; original?: string } | null
    url: string
  }
}

export function searchShows(query: string, signal: AbortSignal): Promise<Show[]> {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}`

  return getJson<unknown>(url, signal).then((payload) => {
    if (!Array.isArray(payload)) throw new RequestError('unknown')

    return payload.map((item) => toShow(item as TvmazeSearchItem))
  })
}

function toShow(item: TvmazeSearchItem): Show {
  const show = item.show

  return {
    id: show.id,
    name: show.name,
    genres: show.genres ?? [],
    premiered: show.premiered,
    rating: show.rating?.average ?? null,
    status: show.status ?? '',
    summary: stripHtml(show.summary),
    image: show.image?.medium ?? show.image?.original ?? null,
    url: show.url,
  }
}

function stripHtml(value: string | null): string {
  if (!value) return ''

  const document = new DOMParser().parseFromString(value, 'text/html')
  return (document.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}
