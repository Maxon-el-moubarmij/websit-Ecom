import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { validateEmail, sanitizeString, createRateLimiter } from '../utils/helpers'

const rateLimiter = createRateLimiter(3, 60000)

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const sanitized = sanitizeString(email)

    if (!rateLimiter(sanitized)) {
      setError('Too many attempts. Please try again later.')
      return
    }

    if (!validateEmail(sanitized)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setSubscribed(true)
    setEmail('')
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Join the Brotherhood</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
            Subscribe for early access to new drops, exclusive offers, and 10% off your first order.
          </p>
          {subscribed ? (
            <p className="mt-6 text-green-600 dark:text-green-400 font-medium text-sm">
              Thanks for subscribing! Check your inbox for 10% off.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto" noValidate>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="Enter your email"
                  required
                  maxLength={254}
                  className={`flex-1 px-4 py-3 border bg-white dark:bg-black text-gray-900 dark:text-white rounded-l-lg outline-none text-sm focus:ring-1 focus:ring-black dark:focus:ring-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-black dark:bg-white text-white dark:text-black rounded-r-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              {error && (
                <p className="mt-2 text-red-500 text-xs text-left">{error}</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
