const EMAIL_REGEX = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]{2,}$/
const NAME_MAX_LENGTH = 100
const MESSAGE_MAX_LENGTH = 5000

export function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

export function validateEmail(email) {
  if (typeof email !== 'string') return false
  if (email.length > 254) return false
  return EMAIL_REGEX.test(email.trim())
}

export function validateName(name) {
  if (typeof name !== 'string') return false
  const trimmed = name.trim()
  if (trimmed.length < 1 || trimmed.length > NAME_MAX_LENGTH) return false
  return true
}

export function validateMessage(message) {
  if (typeof message !== 'string') return false
  const trimmed = message.trim()
  if (trimmed.length < 1 || trimmed.length > MESSAGE_MAX_LENGTH) return false
  return true
}

export function sanitizeCartItem(item) {
  if (!item || typeof item !== 'object') return null
  const id = Number(item.id)
  if (!Number.isFinite(id) || id <= 0) return null
  const quantity = Number(item.quantity)
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 999) return null
  const price = Number(item.price)
  if (!Number.isFinite(price) || price < 0) return null
  return {
    id,
    name: typeof item.name === 'string' ? item.name.slice(0, 200) : '',
    price,
    image: typeof item.image === 'string' ? item.image.slice(0, 500) : '',
    size: typeof item.size === 'string' ? item.size.slice(0, 20) : '',
    color: typeof item.color === 'string' ? item.color.slice(0, 50) : '',
    quantity: Math.min(quantity, 999),
  }
}

export function sanitizeCartItems(items) {
  if (!Array.isArray(items)) return []
  return items.map(sanitizeCartItem).filter(Boolean)
}

export function createRateLimiter(maxAttempts, windowMs) {
  const attempts = new Map()
  return (key) => {
    const now = Date.now()
    const windowStart = now - windowMs
    const timestamps = (attempts.get(key) || []).filter(t => t > windowStart)
    if (timestamps.length >= maxAttempts) return false
    timestamps.push(now)
    attempts.set(key, timestamps)
    return true
  }
}
