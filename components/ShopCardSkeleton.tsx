export default function ShopCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-[1px]">
      <div className="h-full rounded-xl bg-gray-900 p-6 animate-pulse">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>
          <div className="ml-2 w-9 h-9 bg-gray-800 rounded-lg"></div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-4 h-4 bg-gray-800 rounded mr-2 mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-800 rounded w-full"></div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-800 rounded mr-2"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-800 rounded mr-2"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-800 rounded w-24"></div>
            <div className="w-4 h-4 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
