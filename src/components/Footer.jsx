import { Link } from 'react-router-dom'
import { Globe, X, Video } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-bold tracking-wider mb-4">BROTHER</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
              Built for Brothers. Designed for Everyone.
            </p>
            <div className="flex gap-4 mt-6">
              <Globe size={18} className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-black cursor-pointer transition-colors" />
              <X size={18} className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-black cursor-pointer transition-colors" />
              <Video size={18} className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-black cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              {['Hoodies', 'T-Shirts', 'Pants', 'Jackets', 'Accessories'].map(item => (
                <li key={item}>
                  <Link to={`/shop?category=${item.toLowerCase()}`} className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              {['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ'].map(item => (
                <li key={item}>
                  <Link to={item === 'Contact' ? '/contact' : '#'} className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Privacy', 'Terms'].map(item => (
                <li key={item}>
                  <Link to={item === 'About' ? '/about' : '#'} className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Brother Clothing. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
