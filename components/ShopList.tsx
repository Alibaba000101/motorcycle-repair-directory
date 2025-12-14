'use client';

import { useState, useMemo } from 'react';
import { RepairShop } from '@/lib/database.types';
import ShopCard from './ShopCard';
import { useUserLocation } from '@/hooks/useUserLocation';
import { calculateDistance } from '@/lib/geolocation';

interface ShopListProps {
  shops: RepairShop[];
}

type SortOption = 'name' | 'distance' | 'recent' | 'rating';
type DistanceFilter = 'all' | '5' | '10' | '25';

export default function ShopList({ shops }: ShopListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('all');

  const { location, loading, error, getLocation, clearLocation } = useUserLocation();

  // Get unique countries for filter dropdown by extracting from city column
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(
        shops
          .map((shop) => {
            const parts = shop.city.split(', ');
            return parts.length > 1 ? parts[1] : parts[0];
          })
          .filter(Boolean)
      )
    ).sort();
    return uniqueCountries;
  }, [shops]);

  // Calculate distances and filter shops
  const filteredAndSortedShops = useMemo(() => {
    // First, add distance calculations if user location is available
    let shopsWithDistance = shops.map((shop) => {
      let userDistance: number | null = null;

      if (location) {
        const shopLat = typeof shop.latitude === 'string' ? parseFloat(shop.latitude) : shop.latitude;
        const shopLon = typeof shop.longitude === 'string' ? parseFloat(shop.longitude) : shop.longitude;

        if (!isNaN(shopLat) && !isNaN(shopLon)) {
          userDistance = calculateDistance(
            location.latitude,
            location.longitude,
            shopLat,
            shopLon
          );
        }
      }

      return { ...shop, userDistance };
    });

    // Filter by search query
    shopsWithDistance = shopsWithDistance.filter((shop) => {
      const matchesSearch =
        searchQuery === '' ||
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });

    // Filter by country
    if (selectedCountry !== 'all') {
      shopsWithDistance = shopsWithDistance.filter((shop) => {
        const shopCountry = shop.city.split(', ')[1] || shop.city;
        return shopCountry === selectedCountry;
      });
    }

    // Filter by distance from user
    if (location && distanceFilter !== 'all') {
      const maxDistance = parseInt(distanceFilter);
      shopsWithDistance = shopsWithDistance.filter((shop) =>
        shop.userDistance !== null && shop.userDistance <= maxDistance
      );
    }

    // Sort shops
    shopsWithDistance.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          if (!location) return 0;
          if (a.userDistance === null) return 1;
          if (b.userDistance === null) return -1;
          return a.userDistance - b.userDistance;

        case 'recent':
          const dateA = a.scraped_at ? new Date(a.scraped_at).getTime() : 0;
          const dateB = b.scraped_at ? new Date(b.scraped_at).getTime() : 0;
          return dateB - dateA;

        case 'rating':
          const ratingA = typeof a.rating === 'string' ? parseFloat(a.rating) || 0 : a.rating || 0;
          const ratingB = typeof b.rating === 'string' ? parseFloat(b.rating) || 0 : b.rating || 0;
          return ratingB - ratingA;

        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // When "All Countries" is selected, no search query, no location, show only 1 shop per country
    if (selectedCountry === 'all' && searchQuery === '' && !location && sortBy === 'name') {
      const countryMap = new Map<string, typeof shopsWithDistance[0]>();
      shopsWithDistance.forEach((shop) => {
        const shopCountry = shop.city.split(', ')[1] || shop.city;
        if (!countryMap.has(shopCountry)) {
          countryMap.set(shopCountry, shop);
        }
      });
      return Array.from(countryMap.values()).sort((a, b) => {
        const countryA = a.city.split(', ')[1] || a.city;
        const countryB = b.city.split(', ')[1] || b.city;
        return countryA.localeCompare(countryB);
      });
    }

    return shopsWithDistance;
  }, [shops, searchQuery, selectedCountry, location, distanceFilter, sortBy]);

  const handleFindNearestShops = async () => {
    await getLocation();
    setSortBy('distance');
  };

  const handleClearLocation = () => {
    clearLocation();
    setDistanceFilter('all');
    setSortBy('name');
  };

  return (
    <div className="space-y-8">
      {/* Location Feature */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {!location ? (
          <button
            onClick={handleFindNearestShops}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Getting your location...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Find Nearest Shops
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-1">Showing shops near you</span>
            <button
              onClick={handleClearLocation}
              className="text-green-400 hover:text-green-300 transition-colors"
              title="Clear location"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, city, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Country Filter */}
          <div className="relative sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort and Distance Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Sort Options */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full pl-12 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="distance" disabled={!location}>Sort by Distance {!location && '(Enable location)'}</option>
              <option value="recent">Sort by Recently Added</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Distance Filter (only show when location is enabled) */}
          {location && (
            <div className="relative sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value as DistanceFilter)}
                className="w-full pl-12 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="all">Any Distance</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="25">Within 25 km</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-400">
          Showing <span className="text-white font-semibold">{filteredAndSortedShops.length}</span> of{' '}
          <span className="text-white font-semibold">{shops.length}</span> shops
        </p>
        {(searchQuery || selectedCountry !== 'all' || location || distanceFilter !== 'all' || sortBy !== 'name') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('all');
              setSortBy('name');
              setDistanceFilter('all');
              handleClearLocation();
            }}
            className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all filters
          </button>
        )}
      </div>

      {/* Shop Grid */}
      {filteredAndSortedShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedShops.map((shop) => (
            <ShopCard
              key={shop.place_id}
              shop={shop}
              userDistance={shop.userDistance}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No shops found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('all');
              setSortBy('name');
              setDistanceFilter('all');
              handleClearLocation();
            }}
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
