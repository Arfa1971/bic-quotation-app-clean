import { ProductList } from './components/ProductList'
import './App.css'

function App() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">BIC Product List</h1>
      <ProductList />
    </div>
  )
}

export default App
