export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
