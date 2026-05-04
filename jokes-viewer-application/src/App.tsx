import { useState, useEffect } from 'react'

interface Joke {
  id: number
  content: string
  categories: string[]
}

interface ApiResponse {
  statusCode: number
  data: {
    page: number
    limit: number
    totalPages: number
    previousPage: boolean
    nextPage: boolean
    totalItems: number
    currentPageItems: number
    data: Joke[]
  }
  message: string
  success: boolean
}

function App() {
  const [jokes, setJokes] = useState<Joke[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const fetchJokes = async () => {
    setLoading(true)
    setError(null)
    setCopied(null)
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/randomjokes')
      const data: ApiResponse = await response.json()
      if (data.success && data.data.data && data.data.data.length > 0) {
        setJokes(data.data.data)
      } else {
        setError('Failed to fetch jokes. Please try again.')
      }
    } catch {
      setError('Error fetching jokes. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJokes()
  }, [])

  const copyToClipboard = (id: number, content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              😂 Joke Viewer
            </h1>
            <p className="text-orange-100 text-lg">Laugh out loud with random jokes!</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && jokes.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block">
                <div className="h-16 w-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 text-lg font-medium">Loading funny jokes...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
            <button
              onClick={fetchJokes}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : jokes.length > 0 ? (
          <div className="space-y-6">
            {/* Stats Header */}
            <div className="bg-white rounded-2xl p-6 border-2 border-orange-100 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-4xl font-bold text-orange-500">{jokes.length}</p>
                  <p className="text-gray-600 text-sm mt-2">Total Jokes</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-amber-500">😄</p>
                  <p className="text-gray-600 text-sm mt-2">Keep Laughing!</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-orange-500">⭐</p>
                  <p className="text-gray-600 text-sm mt-2">Random Collection</p>
                </div>
              </div>
            </div>

            {/* Jokes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jokes.map((joke) => (
                <div
                  key={joke.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-orange-500 hover:border-amber-500"
                >
                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {joke.categories && joke.categories.length > 0 ? (
                      joke.categories.map((category, index) => (
                        <span
                          key={index}
                          className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                        GENERAL
                      </span>
                    )}
                  </div>

                  {/* Joke Content */}
                  <p className="text-lg font-semibold text-gray-800 leading-relaxed mb-6">
                    {joke.content}
                  </p>

                  {/* Footer */}
                  <div className="border-t-2 border-orange-100 pt-4 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-gray-500 text-sm font-medium">
                      ID: {joke.id}
                    </span>
                    <button
                      onClick={() => copyToClipboard(joke.id, joke.content)}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${
                        copied === joke.id
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      {copied === joke.id ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Get New Jokes Button */}
            <button
              onClick={fetchJokes}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100"
            >
              {loading ? '🔄 Loading...' : '🎭 Get Another Set of Jokes'}
            </button>
          </div>
        ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="mb-2">💡 Built with React, TypeScript & Tailwind CSS</p>
          <p className="text-sm">Powered by <a href="https://api.freeapi.app/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 font-semibold">FreeAPI</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
