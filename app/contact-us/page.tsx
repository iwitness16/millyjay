'use client';
// Contact us page

import React from 'react';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function ContactUsPage() {
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
                <div className="text-xs text-gray-400 hidden sm:block font-sans">Scannable UV Hologram</div>
              </div>
            </Link>

            {/* Desktop Navigationn */}
            <div className="hidden lg:flex space-x-8">
              <Link href="/" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">HOME</Link>
              <Link href="/product-info" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT INFO</Link>
              <Link href="/order" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">ORDER</Link>
              <Link href="/product-list" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT LIST</Link>
              <Link href="/use-guide" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">EVALUATE</Link>
              <Link href="/faq" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">FAQ</Link>
              <Link href="/contact-us" className="text-yellow-green hover:text-yellow-green transition text-xs sm:text-sm border-b-2 border-yellow-green pb-1">CONTACT US</Link>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 cursor-pointer hover:text-blue-300 transition" />
              </Link>
            </div>
          </div>

          {/* Mobile Horizontal Scroll Menu */}
          <div className="lg:hidden overflow-x-auto pb-3 hide-scrollbar">
            <div className="flex space-x-6 min-w-max">
              <Link href="/" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">HOME</Link>
              <Link href="/product-info" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT INFO</Link>
              <Link href="/order" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">ORDER</Link>
              <Link href="/product-list" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT LIST</Link>
              <Link href="/use-guide" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">USE GUIDE</Link>
              <Link href="/evaluate" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">EVALUATE</Link>
              <Link href="/faq" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">FAQ</Link>
              <Link href="/contact-us" className="text-yellow-green text-xs sm:text-sm whitespace-nowrap border-b-2 border-yellow-green pb-1">CONTACT US</Link>
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

      {/* Main Content */}
      <div className="pt-32 sm:pt-40 lg:pt-48 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Chat Bubbles Graphic */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              {/* Green bubble (behind, to the right) */}
              <div className="absolute top-12 right-12 w-64 h-64 sm:w-80 sm:h-80" style={{ zIndex: 1 }}>
                <div className="w-full h-full bg-green-200 rounded-3xl shadow-lg relative">
                  {/* Speech bubble tail - bottom right */}
                  <div className="absolute bottom-0 right-8 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-green-200"></div>
                </div>
              </div>
              {/* Orange bubble (front, to the left) */}
              <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80" style={{ zIndex: 2 }}>
                <div className="w-full h-full bg-orange-200 rounded-3xl shadow-lg relative">
                  {/* Speech bubble tail - bottom left */}
                  <div className="absolute bottom-0 left-8 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-orange-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Descriptive Text */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">
              For placing and managing orders, please contact us on WhatsApp. Our team handles all order confirmation, payment details and updates there for faster and more secure processing.
            </p>
            <div className="text-left max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold">Pre-sales consultation:</span> product related information, customization needs, etc.
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold">After-sales consultation:</span> card production, logistics information, product quality, etc.
              </p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/15808007037" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-4 sm:py-5 flex items-center space-x-4 transition shadow-lg hover:shadow-xl"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-lg sm:text-xl font-semibold">WhatsApp</span>
            </a>

            {/* Telegram Button */}
            <a 
              href="https://t.me/jayID9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-4 sm:py-5 flex items-center space-x-4 transition shadow-lg hover:shadow-xl"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.116 13.815l-2.91-.907c-.632-.196-.642-.632.135-.936l11.37-4.364c.526-.194.988.12.817.936z"/>
              </svg>
              <span className="text-lg sm:text-xl font-semibold">Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white">
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
                <p><span className="font-semibold">WhatsApp:</span> +1 (580) 800-7037</p>
                <p><span className="font-semibold">Telegram:</span> jayID9</p>
                <div className="flex space-x-3 mt-4">
                  <a href="https://wa.me/15808007037" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a href="https://t.me/jayID9" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.116 13.815l-2.91-.907c-.632-.196-.642-.632.135-.936l11.37-4.364c.526-.194.988.12.817.936z"/>
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

