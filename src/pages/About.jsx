import { motion } from 'framer-motion'
import { Shield, Leaf, Users } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Quality First',
    text: 'Every garment is crafted from premium materials with meticulous attention to detail. We never compromise on quality.',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    text: 'We are committed to responsible production. Using eco-friendly materials and ethical manufacturing practices.',
  },
  {
    icon: Users,
    title: 'Community',
    text: 'Brother Clothing is more than a brand — it is a community built on shared values of authenticity and brotherhood.',
  },
]

export default function About() {
  return (
    <div className="pt-20">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=1920&q=80"
          alt="About Brother Clothing"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Built for Brothers. Designed for Everyone.</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Brother Clothing was born from a simple idea — create premium essentials that bridge the gap between 
                luxury and everyday wear. Our founders, two brothers with a passion for fashion, noticed a void in 
                the market for high-quality minimalist clothing that did not compromise on comfort or style.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                What started as a small collection of hoodies and t-shirts has evolved into a full lifestyle brand 
                worn by people across the globe. Every piece is designed in-house and produced using the finest 
                materials, ensuring that each garment feels as good as it looks.
              </p>
            </div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=800&q=80"
                alt="Brother Clothing studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
              >
                <div className="w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{v.title}</h3>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=800&q=80"
                alt="Brother Clothing lifestyle"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-[4/3] rounded-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1608236415058-3b34c35c1ea3?w=800&q=80"
                alt="Brother Clothing collection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
