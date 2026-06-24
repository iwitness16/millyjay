'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCart, ChevronUp, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getCartItemCount } from '@/lib/cart';
import {
  ALL_PRODUCTS,
  COUNTRIES,
  PRODUCT_CATEGORIES,
  formatProductPrice,
  getCountryMeta,
  getCountryFlagUrl,
  type ProductCategory,
} from '@/lib/products';

function CountryFlag({ code, className = 'w-5 h-3.5' }: { code: string; className?: string }) {
  const src = getCountryFlagUrl(code, 40);
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      className={`${className} object-cover rounded-sm shadow-sm flex-shrink-0`}
      loading="lazy"
    />
  );
}

function ProductListPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const showCountryGrid = selectedCategory === 'ALL' && !searchQuery.trim();

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartItemCount());
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && PRODUCT_CATEGORIES.includes(category as ProductCategory)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/uvback.jpg';
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: ALL_PRODUCTS.length };
    COUNTRIES.forEach((c) => {
      counts[c.category] = ALL_PRODUCTS.filter((p) => p.category === c.category).length;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'ALL' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const activeCountry = selectedCategory !== 'ALL' ? getCountryMeta(selectedCategory as ProductCategory) : null;

  const selectCategory = (key: string) => {
    setSelectedCategory(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 min-w-0">
              <img src="/images/logo.jpg" alt="JAYTIMMAID Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="text-yellow-green text-base sm:text-lg font-display font-semibold tracking-tight truncate">JAYTIMMAID</div>
                <div className="text-xs text-gray-400 hidden sm:block font-sans">Scannable UV hologram</div>
              </div>
            </Link>
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link href="/" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">HOME</Link>
              <Link href="/product-info" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT INFO</Link>
              <Link href="/order" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">ORDER</Link>
              <Link href="/product-list" className="text-yellow-green text-xs sm:text-sm border-b-2 border-yellow-green pb-1">PRODUCT LIST</Link>
              <Link href="/use-guide" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">EVALUATE</Link>
              <Link href="/faq" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">FAQ</Link>
              <Link href="/contact-us" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">CONTACT US</Link>
            </div>
            <div className="flex items-center relative flex-shrink-0">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 hover:text-blue-300 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="lg:hidden overflow-x-auto pb-3 hide-scrollbar">
            <div className="flex space-x-5 min-w-max">
              <Link href="/" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">HOME</Link>
              <Link href="/product-info" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">PRODUCT INFO</Link>
              <Link href="/order" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">ORDER</Link>
              <Link href="/product-list" className="text-yellow-green text-xs whitespace-nowrap border-b-2 border-yellow-green pb-1">PRODUCT LIST</Link>
              <Link href="/use-guide" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">USE GUIDE</Link>
              <Link href="/evaluate" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">EVALUATE</Link>
              <Link href="/faq" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">FAQ</Link>
              <Link href="/contact-us" className="text-gray-300 hover:text-yellow-green transition text-xs whitespace-nowrap">CONTACT US</Link>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Banner — full-width image on mobile (no crop); fixed height on desktop */}
      <div className="pt-[6.75rem] lg:pt-24">
        <div className="w-full overflow-hidden bg-black leading-[0]">
          <img
            src="/images/bgimg.png"
            alt="JAYTIMMAID product features"
            className="w-full h-auto block lg:h-64 lg:object-cover lg:object-center"
          />
        </div>
      </div>

      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-6">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-gray-600 flex flex-wrap items-center gap-1">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            <span>/</span>
            {activeCountry ? (
              <>
                <button type="button" onClick={() => selectCategory('ALL')} className="hover:text-brand-green">
                  Products
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">{activeCountry.name}</span>
              </>
            ) : (
              <span className="text-gray-900 font-medium">Products</span>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by state or region..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white text-gray-800"
              />
            </div>
          </div>

          {/* Category chips */}
          <div className="mb-8 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 min-w-max pb-1">
              <button
                type="button"
                onClick={() => selectCategory('ALL')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === 'ALL'
                    ? 'bg-brand-green text-black shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                All ({categoryCounts.ALL})
              </button>
              {COUNTRIES.map((country) => (
                <button
                  key={country.category}
                  type="button"
                  onClick={() => selectCategory(country.category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap flex items-center gap-2 ${
                    selectedCategory === country.category
                      ? 'bg-brand-green text-black shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CountryFlag code={country.code} />
                  <span>{country.name}</span>
                  <span className={`text-xs ${selectedCategory === country.category ? 'text-black/60' : 'text-gray-400'}`}>
                    ({categoryCounts[country.category]})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Country grid (default ALL view) */}
          {showCountryGrid ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {COUNTRIES.map((country) => {
                const count = categoryCounts[country.category] ?? 0;
                const flagUrl = getCountryFlagUrl(country.code, 80);
                return (
                  <button
                    key={country.category}
                    type="button"
                    onClick={() => selectCategory(country.category)}
                    className="group text-center bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
                  >
                    <div className="relative px-6 pt-8 pb-5">
                      <span className="absolute top-3 right-3 bg-brand-green text-black text-xs font-semibold min-w-[2rem] h-8 px-2 rounded-full flex items-center justify-center">
                        {count}
                      </span>
                      <p className="text-4xl sm:text-5xl font-bold text-brand-green tracking-wide">
                        {country.code}
                      </p>
                    </div>
                    <div className="px-6 pb-5 flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-brand-green flex items-center justify-center gap-2">
                        {country.name} ID
                        {flagUrl && (
                          <img
                            src={flagUrl}
                            alt=""
                            className="w-7 h-5 object-cover rounded-sm shadow-sm"
                            loading="lazy"
                          />
                        )}
                      </h2>
                      <p className="text-sm text-gray-500 mt-2">{count} products available</p>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">{country.description}</p>
                    </div>
                    <div className="px-4 pb-4 mt-auto">
                      <span className="flex items-center justify-center gap-2 w-full bg-brand-green text-black py-3 rounded-md font-medium text-sm group-hover:bg-brand-green-dark transition-colors">
                        View All
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              {activeCountry && !searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => selectCategory('ALL')}
                  className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-green transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all countries
                </button>
              )}

              {activeCountry && !searchQuery.trim() && (
                <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex items-center gap-4">
                  {getCountryFlagUrl(activeCountry.code) ? (
                    <img
                      src={getCountryFlagUrl(activeCountry.code, 80)}
                      alt=""
                      className="w-10 h-7 object-cover rounded-sm shadow-sm"
                    />
                  ) : null}
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-brand-green">
                      {activeCountry.name} ID
                    </h2>
                    <p className="text-sm text-gray-500">
                      From {activeCountry.currencySymbol}{activeCountry.price} per card
                    </p>
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-lg">No products found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div
                        className="aspect-[3.375/2.125] relative overflow-hidden cursor-pointer bg-gray-100"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div
                          className="watermarked-image w-full h-full absolute inset-0 z-10 transition-opacity duration-300"
                          style={{ opacity: hoveredProduct === product.id ? 0 : 1 }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div
                          className="w-full h-full absolute inset-0 z-20 transition-opacity duration-300"
                          style={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                        >
                          <div className="watermarked-image w-full h-full">
                            <img src="/images/uvback.jpg" alt={`${product.name} UV`} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base font-semibold text-center mb-3 text-gray-800 line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>
                        <Link
                          href={`/order?product=${encodeURIComponent(product.name)}`}
                          className="w-full bg-brand-green text-black py-2 sm:py-2.5 rounded-md font-medium hover:bg-brand-green-dark transition text-center block text-xs sm:text-sm"
                        >
                          Order — {formatProductPrice(product)}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-10 px-4 sm:px-6 lg:px-8 border-t border-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Copyright © 2026, JAYTIMMAID, All Rights Reserved</p>
        </div>
      </footer>

      <div className="fixed left-4 bottom-4 z-30">
        <button
          type="button"
          className="bg-brand-green text-black p-3 rounded-full shadow-lg hover:bg-brand-green-dark transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default function ProductListPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-green" />
        </div>
      }
    >
      <ProductListPageContent />
    </Suspense>
  );
}
