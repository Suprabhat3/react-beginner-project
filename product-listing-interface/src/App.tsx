import { useState, useEffect } from 'react'

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
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
    data: Product[]
  }
  message: string
  success: boolean
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/randomproducts')
        const data: ApiResponse = await response.json()
        if (data.success) {
          setProducts(data.data.data)
        } else {
          setError('Failed to fetch products')
        }
      } catch {
        setError('Error fetching products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Product Listing</h1>
          <p className="mt-2 text-gray-600">Discover our amazing collection of products</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
              <div className="relative group bg-gray-100 flex items-center justify-center h-48">
                <img
                  src="image.jpg"
                  alt={product.title}
                  className="w-full h-48 object-fill group-hover:scale-105 transition-transform duration-300"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 50 ? 'bg-green-50 text-green-600' : product.stock > 20 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                {product.brand && (
                  <p className="mt-2 text-xs text-gray-500">
                    Brand: <span className="font-medium text-gray-700">{product.brand}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
