'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, ChevronUp, Search } from 'lucide-react';
import Link from 'next/link';
import { getCartItemCount } from '@/lib/cart';
import { getProductFrontImage } from '@/lib/productImages';

// Product data structure
interface Product {
  id: string;
  name: string;
  category: 'USA ID' | 'CANADA ID' | 'UK ID' | 'SSN';
  price: number;
  image: string;
}

// All products - will be sorted alphabetically
const allProductsUnsorted: Product[] = [
  // USA ID - Regular States
  { id: 'alabama', name: 'Alabama', category: 'USA ID', price: 120, image: getProductFrontImage('Alabama') },
  { id: 'arizona', name: 'Arizona', category: 'USA ID', price: 120, image: getProductFrontImage('Arizona') },
  { id: 'california', name: 'California', category: 'USA ID', price: 120, image: getProductFrontImage('California') },
  { id: 'california-cm1', name: 'California CM1', category: 'USA ID', price: 120, image: getProductFrontImage('California CM1') },
  { id: 'connecticut', name: 'Connecticut', category: 'USA ID', price: 120, image: getProductFrontImage('Connecticut') },
  { id: 'delaware', name: 'Delaware', category: 'USA ID', price: 120, image: getProductFrontImage('Delaware') },
  { id: 'florida', name: 'Florida', category: 'USA ID', price: 120, image: getProductFrontImage('Florida') },
  { id: 'florida-motorcycle', name: 'Florida Motorcycle', category: 'USA ID', price: 120, image: getProductFrontImage('Florida Motorcycle') },
  { id: 'georgia', name: 'Georgia', category: 'USA ID', price: 120, image: getProductFrontImage('Georgia') },
  { id: 'illinois', name: 'Illinois', category: 'USA ID', price: 120, image: getProductFrontImage('Illinois') },
  { id: 'indiana', name: 'Indiana', category: 'USA ID', price: 120, image: getProductFrontImage('Indiana') },
  { id: 'kansas', name: 'Kansas', category: 'USA ID', price: 120, image: getProductFrontImage('Kansas') },
  { id: 'maryland', name: 'Maryland', category: 'USA ID', price: 120, image: getProductFrontImage('Maryland') },
  { id: 'massachusetts', name: 'Massachusetts', category: 'USA ID', price: 120, image: getProductFrontImage('Massachusetts') },
  { id: 'michigan', name: 'Michigan', category: 'USA ID', price: 120, image: getProductFrontImage('Michigan') },
  { id: 'minnesota', name: 'Minnesota', category: 'USA ID', price: 120, image: getProductFrontImage('Minnesota') },
  { id: 'mississippi', name: 'Mississippi', category: 'USA ID', price: 120, image: getProductFrontImage('Mississippi') },
  { id: 'missouri', name: 'Missouri', category: 'USA ID', price: 120, image: getProductFrontImage('Missouri') },
  { id: 'nebraska', name: 'Nebraska', category: 'USA ID', price: 120, image: getProductFrontImage('Nebraska') },
  { id: 'nevada', name: 'Nevada', category: 'USA ID', price: 120, image: getProductFrontImage('Nevada') },
  { id: 'new-jersey', name: 'New Jersey', category: 'USA ID', price: 120, image: getProductFrontImage('New Jersey') },
  { id: 'new-york', name: 'New York Old Verison', category: 'USA ID', price: 120, image: getProductFrontImage('New York Old Verison') },
  { id: 'north-carolina', name: 'North Carolina', category: 'USA ID', price: 120, image: getProductFrontImage('North Carolina') },
  { id: 'ohio', name: 'Ohio', category: 'USA ID', price: 120, image: getProductFrontImage('Ohio') },
  { id: 'pennsylvania', name: 'Pennsylvania', category: 'USA ID', price: 120, image: getProductFrontImage('Pennsylvania') },
  { id: 'rhode-island', name: 'Rhode Island', category: 'USA ID', price: 120, image: getProductFrontImage('Rhode Island') },
  { id: 'south-carolina', name: 'South Carolina', category: 'USA ID', price: 120, image: getProductFrontImage('South Carolina') },
  { id: 'texas', name: 'Texas', category: 'USA ID', price: 120, image: getProductFrontImage('Texas') },
  { id: 'utah', name: 'Utah', category: 'USA ID', price: 120, image: getProductFrontImage('Utah') },
  { id: 'virginia', name: 'Virginia', category: 'USA ID', price: 120, image: getProductFrontImage('Virginia') },
  { id: 'washington', name: 'Washington', category: 'USA ID', price: 120, image: getProductFrontImage('Washington') },
  
  // USA ID - CDL (Commercial Driver License)
  { id: 'california-cdl', name: 'California CDL', category: 'USA ID', price: 120, image: getProductFrontImage('California CDL') },
  { id: 'illinois-cdl', name: 'Illinois CDL', category: 'USA ID', price: 120, image: getProductFrontImage('Illinois CDL') },
  { id: 'new-york-cdl', name: 'New York CDL', category: 'USA ID', price: 120, image: getProductFrontImage('New York CDL') },
  { id: 'ohio-cdl', name: 'Ohio CDL', category: 'USA ID', price: 120, image: getProductFrontImage('Ohio CDL') },
  { id: 'pennsylvania-cdl', name: 'Pennsylvania CDL', category: 'USA ID', price: 120, image: getProductFrontImage('Pennsylvania CDL') },
  { id: 'texas-cdl', name: 'Texas CDL', category: 'USA ID', price: 120, image: getProductFrontImage('Texas CDL') },
  
  // CANADA ID
  { id: 'british-columbia', name: 'British Columbia', category: 'CANADA ID', price: 120, image: getProductFrontImage('British Columbia') },
  { id: 'ontario', name: 'Ontario', category: 'CANADA ID', price: 120, image: getProductFrontImage('Ontario') },
  { id: 'quebec', name: 'Quebec', category: 'CANADA ID', price: 120, image: getProductFrontImage('Quebec') },
  
  // UK ID (removed England)
  { id: 'london', name: 'London', category: 'UK ID', price: 100, image: getProductFrontImage('London') },
  { id: 'newcastle', name: 'Newcastle', category: 'UK ID', price: 100, image: getProductFrontImage('Newcastle') },
  { id: 'wales', name: 'Wales', category: 'UK ID', price: 100, image: getProductFrontImage('Wales') },
  { id: 'scotland', name: 'Scotland', category: 'UK ID', price: 100, image: getProductFrontImage('Scotland') },
  { id: 'northern-ireland', name: 'Northern Ireland', category: 'UK ID', price: 100, image: getProductFrontImage('Northern Ireland') },
  { id: 'birmingham', name: 'Birmingham', category: 'UK ID', price: 100, image: getProductFrontImage('Birmingham') },
  { id: 'manchester', name: 'Manchester', category: 'UK ID', price: 100, image: getProductFrontImage('Manchester') },
  { id: 'liverpool', name: 'Liverpool', category: 'UK ID', price: 100, image: getProductFrontImage('Liverpool') },
  { id: 'leeds', name: 'Leeds', category: 'UK ID', price: 100, image: getProductFrontImage('Leeds') },
  { id: 'bristol', name: 'Bristol', category: 'UK ID', price: 100, image: getProductFrontImage('Bristol') },
  
  // SSN
  { id: 'ssn', name: 'SSN', category: 'SSN', price: 120, image: getProductFrontImage('SSN') },
];

