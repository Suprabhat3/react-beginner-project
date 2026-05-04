import { useEffect, useState } from 'react'
import MealsList from './components/MealsList'
import fetchMeals from './services/api'
import './App.css'

function App() {
  const [meals, setMeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [meta, setMeta] = useState<any | null>(null)
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null)

  const load = async (p = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchMeals(p, limit)
      setMeals(res.items || [])
      setMeta(res.meta || null)
      setPage(p)
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(page)
  }, [])

  const goto = (p: number) => {
    if (p < 1) return
    if (meta?.totalPages && p > meta.totalPages) return
    load(p)
  }

  const openRecipe = (meal: any) => {
    setSelectedMeal(meal)
  }

  const closeRecipe = () => {
    setSelectedMeal(null)
  }

  const getIngredients = (meal: any) => {
    if (!meal) return []
    const items: string[] = []
    for (let i = 1; i <= 20; i += 1) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient && String(ingredient).trim()) {
        const label = measure && String(measure).trim() ? `${measure} ${ingredient}` : ingredient
        items.push(String(label).trim())
      }
    }
    return items
  }

  const selectedTitle = selectedMeal?.strMeal || selectedMeal?.name || selectedMeal?.title || 'Untitled'
  const selectedImage =
    selectedMeal?.strMealThumb || selectedMeal?.image || selectedMeal?.thumbnail || selectedMeal?.thumb || ''
  const selectedCategory = selectedMeal?.strCategory || selectedMeal?.category || selectedMeal?.cuisine
  const selectedArea = selectedMeal?.strArea || selectedMeal?.area
  const selectedTags = typeof selectedMeal?.strTags === 'string'
    ? selectedMeal.strTags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
    : []
  const selectedInstructions = selectedMeal?.strInstructions || selectedMeal?.instructions || ''
  const selectedIngredients = getIngredients(selectedMeal)

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="hero">
          <span className="hero-badge">World kitchen</span>
          <h1 className="hero-title">Meals & Recipes</h1>
          <p className="hero-subtitle">
            Discover delicious meals from around the world. Browse our curated collection of recipes.
          </p>
          {meta && (
            <div className="hero-stats">
              <span className="stat-pill">
                Total meals <span className="stat-value">{meta.totalItems ?? '-'}</span>
              </span>
              <span className="stat-pill">
                Page <span className="stat-value">{meta.page ?? page}</span> of{' '}
                <span className="stat-value">{meta.totalPages ?? '-'}</span>
              </span>
            </div>
          )}
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#e2c6a3] rounded-full animate-ping absolute"></div>
              <div className="w-20 h-20 border-4 border-transparent border-t-[#a85b2f] rounded-full animate-spin relative"></div>
            </div>
            <p className="mt-6 text-lg text-[#43372b] animate-pulse font-medium">Loading delicious meals...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <div className="state-card">
              <span className="text-2xl">⚠️</span>
              <p className="text-lg text-[#a34a2f] font-medium">{error}</p>
            </div>
          </div>
        ) : meals.length === 0 ? (
          <div className="text-center py-24">
            <div className="state-card">
              <span className="text-6xl">🔍</span>
              <p className="text-lg text-[#43372b]">No meals found. Try adjusting your search.</p>
            </div>
          </div>
        ) : (
          <>
            <MealsList meals={meals} onViewRecipe={openRecipe} />

            <div className="pager">
              <button
                onClick={() => goto((meta?.page ?? page) - 1)}
                disabled={loading || !(meta?.previousPage || (meta?.page && meta.page > 1))}
                className="pager-button"
                type="button"
              >
                ← Previous
              </button>

              <div className="pager-pill">
                Page <strong>{meta?.page ?? page}</strong> of{' '}
                <strong>{meta?.totalPages ?? '-'}</strong>
              </div>

              <button
                onClick={() => goto((meta?.page ?? page) + 1)}
                disabled={loading || !(meta?.nextPage || (meta?.page && (meta.page < (meta.totalPages ?? Infinity))))}
                className="pager-button primary"
                type="button"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>

      {selectedMeal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Recipe details">
          <div className="modal-card">
            <button className="modal-close" type="button" onClick={closeRecipe} aria-label="Close recipe">
              ✕
            </button>

            <div className="modal-hero">
              {selectedImage ? (
                <img src={selectedImage} alt={selectedTitle} />
              ) : (
                <div className="modal-image-fallback">🍽️</div>
              )}
              <div className="modal-hero-overlay">
                <h2>{selectedTitle}</h2>
                <div className="modal-meta">
                  {selectedCategory && <span>{selectedCategory}</span>}
                  {selectedArea && <span>{selectedArea}</span>}
                </div>
              </div>
            </div>

            {(selectedTags.length > 0 || selectedIngredients.length > 0) && (
              <div className="modal-body">
                {selectedTags.length > 0 && (
                  <div className="modal-tags">
                    {selectedTags.map((tag: string) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                {selectedIngredients.length > 0 && (
                  <div>
                    <h3>Ingredients</h3>
                    <ul className="modal-ingredients">
                      {selectedIngredients.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedInstructions && (
                  <div>
                    <h3>Instructions</h3>
                    <p className="modal-instructions">{selectedInstructions}</p>
                  </div>
                )}
              </div>
            )}

            <div className="modal-actions">
              {selectedMeal?.strSource && (
                <a href={selectedMeal.strSource} target="_blank" rel="noreferrer">
                  View source
                </a>
              )}
              {selectedMeal?.strYoutube && (
                <a href={selectedMeal.strYoutube} target="_blank" rel="noreferrer">
                  Watch video
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
