import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { RepairShop } from '@/lib/database.types';
import ShopList from '@/components/ShopList';
import ShopCardSkeleton from '@/components/ShopCardSkeleton';

async function getShops(): Promise<RepairShop[]> {
  const { data, error } = await supabase
    .from('repair_shops')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching shops:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const shops = await getShops();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20 sm:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm text-orange-500 font-medium">Trusted by thousands of riders</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Find Expert Motorcycle
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Repair Shops
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Discover professional motorcycle repair shops across Europe. Quality service, expert mechanics, and guaranteed results for your ride.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#shops"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
              >
                <span className="relative flex items-center gap-2">
                  Browse Shops
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                  {shops.length}+
                </div>
                <div className="text-sm text-gray-400">Verified Shops</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                  {new Set(shops.map(s => s.city.split(', ')[1] || s.city)).size}
                </div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-400">Trusted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shops Section */}
      <section id="shops" className="py-16 sm:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Explore Repair Shops
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Search through our directory of professional motorcycle repair shops
            </p>
          </div>

          <Suspense fallback={<ShopsLoadingSkeleton />}>
            <ShopList shops={shops} />
          </Suspense>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-gradient-to-br from-gray-950 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Why Choose MotoRepair?
              </h2>
              <p className="text-gray-400 text-lg">
                Your trusted partner in finding quality motorcycle service
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Verified Shops</h3>
                <p className="text-gray-400">
                  All repair shops in our directory are verified for quality and reliability
                </p>
              </div>

              <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Easy Search</h3>
                <p className="text-gray-400">
                  Find the perfect repair shop with our powerful search and filter tools
                </p>
              </div>

              <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Europe-Wide</h3>
                <p className="text-gray-400">
                  Comprehensive coverage of motorcycle repair shops across European countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShopsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 h-12 bg-gray-900 rounded-lg animate-pulse"></div>
        <div className="sm:w-64 h-12 bg-gray-900 rounded-lg animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ShopCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
