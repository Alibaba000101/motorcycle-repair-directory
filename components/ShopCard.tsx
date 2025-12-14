import Link from 'next/link';
import { RepairShop } from '@/lib/database.types';
import RatingStars from './RatingStars';

interface ShopCardProps {
  shop: RepairShop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const hasWebsite = shop.website && shop.website !== 'N/A';
  const hasPhone = shop.phone && shop.phone !== 'N/A';
  const ratingNum = typeof shop.rating === 'string' ? parseFloat(shop.rating) || 0 : shop.rating;

  return (
    <Link href={`/shops/${shop.place_id}`} className="group">
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-[1px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="relative h-full rounded-xl bg-gray-900 p-6">
          <div className="mb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                  {shop.name}
                </h3>
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{shop.city}</span>
                </div>
              </div>

              <div className="ml-2 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {ratingNum > 0 && (
              <div className="mb-3">
                <RatingStars rating={shop.rating} reviewsCount={shop.reviews_count} size="sm" />
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start text-gray-400">
              <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="line-clamp-2">{shop.address}</span>
            </div>

            {shop.hours && shop.hours !== 'N/A' && (
              <div className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="line-clamp-1">{shop.hours}</span>
              </div>
            )}

            {hasPhone && (
              <div className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="line-clamp-1">{shop.phone}</span>
              </div>
            )}

            {hasWebsite && (
              <div className="flex items-center text-orange-500 group-hover:text-orange-400">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="line-clamp-1">Visit Website →</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Click for details</span>
              <div className="text-orange-500 group-hover:translate-x-1 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
