export type RequestErrorKind = 'network' | 'http' | 'unknown'

export class RequestError extends Error {
  readonly kind: RequestErrorKind

  constructor(kind: RequestErrorKind) {
    super(kind)
    this.name = 'RequestError'
    this.kind = kind
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  let response: Response

  try {
    response = await fetch(url, {
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    if (isAbortError(error)) throw error
    throw new RequestError('network')
  }

  if (!response.ok) throw new RequestError('http')

  try {
    return (await response.json()) as T
  } catch (error) {
    if (isAbortError(error)) throw error
    throw new RequestError('unknown')
  }
}
