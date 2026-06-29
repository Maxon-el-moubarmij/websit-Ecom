import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-gray-600">Page not found.</p>
      <Link
        to="/"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        Go home
      </Link>
    </section>
  )
}

export default NotFound
