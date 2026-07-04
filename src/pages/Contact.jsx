import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { validateEmail, validateName, validateMessage, sanitizeString, createRateLimiter } from '../utils/helpers'

const rateLimiter = createRateLimiter(5, 60000)

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const firstName = sanitizeString(form.firstName.value)
    const lastName = sanitizeString(form.lastName.value)
    const email = sanitizeString(form.email.value)
    const message = sanitizeString(form.message.value)

    if (!rateLimiter(email)) {
      setErrors({ form: 'Too many submissions. Please try again later.' })
      return
    }

    const newErrors = {}
    if (!validateName(firstName)) newErrors.firstName = true
    if (!validateName(lastName)) newErrors.lastName = true
    if (!validateEmail(email)) newErrors.email = true
    if (!validateMessage(message)) newErrors.message = true

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitted(true)
  }

  return (
    <div className="pt-20">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=1920&q=80"
          alt="Contact Brother Clothing"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Get in Touch
          </motion.h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                  <p className="text-green-600 dark:text-green-400 font-medium">Thanks for reaching out! We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} ref={formRef} className="space-y-4" noValidate>
                  {errors.form && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">{errors.form}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        maxLength={100}
                        className={`w-full px-4 py-3 border bg-white dark:bg-black text-gray-900 dark:text-white rounded-lg text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        maxLength={100}
                        className={`w-full px-4 py-3 border bg-white dark:bg-black text-gray-900 dark:text-white rounded-lg text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      className={`w-full px-4 py-3 border bg-white dark:bg-black text-gray-900 dark:text-white rounded-lg text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={5000}
                      className={`w-full px-4 py-3 border bg-white dark:bg-black text-gray-900 dark:text-white rounded-lg text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white resize-none ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Send Message
                    <Send size={16} />
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Info</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                      <p className="text-sm text-gray-500">hello@brotherclothing.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={18} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                      <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Store Location</p>
                      <p className="text-sm text-gray-500">
                        123 Fashion Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visit Us</h3>
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <MapPin size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Map placeholder</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
