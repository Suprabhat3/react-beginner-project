import { useEffect, useState } from 'react'

type CatData = {
  id: number
  name: string
  image: string
  description: string
  temperament: string
  origin: string
  life_span: string
  weight: {
    imperial: string
    metric: string
  }
  indoor: number
  lap: number
  hypoallergenic: number
}

type CatResponse = {
  statusCode: number
  data: CatData
  message: string
  success: boolean
}

const API_URL = 'https://api.freeapi.app/api/v1/public/cats/cat/random'

function App() {
  const [cat, setCat] = useState<CatData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCat = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Could not fetch cat (${response.status})`)
      }

      const json = (await response.json()) as CatResponse
      if (!json.success || !json.data) {
        throw new Error(json.message || 'Unexpected API response')
      }

      setCat(json.data)
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : 'Failed to load a random cat.',
      )
      setCat(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCat()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 p-8 shadow-sm shadow-slate-200/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                Random Cat Viewer
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Discover a new cat image on every click.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Fetch a randomly selected cat from the public API and display it with breed details and image metadata.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={fetchCat}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? 'Loading…' : 'Show new cat'}
              </button>
              <span className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {cat ? `Breed: ${cat.name}` : 'No cat loaded yet'}
              </span>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Status</div>
              {loading ? 'Fetching cat...' : error ? 'Error' : 'Ready'}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">API</div>
              freeapi.app
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Response</div>
              {error ?? 'Fetched successfully'}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Action</div>
              Click the button to refresh the image.
            </div>
          </div>
        </header>

        {error ? (
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
            {error}
          </div>
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div className="overflow-hidden rounded-[2rem] bg-slate-900/5">
                {cat ? (
                  <img
                    src={cat.image}
                    alt={`${cat.name} cat`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-96 items-center justify-center bg-slate-100 text-slate-500">
                    {loading ? 'Loading cat image…' : 'No image available.'}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Breed details
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">{cat?.name ?? 'Loading...'}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {cat?.description ?? 'A random cat breed will appear here once the API returns an image.'}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Origin</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{cat?.origin ?? '—'}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Life span</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{cat?.life_span ?? '—'} years</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Weight</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{cat?.weight.metric ?? '—'} kg</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Temperament</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{cat?.temperament ?? '—'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-700">
                    Indoor
                    <p className="mt-1 font-semibold text-slate-900">{cat?.indoor ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-700">
                    Lap cat
                    <p className="mt-1 font-semibold text-slate-900">{cat?.lap ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-700">
                    Hypoallergenic
                    <p className="mt-1 font-semibold text-slate-900">{cat?.hypoallergenic ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
