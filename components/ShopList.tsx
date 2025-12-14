'use client';

import { useState, useMemo } from 'react';
import { RepairShop } from '@/lib/database.types';
import ShopCard from './ShopCard';

interface ShopListProps {
  shops: RepairShop[];
}

export default function ShopList({ shops }: ShopListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

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

  // Filter shops based on search and country
  const filteredShops = useMemo(() => {
    let filtered = shops.filter((shop) => {
      const matchesSearch =
        searchQuery === '' ||
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCountry = true;
      if (selectedCountry !== 'all') {
        const shopCountry = shop.city.split(', ')[1] || shop.city;
        matchesCountry = shopCountry === selectedCountry;
      }

      return matchesSearch && matchesCountry;
    });

    // When "All Countries" is selected and no search query, show only 1 shop per country
    if (selectedCountry === 'all' && searchQuery === '') {
      const countryMap = new Map<string, RepairShop>();
      filtered.forEach((shop) => {
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

    return filtered;
  }, [shops, searchQuery, selectedCountry]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
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

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-400">
          Showing <span className="text-white font-semibold">{filteredShops.length}</span> of{' '}
          <span className="text-white font-semibold">{shops.length}</span> shops
        </p>
        {(searchQuery || selectedCountry !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('all');
            }}
            className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>

      {/* Shop Grid */}
      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.place_id} shop={shop} />
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
