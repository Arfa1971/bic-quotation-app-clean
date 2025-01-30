import { useState, useEffect } from 'react'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock: number
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`)
        const data = response.data
        
        // Ensure we're working with an array
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error('Received non-array data:', data)
          setProducts([])
          setError('Invalid data format received')
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Error loading products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>
  if (products.length === 0) return <div className="text-center p-4">No products found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-2">${product.price}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  )
}
