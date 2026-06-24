'use client';

import React from 'react';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/logo.jpg" alt="JAYTIMMAID Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg" />
              <div className="flex flex-col">
                <div className="text-yellow-green text-base sm:text-lg font-display font-semibold tracking-tight">JAYTIMMAID</div>
                <div className="text-xs text-gray-400 hidden sm:block font-sans">Scannable UV hologram</div>
              </div>
            </Link>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 hover:text-blue-300 transition" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-3">
              Order placed successfully
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-2 leading-relaxed">
              Your order has been saved and our team has been notified.
            </p>
            <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
              WhatsApp should have opened with your order details — please tap <strong>Send</strong> to confirm with us and receive payment instructions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/product-list"
                className="inline-flex items-center justify-center bg-yellow-green text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-yellow-green/90 transition"
              >
                Browse more products
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed left-4 bottom-4 z-30">
        <button
          type="button"
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
