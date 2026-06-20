'use client';

import React from 'react';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/images/logo.jpg" 
                alt="best fake id Logo" 
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
              <Link href="/" className="text-yellow-green hover:text-yellow-green transition text-xs sm:text-sm">HOME</Link>
              <Link href="/product-info" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT INFO</Link>
              <Link href="/order" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">ORDER</Link>
              <Link href="/product-list" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT LIST</Link>
              <Link href="/use-guide" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">EVALUATE</Link>
              <Link href="/faq" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">FAQ</Link>
              <Link href="/contact-us" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">CONTACT THE BEST FAKE ID MAKER</Link>
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
              <Link href="/" className="text-yellow-green text-xs sm:text-sm whitespace-nowrap border-b-2 border-yellow-green pb-1">HOME</Link>
              <Link href="/product-info" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT INFO</Link>
              <Link href="/order" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">ORDER</Link>
              <Link href="/product-list" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT LIST</Link>
              <Link href="/use-guide" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">USE GUIDE</Link>
              <Link href="/faq" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">FAQ</Link>
              <Link href="/contact-us" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">CONTACT THE BEST FAKE ID MAKER</Link>
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

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 border-t border-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left lg:order-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold mb-3 sm:mb-4">
                <span className="text-yellow-green">Best Fake ID Maker</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
                Building Premium, Authentic-Looking and Scannable <span className="text-yellow-green">Fake IDs</span> for you
              </p>
              <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
                Starting from <span className="text-yellow-green">$65</span>, Delivered within <span className="text-yellow-green">10 days</span>
              </p>
              <div className="flex flex-row gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
                <Link href="/order" className="bg-yellow-green text-black px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium hover:bg-yellow-green transition text-xs sm:text-sm">
                  Order Now
                </Link>
                <Link href="/contact-us" className="border-2 border-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium hover:bg-white hover:text-black transition text-xs sm:text-sm">
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <img src="/images/man1.jpg" alt="best fake id 1" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-gray-900" />
                    <img src="/images/man2.jpg" alt="best fake id 2" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-gray-900" />
                    <img src="/images/man3.jpg" alt="best fake id 3" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-gray-900" />
                    <img src="/images/man4.jpg" alt="best fake id 4" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-gray-900" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-semibold text-yellow-green">20.5K+</div>
                    <div className="text-xs text-gray-400">Worldwide Delivery</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-green">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 50 50" fill="currentColor">
                      <path d="M25 5 L30 20 L45 20 L33 28 L38 43 L25 35 L12 43 L17 28 L5 20 L20 20 Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Holograms, UV Marker</div>
                    <div className="text-xs text-gray-400">Anti-Counterfeiting</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="relative hidden lg:block lg:order-2">
              <div className="rounded-lg flex justify-center">
                <img 
                  src="/images/landinggirl.jpg" 
                  alt="best fake id card" 
                  className="rounded-lg w-full h-auto max-h-[580px] lg:max-h-[620px] object-contain"
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            {/* Mobile Image */}
            <div className="relative mt-8 lg:hidden order-3">
              <div className="rounded-lg flex justify-center">
                <img 
                  src="/images/landinggirl.jpg" 
                  alt="best fake id card holder" 
                  className="rounded-lg w-full h-auto max-h-[550px] sm:max-h-[570px] object-contain"
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <section className="py-6 px-4 text-center">
        <h2 className="text-lg sm:text-xl font-display font-semibold">Tens of Thousands Choose Us for Quality and Because We are the Best Fake ID Maker</h2>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-6">
            <div className="text-center">
              <div className="text-yellow-green mb-1">↑</div>
              <div className="text-xl sm:text-2xl font-semibold text-yellow-green mb-1">20000<span className="text-sm sm:text-lg">+</span></div>
              <div className="text-gray-400 text-xs">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-green mb-1">↑</div>
              <div className="text-xl sm:text-2xl font-semibold text-yellow-green mb-1">30000<span className="text-sm sm:text-lg">+</span></div>
              <div className="text-gray-400 text-xs">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-green mb-1">↑</div>
              <div className="text-xl sm:text-2xl font-semibold text-yellow-green mb-1">15000<span className="text-sm sm:text-lg">+</span></div>
              <div className="text-gray-400 text-xs">Total Reviews</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-semibold text-yellow-green mb-1">99%<span className="text-sm sm:text-lg">&gt;</span></div>
              <div className="text-gray-400 text-xs">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-semibold text-yellow-green mb-1">1%<span className="text-sm sm:text-lg">&lt;</span></div>
              <div className="text-gray-400 text-xs">Order Refund Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Products Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-3 sm:mb-4">Best Fake ID / Fake Driver License</h2>
          <Link href="/product-list" className="block text-center text-yellow-green mb-8 sm:mb-12 cursor-pointer hover:underline">View more &gt;</Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: 'USA', image: '/images/ordertemp.png', category: 'USA ID', priceLabel: '$120' },
              { name: 'UK', image: '/images/uk.jpg', category: 'UK ID', priceLabel: '£100' },
              { name: 'CANADA', image: '/images/ontario.jpg', category: 'CANADA ID', priceLabel: '$120' },
              { name: 'SSN', image: '/images/ssn.png', category: 'SSN', priceLabel: '$120' }
            ].map((product, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden hover:opacity-80 transition">
                <div className="h-40 sm:h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="watermarked-image w-full h-full">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'text-gray-500 text-sm';
                        placeholder.textContent = 'ID Preview';
                        e.currentTarget.parentElement?.appendChild(placeholder);
                      }}
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-center">{product.name}</h3>
                  <Link href={`/product-list?category=${encodeURIComponent(product.category)}`} className="w-full bg-yellow-green text-black py-2 sm:py-2.5 rounded-full font-medium hover:bg-yellow-green transition text-xs sm:text-sm block text-center">
                    Order - {product.priceLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ID Looks Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-6 sm:mb-8">How our Fake ID looks like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="mb-2 sm:mb-3 flex items-center justify-center h-40 sm:h-56 md:h-64">
                <img src="/images/idfront.jpg" alt="best fake id front" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="font-medium text-xs sm:text-sm text-gray-300">Front</p>
            </div>
            <div className="text-center">
              <div className="mb-2 sm:mb-3 flex items-center justify-center h-40 sm:h-56 md:h-64">
                <img src="/images/idback.jpg" alt="best fake id Back" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="font-medium text-xs sm:text-sm text-gray-300">Back</p>
            </div>
            <div className="text-center">
              <div className="mb-2 sm:mb-3 flex items-center justify-center h-40 sm:h-56 md:h-64">
                <img src="/images/uvfront.jpg" alt="best fake id Front (UV)" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="font-medium text-xs sm:text-sm text-gray-300">Front (UV)</p>
            </div>
            <div className="text-center">
              <div className="mb-2 sm:mb-3 flex items-center justify-center h-40 sm:h-56 md:h-64">
                <img src="/images/uvback.jpg" alt="best fake id Back (UV)" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="font-medium text-xs sm:text-sm text-gray-300">Back (UV)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-6 sm:mb-8">Product Features</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {[
              { title: 'Scannable', desc: 'Scan the barcode on the back to obtain fake id card information, which can be verified by most applications, software and systems.', image: '/images/ft1.png' },
              { title: 'Hologram', desc: 'Each state uses a unique holographic pattern, creating a 3D effect via light reflection/refraction, enhancing fake ID authenticity.', image: '/images/ft2.png' },
              { title: 'UV mark', desc: 'Using UV or black light, the card will reveal a specific pattern or marking that matches the appearance of a real ID card.', image: '/images/ft3.png' },
              { title: 'Advanced Technology', desc: 'Anti-counterfeiting, embossing, and laser technologies ensure the card info is fade-resistant and raised, enhancing tactile texture.', image: '/images/ft4.png' },
              { title: 'Strong durability', desc: 'Fake ID cards are resistant to tearing, water resistance and chemical corrosion.', image: '/images/ft5.png' },
              { title: 'High Quality', desc: 'Made from premium materials. Bending tests show they are not easily broken.', image: '/images/ft6.png' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="h-32 sm:h-40 mb-3 sm:mb-4 flex items-center justify-center">
                  <img src={feature.image} alt={feature.title} className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="text-sm sm:text-base font-medium mb-1.5">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic and Secure Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold mb-4">
                Make Best Fake IDs which are more Authentic and more Secure
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6">
                Our Fake ID cards are carefully designed in every detail and use advanced security elements such as holograms, UV printing, anti-counterfeiting, embossing, laser, etc. to ensure greater authenticity and security
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-green text-sm">☑</span>
                  <span className="text-yellow-green text-xs sm:text-sm">Holograms, UV Printing, Micro Text Printing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-green text-sm">☑</span>
                  <span className="text-yellow-green text-xs sm:text-sm">Laser Engraving, Raised Text and Embossing, Barcode and QR Code Integration</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-green text-sm">☑</span>
                  <span className="text-yellow-green text-xs sm:text-sm">Teslin Durable Materials, Color-Changing Inks, State-Specific Features</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/order" className="bg-yellow-green text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-green transition text-xs sm:text-sm">
                  Order Now
                </Link>
                <Link href="/contact-us" className="border-2 border-white px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition text-xs sm:text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-center">
                <img src="/images/make.jpg" alt="Make Best Fake ID more Authentic and Secure" className="w-full h-auto max-h-96 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fake ID Protects You Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-3">Fake ID Protects You</h2>
          <p className="text-sm sm:text-base text-center text-gray-300 mb-8">
            4 features to give you extra protection, so you can stay calm even under the close scrutiny of the liquor store cashier or club bouncer.
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <div className="flex items-center justify-center h-64">
                <img src="/images/ordertemp.png" alt="Best Fake ID Card" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="w-16 h-16 bg-yellow-green rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">☀</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">100%</h3>
                <p className="text-gray-400 text-xs">invisible to UV</p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-green rounded-full flex items-center justify-center mb-2">
                  <span className="text-base sm:text-lg">🖨</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">300 DPI</h3>
                <p className="text-gray-400 text-xs">micro-printing</p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-green rounded-full flex items-center justify-center mb-2">
                  <span className="text-base sm:text-lg">💳</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">+30MIL</h3>
                <p className="text-gray-400 text-xs">card thickness</p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-green rounded-full flex items-center justify-center mb-2">
                  <span className="text-base sm:text-lg">📄</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">3 SUBSTRATES</h3>
                <p className="text-gray-400 text-xs">micro-printing</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/order" className="bg-yellow-green text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-green transition text-xs sm:text-sm">
              Order Now
            </Link>
            <Link href="/contact-us" className="border-2 border-white px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition text-xs sm:text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-6 sm:mb-8">What a scannable ID card can do for you?</h2>
          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {[
              {
                title: 'Enter entertainment venues',
                desc: "Don't be afraid of security checks and easily enter nightclubs, bars and other entertainment venues.",
                img: '/images/place1.png'
              },
              {
                title: 'Attend an event or competition',
                desc: 'Feel free to attend parties and social events, and legally participate in sporting events.',
                img: '/images/place2.png'
              },
              {
                title: 'Travel car rental and hotel stay',
                desc: 'Easily rent a car for cross-state travel in the United States and quickly check into your hotel.',
                img: '/images/place3.png'
              },
              {
                title: 'Purchase restricted items',
                desc: 'Alcohol, tobacco and other products are no longer restricted and can be purchased at any time.',
                img: '/images/place4.png'
              },
              {
                title: 'Get employment opportunities',
                desc: 'Match career needs (sales, driver) and get a job faster and easier.',
                img: '/images/place5.png'
              },
              {
                title: 'Waiting for you to unlock more uses',
                desc: '',
                img: '/images/place6.png'
              }
            ].map((useCase, idx) => (
              <div key={idx} className="flex sm:block gap-4 sm:gap-0">
                <div className="w-32 h-32 sm:w-full sm:h-40 flex items-center justify-center flex-shrink-0">
                  <img src={useCase.img} alt={useCase.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1 sm:mt-4">
                  <h3 className="text-sm sm:text-base font-medium mb-1.5">{useCase.title}</h3>
                  <p className="text-gray-400 text-xs">{useCase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-8">How to Get the Best Fake ID</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <div className="flex items-center justify-center">
                <img src="/images/delivery.jpg" alt="Best Fake ID Delivery" className="w-full h-auto max-h-96 object-contain" />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { num: '1', text: 'Fill in your fake ID and shipping address info', arrow: true },
                { num: '2', text: 'Submit order, contact us, complete payment', arrow: true },
                { num: '3', text: 'Get electronic fake ID preview (fastest 3 days)', arrow: true },
                { num: '4', text: 'Get package tracking number (2 days later)', arrow: true },
                { num: '5', text: 'Get fake ID package (fastest 5-7 days)', arrow: false }
              ].map((step, idx) => (
                <div key={idx}>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-base sm:text-lg font-semibold">{step.num}.</span>
                    <span className="text-xs sm:text-sm">{step.text}</span>
                  </div>
                  {step.arrow && (
                    <div className="ml-4 sm:ml-6 text-yellow-green text-xl sm:text-2xl">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/order" className="bg-yellow-green text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-green transition text-xs sm:text-sm">
              Order Now
            </Link>
            <Link href="/contact-us" className="border-2 border-white px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition text-xs sm:text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-green mb-2">✓ High Credibility</h3>
              <p className="text-gray-300 mb-2 text-xs sm:text-sm">
                We have 10+ years of experience, serving thousands of customers, and are trustworthy.
              </p>
              <p className="text-gray-300 text-xs sm:text-sm">
                We guarantee that fake ID cards you order will be delivered to you safely. If not, we will resend it.
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-green mb-2">✓ Best Fake IDs Delivered within 10 Days</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                From the day of ordering, the package will be received within 10 days.
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-green mb-2">✓ Real DMV Template</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                We clone real DMV-issued ID card templates to ensure your card looks exactly like the real thing.
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-green mb-2">✓ 7*24 Hours Service</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                If you have any questions, you can contact us at any time.
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-green mb-2">✓ Scannable ID Technology</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                All fake ID cards are scannable and guaranteed to pass detection systems.
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-green mb-2">✓ Money Back Guarantee</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                If the item is not received, you can contact us to negotiate a refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-8">About Us</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            <div className="relative">
              <div className="flex items-center justify-center">
                <img src="/images/cards.jpg" alt="Best Fake ID Cards" className="w-full h-auto max-h-96 object-contain" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-gray-300">
                JAYTIMMAID is the industry-leading Fake ID card production website. The website provides you with high-quality, legal, scannable Fake ID cards from all Canadian and US states, using high-tech printing technology to ensure that each card passes all security tests.
              </p>
              <p className="text-xs sm:text-sm text-gray-300">
                We can help you obtain high-quality Fake ID cards with holograms and UV logos to ensure clear visibility under UV light. Our cards are not only scannable, but also embossed and laser technology to perfectly replicate the real driver's license.
              </p>
              <p className="text-xs sm:text-sm text-gray-300">
                We focus on quality and details, and attach great importance to user privacy. The entire ordering process is simple and secure, ensuring that you get the best experience and feel confident every time you use your Fake ID card.
              </p>
              <p className="text-xs sm:text-sm text-gray-300">
                Choosing us, you will not only get a high-quality virtual ID document, but also complete peace of mind.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/order" className="bg-yellow-green text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-green transition text-xs sm:text-sm">
              Order Now
            </Link>
            <Link href="/contact-us" className="border-2 border-white px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition text-xs sm:text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-4">Payment Methods</h2>
          <p className="text-center text-xs sm:text-sm mb-8">
            It is recommended to pay with <span className="text-yellow-green">cryptocurrency</span> to ensure that your payment is untraceable and confidential, and the transaction is not only fast and reliable but also more secure.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {[
              { name: 'Cryptocurrency', image: '/images/crypto.png' },
              { name: 'Apple Pay', image: '/images/apple.png' },
              { name: 'CashApp', image: '/images/cashapp.png' },
              { name: 'Zelle', image: '/images/zelle.png' },
              { name: 'Bank Transfer', icon: '🏦' }
            ].map((payment, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center mb-2 p-2">
                  {payment.image ? (
                    <img src={payment.image} alt={payment.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-3xl">{payment.icon}</span>
                  )}
                </div>
                <span className="text-sm text-center">{payment.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-center mb-3">Good reviews display wall for the Best Fake ID Maker</h2>
          <p className="text-center text-xs sm:text-sm mb-6">We have served many customers and are trustworthy.</p>
          
          {/* Chat Screenshots Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6">
            <div className="flex items-center justify-center h-40 sm:h-56 md:h-80 lg:h-96">
              <img src="/images/rev1.png" alt="Best Fake ID Review 1" className="max-w-full max-h-full object-contain w-full" />
            </div>
            <div className="flex items-center justify-center h-40 sm:h-56 md:h-80 lg:h-96">
              <img src="/images/rev2.png" alt="Best Fake ID Review 2" className="max-w-full max-h-full object-contain w-full" />
            </div>
            <div className="flex items-center justify-center h-40 sm:h-56 md:h-80 lg:h-96">
              <img src="/images/rev3.png" alt="Best Fake ID Review 3" className="max-w-full max-h-full object-contain w-full" />
            </div>
            <div className="flex items-center justify-center h-40 sm:h-56 md:h-80 lg:h-96">
              <img src="/images/rev4.png" alt="Best Fake ID Review 4" className="max-w-full max-h-full object-contain w-full" />
            </div>
            <div className="flex items-center justify-center h-40 sm:h-56 md:h-80 lg:h-96">
              <img src="/images/rev5.png" alt="Best Fake ID Review 5" className="max-w-full max-h-full object-contain w-full" />
            </div>
            <div className="flex items-center justify-center h-40 sm:h-56 md:h-80 lg:h-96">
              <img src="/images/rev6.png" alt="Best Fake ID Review 6" className="max-w-full max-h-full object-contain w-full" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/order" className="bg-yellow-green text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-green transition text-center">
              Order Now
            </Link>
            <Link href="/contact-us" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8 sm:space-y-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
              <div className="flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-1.5 sm:gap-y-2">
                <Link href="/" className="text-gray-400 hover:text-yellow-green transition text-xs">HOME</Link>
                <Link href="/product-info" className="text-gray-400 hover:text-yellow-green transition text-xs">PRODUCT INFO</Link>
                <Link href="/order" className="text-gray-400 hover:text-yellow-green transition text-xs">ORDER</Link>
                <Link href="/product-list" className="text-gray-400 hover:text-yellow-green transition text-xs">PRODUCT LIST</Link>
                <Link href="/use-guide" className="text-gray-400 hover:text-yellow-green transition text-xs">USE GUIDE</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">EVALUATE</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">FAQ</Link>
                <Link href="/contact-us" className="text-gray-400 hover:text-yellow-green transition text-xs">CONTACT US</Link>
              </div>
            </div>

            {/* Related Policies */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-1.5 sm:gap-y-2">
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">RETURN & REFUND POLICY</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">SHIPPING POLICY</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">TERMS & CONDITIONS</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">PRIVACY POLICY</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs">PAYMENT POLICY</Link>
              </div>
            </div>

            {/* Contact Us / About */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-300">About</h3>
              <div className="space-y-1 sm:space-y-1.5 text-gray-400 text-xs">
                <p><span className="font-semibold">Company:</span> JAYTIMMAID Inc.</p>
                <p><span className="font-semibold">Address:</span> 548 Market St Suite 96966, San Francisco, CA 94104</p>
                <p><span className="font-semibold">WhatsApp:</span> +1 (832) 453-7253</p>
                <p><span className="font-semibold">Telegram:</span> jaytimma1</p>
                <p><span className="font-semibold">Email:</span> jaytimmaid.orders@gmail.com</p>
                <div className="flex space-x-3 mt-4">
                  <a href="https://wa.me/18324537253" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
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