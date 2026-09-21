export function CarSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
          <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <CarSkeleton key={i} />
      ))}
    </div>
  );
}
