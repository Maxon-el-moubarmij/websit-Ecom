export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-lg mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto" />
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto" />
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-36 mx-auto mt-8" />
      </div>
    </div>
  )
}
