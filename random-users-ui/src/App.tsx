import { useEffect, useMemo, useState } from 'react'

type ApiUser = {
  name?: { title?: string; first?: string; last?: string }
  email?: string
  phone?: string
  picture?: { large?: string }
  location?: { city?: string; country?: string }
  dob?: { age?: number }
  login?: { username?: string }
}

const API_URL = 'https://api.freeapi.app/api/v1/public/randomusers'

function App() {
  const [users, setUsers] = useState<ApiUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadUsers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Unable to fetch user data right now.')
        }

        const payload = await response.json()
        const list = payload?.data?.data ?? payload?.data ?? payload?.users ?? []

        if (!Array.isArray(list)) {
          throw new Error('Unexpected response format.')
        }

        if (isMounted) {
          setUsers(list)
        }
      } catch (fetchError) {
        if (isMounted) {
          const message =
            fetchError instanceof Error
              ? fetchError.message
              : 'Something went wrong while loading users.'
          setError(message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => {
    if (users.length === 0) {
      return null
    }

    const ages = users
      .map((user) => user?.dob?.age)
      .filter((age): age is number => typeof age === 'number')

    const averageAge = ages.length
      ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length)
      : null

    return {
      count: users.length,
      averageAge,
    }
  }, [users])

  return (
    <div className="min-h-screen bg-ember text-russet">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-14 md:px-12">
        <header className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.32em] text-russet/70">
            Random Users Directory
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold text-espresso md:text-5xl">
                Meet the people behind the data
              </h1>
              <p className="max-w-2xl text-base text-russet/80">
                Fresh profiles powered by the FreeAPI Random Users endpoint. Each
                card highlights key details like location, contact, and profile
                age in a calm, earthy layout.
              </p>
            </div>
            <div className="rounded-2xl border border-ember-300 bg-ember-200 px-6 py-4 text-sm text-russet/80 shadow-soft">
              <p className="font-semibold text-espresso">Snapshot</p>
              <div className="mt-2 flex items-center gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">Users</p>
                  <p className="text-2xl font-semibold text-espresso">
                    {stats?.count ?? '...'}
                  </p>
                </div>
                <div className="h-10 w-px bg-ember-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">Avg Age</p>
                  <p className="text-2xl font-semibold text-espresso">
                    {stats?.averageAge ?? '...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6">
          {isLoading && (
            <div className="rounded-3xl border border-ember-300 bg-ember-200 p-8 text-center text-sm text-russet/80">
              Loading profiles...
            </div>
          )}

          {error && (
            <div className="rounded-3xl border border-coral/40 bg-coral/10 p-8 text-center text-sm text-espresso">
              {error}
            </div>
          )}

          {!isLoading && !error && users.length === 0 && (
            <div className="rounded-3xl border border-ember-300 bg-ember-200 p-8 text-center text-sm text-russet/80">
              No users found. Try refreshing the page.
            </div>
          )}

          {!isLoading && !error && users.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {users.map((user, index) => {
                const fullName = [
                  user?.name?.title,
                  user?.name?.first,
                  user?.name?.last,
                ]
                  .filter(Boolean)
                  .join(' ')

                return (
                  <article
                    key={`${user?.login?.username ?? 'user'}-${index}`}
                    className="group flex h-full flex-col gap-5 rounded-3xl border border-ember-300 bg-ember-50 p-6 shadow-card transition duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl border border-ember-300">
                        {user?.picture?.large ? (
                          <img
                            src={user.picture.large}
                            alt={fullName || 'Random user'}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-ember-200 text-xs uppercase text-russet/60">
                            N/A
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-russet/70">
                          {user?.login?.username ?? 'Profile'}
                        </p>
                        <h2 className="font-display text-xl text-espresso">
                          {fullName || 'Unnamed user'}
                        </h2>
                      </div>
                    </div>

                    <div className="grid gap-3 text-sm text-russet/80">
                      <div className="flex items-center justify-between gap-3 border-b border-ember-200 pb-2">
                        <span className="text-xs uppercase tracking-[0.2em]">
                          Location
                        </span>
                        <span className="text-right text-espresso">
                          {[user?.location?.city, user?.location?.country]
                            .filter(Boolean)
                            .join(', ') || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 border-b border-ember-200 pb-2">
                        <span className="text-xs uppercase tracking-[0.2em]">
                          Age
                        </span>
                        <span className="text-espresso">
                          {user?.dob?.age ?? 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-[0.2em]">
                          Contact
                        </span>
                        <span className="text-right text-espresso">
                          {user?.email ?? user?.phone ?? 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
