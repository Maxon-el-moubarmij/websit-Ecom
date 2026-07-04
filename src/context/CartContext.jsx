import { createContext, useContext, useReducer, useEffect } from 'react'
import { sanitizeCartItems } from '../utils/helpers'

const CartContext = createContext()

const STORAGE_KEY = 'brother-cart'

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { items: [] }
    const parsed = JSON.parse(stored)
    return { items: sanitizeCartItems(parsed) }
  } catch {
    return { items: [] }
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload
      const existing = state.items.find(
        i => i.id === item.id && i.size === item.size && i.color === item.color
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === existing.id && i.size === existing.size && i.color === existing.color
              ? { ...i, quantity: Math.min(i.quantity + item.quantity, 999) }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...item, quantity: Math.min(item.quantity, 999) }] }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color)
        ),
      }
    case 'UPDATE_QUANTITY': {
      const qty = Math.min(Math.max(1, Number(action.payload.quantity)), 999)
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color
            ? { ...i, quantity: qty }
            : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* Storage full or unavailable */
    }
  }, [state.items])

  const addItem = (product, size, color, quantity = 1) => {
    if (!product || typeof product !== 'object') return
    const qty = Math.min(Math.max(1, Number(quantity)), 999)
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: Number(product.id),
        name: String(product.name ?? '').slice(0, 200),
        price: Number(product.price) || 0,
        image: String(product.images?.[0] ?? '').slice(0, 500),
        size: String(size ?? '').slice(0, 20),
        color: String(color ?? '').slice(0, 50),
        quantity: qty,
      },
    })
  }

  const removeItem = (id, size, color) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: Number(id), size: String(size), color: String(color) } })
  }

  const updateQuantity = (id, size, color, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: Number(id), size: String(size), color: String(color), quantity: Number(quantity) } })
  }

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
