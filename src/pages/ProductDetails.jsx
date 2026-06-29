import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import { formatPrice } from '../utils/helpers'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addItem } = useCart()
  const toast = useToast()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  const related = useMemo(
    () => products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4),
    [product]
  )

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/shop" className="mt-4 inline-block text-sm underline">Back to shop</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast('Please select a size', 'error')
      return
    }
    if (!selectedColor) {
      toast('Please select a color', 'error')
      return
    }
    addItem(product, selectedSize, selectedColor, quantity)
    toast(`${product.name} added to cart`)
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-black dark:hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-black dark:hover:text-white">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600 dark:text-gray-300">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-3">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-black dark:border-white' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            {product.originalPrice && (
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Sale</span>
            )}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Color — <span className="font-normal text-gray-500">{selectedColor || 'Select'}</span></h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      selectedColor === color
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Size — <span className="font-normal text-gray-500">{selectedSize || 'Select'}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 text-xs font-medium rounded-lg border transition-colors ${
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

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Add to Cart
              </button>
              <button
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <Truck size={18} className="mx-auto text-gray-500" />
                <p className="text-[11px] text-gray-500 mt-1">Free shipping over $100</p>
              </div>
              <div className="text-center">
                <Shield size={18} className="mx-auto text-gray-500" />
                <p className="text-[11px] text-gray-500 mt-1">Secure checkout</p>
              </div>
              <div className="text-center">
                <RotateCcw size={18} className="mx-auto text-gray-500" />
                <p className="text-[11px] text-gray-500 mt-1">30-day returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
