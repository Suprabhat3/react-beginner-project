import { useEffect, useState } from 'react'

type QuoteItem = {
  author: string
  content: string
  tags: string[]
  authorSlug: string
  length: number
  dateAdded: string
  dateModified: string
  id: number
}

type QuoteApiData = {
  page: number
  limit: number
  totalPages: number
  previousPage: boolean
  nextPage: boolean
  totalItems: number
  currentPageItems: number
  data: QuoteItem[]
}

type QuoteApiResponse = {
  statusCode: number
  data: QuoteApiData
  message: string
  success: boolean
}

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes'

function App() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPageItems, setCurrentPageItems] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [copiedQuoteId, setCopiedQuoteId] = useState<number | null>(null)

  const copyQuoteText = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedQuoteId(id)
      window.setTimeout(() => setCopiedQuoteId(null), 1800)
    } catch {
      setCopiedQuoteId(null)
    }
  }

  const fetchQuotes = async (requestedPage = page) => {
    setLoading(true)
    setError(null)

    try {
      const url = new URL(API_URL)
      url.searchParams.set('page', String(requestedPage))
      url.searchParams.set('limit', String(limit))

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`Failed to load quotes (${response.status})`)
      }

      const json = (await response.json()) as QuoteApiResponse | QuoteItem[]
      let quoteData: QuoteItem[] = []

      if (Array.isArray(json)) {
        quoteData = json
        setMessage('Quotes loaded successfully.')
        setTotalPages(1)
        setTotalItems(json.length)
        setCurrentPageItems(json.length)
        setHasNextPage(false)
        setHasPreviousPage(false)
      } else if (json.data && Array.isArray(json.data.data)) {
        const apiData = json.data
        quoteData = apiData.data
        setMessage(json.message || 'Quotes fetched successfully')
        setTotalPages(apiData.totalPages)
        setTotalItems(apiData.totalItems)
        setCurrentPageItems(apiData.currentPageItems)
        setHasNextPage(apiData.nextPage)
        setHasPreviousPage(apiData.previousPage)
        setPage(apiData.page)
      } else {
        throw new Error('Unexpected API response format.')
      }

      setQuotes(quoteData)
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : 'An unexpected error occurred while loading quotes.',
      )
      setQuotes([])
      setTotalPages(1)
      setTotalItems(0)
      setCurrentPageItems(0)
      setHasNextPage(false)
      setHasPreviousPage(false)
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return
    setPage(newPage)
    fetchQuotes(newPage)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-10 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 p-8 shadow-sm shadow-slate-200/40 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                Quotes listing interface
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Browse quotes with full response data
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This app displays the wrapped API response and the full quote fields
                including tags, author slug, dates, and pagination state.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => fetchQuotes(page)}
                className="inline-flex items-center justify-center rounded-3xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? 'Loading…' : 'Refresh'}
              </button>
              <div className="rounded-3xl border border-slate-200 bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                Page {page} of {totalPages}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Total items</div>
              {totalItems}
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Current page items</div>
              {currentPageItems}
            </div>
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Status</div>
              {loading ? 'Loading' : successString(message, error)}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">API response</div>
              freeapi.app
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border border-sky-200 bg-sky-50 p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Response details</p>
              <p className="mt-1 text-sm text-slate-700">
                statusCode: 200, message: {message || '—'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={loading || !hasPreviousPage}
                onClick={() => handlePageChange(page - 1)}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={loading || !hasNextPage}
                onClick={() => handlePageChange(page + 1)}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-600"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section aria-live="polite">
          {loading && !quotes.length ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              Fetching the latest quotes for you...
            </div>
          ) : error ? (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
              {error}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-30px_rgba(15,23,42,0.35)]"
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                        Quote #{quote.id}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                        {quote.tags.length} tags
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyQuoteText(quote.content, quote.id)}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                    >
                      {copiedQuoteId === quote.id ? 'Copied' : 'Copy quote'}
                    </button>
                  </div>
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/5 p-6">
                    <div className="absolute -left-2 top-0 text-[3.5rem] font-bold leading-none text-sky-100/80">“</div>
                    <p className="relative text-xl leading-9 text-slate-950">
                      {quote.content}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{quote.author}</p>
                      <p className="text-sm text-slate-500">@{quote.authorSlug}</p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {quote.length} chars
                    </div>
                  </div>
                  {quote.tags.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {quote.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-6 grid gap-2 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 px-3 py-2">ID: {quote.id}</div>
                    <div className="rounded-3xl bg-slate-50 px-3 py-2">Added: {quote.dateAdded}</div>
                    <div className="rounded-3xl bg-slate-50 px-3 py-2">Modified: {quote.dateModified}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function successString(message: string, error: string | null) {
  if (error) return 'Error'
  if (!message) return 'Ready'
  return 'Success'
}

export default App
