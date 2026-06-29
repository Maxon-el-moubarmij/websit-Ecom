import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import products from '../data/products'

export default function SearchBar({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [open])

  const results = query
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="max-w-3xl mx-auto px-4 py-6">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
                <Search size={20} className="text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 outline-none text-lg"
                />
                <button onClick={onClose} aria-label="Close search">
                  <X size={20} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                </button>
              </div>
              {results.length > 0 && (
                <div className="mt-4 space-y-2">
                  {results.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-12 h-16 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {query && results.length === 0 && (
                <p className="mt-4 text-sm text-gray-400">No products found for "{query}"</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
