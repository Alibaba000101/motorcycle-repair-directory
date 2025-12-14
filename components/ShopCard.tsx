import Link from 'next/link';
import { RepairShop } from '@/lib/database.types';
import RatingStars from './RatingStars';
import { formatDistance } from '@/lib/geolocation';

interface ShopCardProps {
  shop: RepairShop;
  userDistance?: number | null;
}

export default function ShopCard({ shop, userDistance }: ShopCardProps) {
  const hasWebsite = shop.website && shop.website !== 'N/A';
  const hasPhone = shop.phone && shop.phone !== 'N/A';
  const ratingNum = typeof shop.rating === 'string' ? parseFloat(shop.rating) || 0 : shop.rating;
  const lat = typeof shop.latitude === 'string' ? parseFloat(shop.latitude) : shop.latitude;
  const lon = typeof shop.longitude === 'string' ? parseFloat(shop.longitude) : shop.longitude;

  // Check if shop was added by AI agent
  const isAutoAdded = shop.added_by === 'auto_agent';

  // Check if recently added (within last 7 days)
  const isRecent = shop.scraped_at ?
    (new Date().getTime() - new Date(shop.scraped_at).getTime()) / (1000 * 60 * 60 * 24) <= 7
    : false;

  // Google Maps links
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

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

                {/* Distance indicators */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {userDistance !== undefined && userDistance !== null && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {formatDistance(userDistance)} from you
                    </span>
                  )}
                  {shop.is_city_center ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      In city center
                    </span>
                  ) : shop.distance_from_city_center && shop.distance_from_city_center > 0 ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800 text-gray-400 border border-gray-700">
                      {formatDistance(shop.distance_from_city_center)} from center
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="ml-2 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {/* Badges */}
            {(isAutoAdded || isRecent) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {isAutoAdded && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 text-xs">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI Verified
                  </span>
                )}
                {isRecent && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Recently Added
                  </span>
                )}
              </div>
            )}

            {ratingNum > 0 && (
              <div className="mb-3">
                <RatingStars rating={shop.rating} reviewsCount={shop.reviews_count} size="sm" />
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm">
            {/* Clickable Address */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-start text-gray-400 hover:text-orange-400 transition-colors group/address"
            >
              <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="line-clamp-2 group-hover/address:underline">{shop.address}</span>
            </a>

            {shop.hours && shop.hours !== 'N/A' && (
              <div className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="line-clamp-1 font-medium">{shop.hours}</span>
              </div>
            )}

            {/* Clickable Phone */}
            {hasPhone && (
              <a
                href={`tel:${shop.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center text-gray-400 hover:text-orange-400 transition-colors group/phone"
              >
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="line-clamp-1 group-hover/phone:underline">{shop.phone}</span>
              </a>
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
            {/* Get Directions Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-full px-4 py-2 mb-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>

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
