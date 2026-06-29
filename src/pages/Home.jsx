import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCarousel from '../components/ProductCarousel'
import CategoryCards from '../components/CategoryCards'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import products from '../data/products'

const newArrivals = products.filter(p => p.isNew)
const bestSellers = products.filter(p => p.isBestSeller)

export default function Home() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=1920&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
          >
            BROTHER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-lg md:text-xl text-gray-300 font-light tracking-wide"
          >
            Built for Brothers. Designed for Everyone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <CategoryCards />

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Latest Drops</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">Fresh from the vault</p>
          </motion.div>
          <ProductCarousel title="" products={newArrivals} />
        </div>
      </section>

      <ProductCarousel title="Best Sellers" products={bestSellers} />

      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Quality Over Everything
              </h2>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Every piece is crafted with premium materials and meticulous attention to detail. 
                We believe in creating clothing that lasts — both in style and durability.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold border-b border-white pb-0.5 hover:text-gray-300 transition-colors"
              >
                Our Story <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=800&q=80"
                alt="Brother Clothing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </div>
  )
}