// Sort all products alphabetically by name
const allProducts = allProductsUnsorted.sort((a, b) => a.name.localeCompare(b.name));

export default function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  // Preload UV back image
  useEffect(() => {
    const img = new Image();
    img.src = '/images/uvback.jpg';
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Count products by category
  const categoryCounts = useMemo(() => {
    return {
      'ALL': allProducts.length,
      'USA ID': allProducts.filter(p => p.category === 'USA ID').length,
      'CANADA ID': allProducts.filter(p => p.category === 'CANADA ID').length,
      'UK ID': allProducts.filter(p => p.category === 'UK ID').length,
      'SSN': allProducts.filter(p => p.category === 'SSN').length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/images/logo.jpg" 
                alt="JAYTIMMAID Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg"
              />
              <div className="flex flex-col">
                <div className="text-yellow-green text-base sm:text-lg font-display font-semibold tracking-tight">
                  JAYTIMMAID
                </div>
                <div className="text-xs text-gray-400 hidden sm:block font-sans">Scannable UV hologram</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              <Link href="/" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">HOME</Link>
              <Link href="/product-info" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT INFO</Link>
              <Link href="/order" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">ORDER</Link>
              <Link href="/product-list" className="text-yellow-green hover:text-yellow-green transition text-xs sm:text-sm border-b-2 border-yellow-green pb-1">PRODUCT LIST</Link>
              <Link href="/use-guide" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">EVALUATE</Link>
              <Link href="/faq" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">FAQ</Link>
              <Link href="/contact-us" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">CONTACT US</Link>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center relative">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 cursor-pointer hover:text-blue-300 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Horizontal Scroll Menu */}
          <div className="lg:hidden overflow-x-auto pb-3 hide-scrollbar">
            <div className="flex space-x-6 min-w-max">
              <Link href="/" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">HOME</Link>
              <Link href="/product-info" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT INFO</Link>
              <Link href="/order" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">ORDER</Link>
              <Link href="/product-list" className="text-yellow-green text-xs sm:text-sm whitespace-nowrap border-b-2 border-yellow-green pb-1">PRODUCT LIST</Link>
              <Link href="/use-guide" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">USE GUIDE</Link>
              <Link href="/evaluate" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">EVALUATE</Link>
              <Link href="/faq" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">FAQ</Link>
              <Link href="/contact-us" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">CONTACT US</Link>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Cover Image Section */}
      <div className="pt-16 sm:pt-20 lg:pt-24 -mt-16 sm:-mt-20 lg:-mt-24">
        <div className="w-full h-64 sm:h-80 lg:h-96 relative overflow-hidden">
          <div className="watermarked-image w-full h-full">
            <img
              src="/images/bgimg.png"
              alt="Product List Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600 pt-6">
            <Link href="/" className="hover:text-yellow-green">Home</Link> / <span className="text-gray-800">Products</span>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Please enter the state you would like to search for, such as New York"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
              />
            </div>
            <button className="w-full sm:w-auto bg-yellow-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-green/90 transition whitespace-nowrap">
              Search
            </button>
          </div>

          {/* Category Filter and Product Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4 sticky top-32">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Categories</h3>
                <div className="space-y-2">
                  {[
                    { key: 'ALL', label: 'ALL' },
                    { key: 'USA ID', label: 'USA ID' },
                    { key: 'CANADA ID', label: 'CANADA ID' },
                    { key: 'UK ID', label: 'UK ID' },
                    { key: 'SSN', label: 'SSN' },
                  ].map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category.key
                          ? 'bg-yellow-green text-black font-semibold'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.label} ({categoryCounts[category.key as keyof typeof categoryCounts]})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex flex-col">
                      {/* Product Image - No borders or outlines */}
                      <div 
                        className="aspect-[3.375/2.125] mb-3 relative overflow-hidden cursor-pointer rounded-lg"
                        style={{ backgroundColor: '#f3f4f6' }}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Default Image - ordertemp, covers entire card */}
                        <div 
                          className="watermarked-image w-full h-full absolute inset-0 z-10 transition-opacity duration-300"
                          style={{ 
                            opacity: hoveredProduct === product.id ? 0 : 1,
                            pointerEvents: hoveredProduct === product.id ? 'none' : 'auto'
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            style={{ display: 'block', width: '100%', height: '100%' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const placeholder = document.createElement('div');
                              placeholder.className = 'text-gray-400 text-sm';
                              placeholder.textContent = 'ID Preview';
                              e.currentTarget.parentElement?.appendChild(placeholder);
                            }}
                          />
                        </div>
                        {/* UV Back Image - Shown on Hover, covers entire card */}
                        <div 
                          className="w-full h-full absolute inset-0 z-30 transition-opacity duration-300"
                          style={{ 
                            opacity: hoveredProduct === product.id ? 1 : 0,
                            pointerEvents: hoveredProduct === product.id ? 'auto' : 'none',
                            backgroundColor: 'transparent'
                          }}
                        >
                          <div className="watermarked-image w-full h-full absolute inset-0">
                            <img
                              src="/images/uvback.jpg"
                              alt={`${product.name} UV View`}
                              className="w-full h-full object-cover"
                              style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                              onLoad={() => {
                                console.log('UV back image loaded for', product.name);
                              }}
                              onError={(e) => {
                                console.error('UV back image failed to load for', product.name, e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Name */}
                      <h3 className="text-base font-semibold text-center mb-3 text-gray-800">
                        {product.name}
                      </h3>
                      
                      {/* Order Button */}
                      <Link
                        href={`/order?product=${encodeURIComponent(product.name)}`}
                        className="w-full bg-yellow-green text-black py-2.5 rounded-full font-semibold hover:bg-yellow-green/90 transition text-center block text-sm"
                      >
                        Order - {product.category === 'UK ID' ? '£' : '$'}{product.price}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8 sm:space-y-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-white">Quick Links</h3>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3">
                <Link href="/" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">HOME</Link>
                <Link href="/product-info" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">PRODUCT INFO</Link>
                <Link href="/order" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">ORDER</Link>
                <Link href="/product-list" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">PRODUCT LIST</Link>
                <Link href="/use-guide" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">USE GUIDE</Link>
                <Link href="/evaluate" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">EVALUATE</Link>
                <Link href="/faq" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">FAQ</Link>
                <Link href="/contact-us" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">CONTACT US</Link>
              </div>
            </div>

            {/* Related Policies */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-white">Related Policies</h3>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3">
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">RETURN & REFUND POLICY</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">SHIPPING POLICY</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">TERMS & CONDITIONS</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">PRIVACY POLICY</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">PAYMENT POLICY</Link>
              </div>
            </div>

            {/* Contact Us / About */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-gray-300">About</h3>
              <div className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <p><span className="font-semibold">Company:</span> JAYTIMMAID Inc.</p>
                <p><span className="font-semibold">Address:</span> 548 Market St Suite 96966, San Francisco, CA 94104</p>
                <p><span className="font-semibold">WhatsApp:</span> +1 (832) 453-7253</p>
                <p><span className="font-semibold">Telegram:</span> jaytimma1</p>
                <p><span className="font-semibold">Email:</span> jaytimmaid.orders@gmail.com</p>
                <div className="flex space-x-3 mt-4">
                  <a href="https://wa.me/18324537253" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a href="https://t.me/jaytimma1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.116 13.815l-2.91-.907c-.632-.196-.642-.632.135-.936l11.37-4.364c.526-.194.988.12.817.936z"/>
                    </svg>
                  </a>
                  <a href="mailto:jaytimmaid.orders@gmail.com" className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 sm:pt-8 mt-8 sm:mt-12 border-t border-gray-800">
            <p className="text-gray-500 text-xs sm:text-sm">Copyright © 2026, JAYTIMMAID, All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating Back-to-top Button (WhatsApp handled globally) */}
      <div className="fixed left-4 bottom-4 z-30">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

