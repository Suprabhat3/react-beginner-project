export type MealsMeta = {
  page?: number
  limit?: number
  totalPages?: number
  previousPage?: boolean | number
  nextPage?: boolean | number
  totalItems?: number
  currentPageItems?: number
}

export async function fetchMeals(page = 1, limit = 10): Promise<{ items: any[]; meta: MealsMeta | null }> {
  const url = `https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch meals')
  const json = await res.json()

  // Handle the paginated response shape shown by the user
  // { statusCode, data: { page, limit, totalPages, ..., data: [ ... ] }, message, success }
  if (json && typeof json === 'object' && json.data) {
    const payload = json.data
    const items = Array.isArray(payload.data) ? payload.data : Array.isArray(payload) ? payload : []
    const meta: MealsMeta = {
      page: payload.page,
      limit: payload.limit,
      totalPages: payload.totalPages,
      previousPage: payload.previousPage,
      nextPage: payload.nextPage,
      totalItems: payload.totalItems,
      currentPageItems: payload.currentPageItems,
    }
    return { items, meta }
  }

  // Fallbacks for other shapes
  if (Array.isArray(json)) return { items: json, meta: null }
  if (json && Array.isArray(json.data)) return { items: json.data, meta: null }

  return { items: [], meta: null }
}

export default fetchMeals
