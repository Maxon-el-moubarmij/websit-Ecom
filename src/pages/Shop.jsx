import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/LoadingSkeleton'
import products, { categories } from '../data/products'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
]

const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36']

export default function Shop() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('')
  const [priceRange, setPriceRange] = useState([0, 300])
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }
    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize))
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }
    return result
  }, [selectedCategory, selectedSize, priceRange, sortBy, searchQuery])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedSize('')
    setPriceRange([0, 300])
    setSortBy('newest')
    setSearchQuery('')
  }

  const hasFilters = selectedCategory !== 'all' || selectedSize || priceRange[0] > 0 || priceRange[1] < 300 || sortBy !== 'newest' || searchQuery

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
              selectedCategory === 'all' ? 'bg-black dark:bg-white text-white dark:text-black font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                selectedCategory === cat.id ? 'bg-black dark:bg-white text-white dark:text-black font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                selectedSize === size
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Price Range</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>${priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={300}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="flex-1 accent-black dark:accent-white"
          />
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Shop</h1>
            <p className="text-sm text-gray-500 mt-1">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg text-sm w-48 outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={18} />
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterContent />
          </aside>

          {loading ? (
            <ProductGridSkeleton />
          ) : filtered.length === 0 ? (
            <div className="flex-1 text-center py-20">
              <p className="text-gray-400">No products match your filters.</p>
              <button onClick={clearFilters} className="mt-2 text-sm text-black dark:text-white underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-5">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute top-0 left-0 bottom-0 w-72 bg-white dark:bg-black p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <FilterContent />
          </motion.div>
        </div>
      )}
    </div>
  )
}
