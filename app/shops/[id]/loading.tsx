export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb Skeleton */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-5 bg-gray-800 rounded w-48 animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-12 bg-gray-800 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-800 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="w-16 h-16 bg-gray-800 rounded-xl animate-pulse ml-4"></div>
            </div>
            <div className="h-20 bg-gray-800 rounded w-full animate-pulse"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="h-6 bg-gray-800 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="h-6 bg-gray-800 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="h-12 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Additional Cards */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="h-6 bg-gray-800 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>

          {/* Back Button Skeleton */}
          <div className="h-12 bg-gray-800 rounded w-48 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
