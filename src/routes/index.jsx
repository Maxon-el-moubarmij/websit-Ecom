import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <Home /> },
    ],
  },
])

export default router
