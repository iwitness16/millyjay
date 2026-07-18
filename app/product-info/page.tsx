'use client';

import React from 'react';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function ProductInfoPage() {

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
              <Link href="/product-info" className="text-yellow-green hover:text-yellow-green transition text-xs sm:text-sm border-b-2 border-yellow-green pb-1">PRODUCT INFO</Link>
              <Link href="/order" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">ORDER</Link>
              <Link href="/product-list" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT LIST</Link>
              <Link href="/use-guide" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">EVALUATE</Link>
              <Link href="/faq" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">FAQ</Link>
              <Link href="/contact-us" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">CONTACT US</Link>
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
              <Link href="/product-info" className="text-yellow-green text-xs sm:text-sm whitespace-nowrap border-b-2 border-yellow-green pb-1">PRODUCT INFO</Link>
              <Link href="/order" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">ORDER</Link>
              <Link href="/product-list" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT LIST</Link>
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .scroll-container {
          animation: scroll 20s linear infinite;
        }
        .scroll-container-reverse {
          animation: scrollReverse 20s linear infinite;
        }
        .scroll-container:hover,
        .scroll-container-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content - White Background */}
      <div className="pt-32 sm:pt-40 lg:pt-48 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Currently supported state IDs Section */}
          

          {/* Product Features Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black mb-6 sm:mb-8">
              Product Features
            </h2>
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
                  <h3 className="text-sm sm:text-base font-medium mb-1.5 text-black">{feature.title}</h3>
                  <p className="text-gray-700 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Product Parameter Description Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black mb-4 sm:mb-6">
              Product Parameter Description
            </h2>
            <div className="mb-4 sm:mb-6">
              <p className="text-red-600 font-semibold text-base sm:text-lg">
                You can customize the following card information
              </p>
            </div>
            <div className="mb-4 sm:mb-6 flex items-center justify-center">
              <img src="/images/productinfo.png" alt="ID Information" className="w-full h-auto max-h-96 object-contain" />
            </div>
            <div>
              <p className="text-red-600 text-xs sm:text-sm">
                <span className="font-semibold">Important Note:</span> After placing the order successfully, please be sure to contact the customer to confirm the card Information to ensure that your card is accurately produced.
              </p>
            </div>
          </section>

          {/* Shipping Status Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black mb-4 sm:mb-6">
              Shipping Status
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center">
                <img src="/images/shipping.png" alt="Shipping Status" className="w-full h-auto max-h-96 object-contain" />
              </div>
              <div className="space-y-4">
                <p className="text-black text-base sm:text-lg">
                  Currently, you can receive your customized card in about <span className="text-red-600 font-bold">4</span> days at the fastest
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start">
                    <span className="text-yellow-green text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">★</span>
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold">Ordinary production:</span> 1-2 days, free of charge
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-green text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">★</span>
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold">Expedited production:</span> 1-2 days, charge ($20 for 1-2 cards, additional $10 for each subsequent card)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Package transportation time Section */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-black mb-3 sm:mb-4">
              Package transportation time
            </h2>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start">
                <span className="text-yellow-green text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">★</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="font-semibold">Standard shipping:</span> 5-7 days, USD 10
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-green text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">★</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="font-semibold">Express shipping:</span> 2-4 days, USD 30
                </p>
              </div>
            </div>
          </section>

          {/* Provide logistics information Section */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-black mb-3 sm:mb-4">
              Provide logistics information
            </h2>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <span className="text-yellow-green text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">★</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  After the card is produced, an electronic version of the photo will be sent to you, and it will be shipped after confirmation.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-green text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">★</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  2-3 days after delivery, we will provide you with logistics information to facilitate you to track the package status
                </p>
              </div>
            </div>
          </section>

          {/* Package Receipt Section */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-black mb-3 sm:mb-4">
              Package Receipt
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We have disguised the package and it is very confidential. Please believe that it will be delivered to you safely.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                If you order a large number of cards, it will be sent out in multiple packages. After receiving the package, please follow the video provided to get your card.
              </p>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                  <div className="text-blue-600 text-xs sm:text-sm font-semibold">Package Receipt</div>
                </div>
              </div>
            </div>
          </section>

          {/* Things to note Section */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-red-600 mb-3 sm:mb-4">
              Things to note:
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start">
                <span className="text-red-600 mr-2 mt-1 flex-shrink-0">•</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  The delivery address cannot contain a box, otherwise the delivery will not be possible
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-2 mt-1 flex-shrink-0">•</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  If your address is outside the United States, just enter the complete shipping information at the address and we will ship to you according to that address
                </p>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                You can choose the state and city at will, but the mobile phone number must be the local number of the delivery address, otherwise you cannot be contacted for delivery.
              </p>
              <div className="flex items-start">
                <span className="text-red-600 mr-2 mt-1 flex-shrink-0">•</span>
                <p className="text-gray-700 text-sm sm:text-base">
                  The transportation method must be express delivery before the package can be delivered.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black mb-6 sm:mb-8">
              FAQ
            </h2>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h3 className="font-display font-bold text-gray-800 text-base sm:text-lg">
                    Is this a scam?
                  </h3>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5">
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    We are a legitimate company. We will never lie. You can trust us.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>We have served many customers and are absolutely trustworthy. We will not give up our credibility for a single deal.</li>
                    <li>Our payment methods are both mainstream platforms that protect our interests on both sides.</li>
                    <li>If you do not receive the goods, you can negotiate a refund with us.</li>
                  </ol>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h3 className="font-display font-bold text-gray-800 text-base sm:text-lg">
                    Are the cards scannable?
                  </h3>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5">
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Of course, our cards are scannable.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Each card is rigorously tested before shipment: scanning, bending, black light.</li>
                    <li>Each card has a barcode on the back that can be scanned by the app [scandit] to display all the information on the card in the correct format.</li>
                    <li>Each card can be bent without bulges or creases on the card or laminate.</li>
                    <li>Each card passes through a black light to see the correct hologram, with an accurate brightness level and without stains.</li>
                  </ol>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h3 className="font-display font-bold text-gray-800 text-base sm:text-lg">
                    How much do the cards cost?
                  </h3>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5">
                  <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                    <div>
                      <p className="font-semibold mb-2">Card Pricing:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Buy 1 card: $100</li>
                        <li>Buy 2-3 cards: $180-$270 ($90 per piece)</li>
                        <li>Buy 4-9 cards: $320-$720 ($80 per piece)</li>
                        <li>Buy 10+ cards: $700+ ($70 per piece)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Shipping Information:</p>
                      <p className="mb-2">There are additional charges for shipping, as follows:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Express shipping: 2-4 days, $50</li>
                        <li>Standard shipping: 5-7 days, $20</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h3 className="font-display font-bold text-gray-800 text-base sm:text-lg">
                    How soon can I get my card?
                  </h3>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5">
                  <div className="space-y-4 text-gray-700 text-sm sm:text-base">
                    <div>
                      <p className="font-semibold mb-2">The fastest time you can get your card is 9-11 days:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Card Production Time: 3 days</li>
                        <li>Package Shipping Time: 6-8 days</li>
                      </ul>
                      <p className="mt-2 font-semibold">Total cost: $176 USD</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">The slowest time you can get your card is 15-19 days:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Card Production Time: 4-5 days</li>
                        <li>Package Shipping Time: 10-14 days</li>
                      </ul>
                      <p className="mt-2 font-semibold">Total cost: $121 USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/faq" 
                className="inline-block border border-gray-300 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm sm:text-base bg-gray-100"
              >
                See more &gt;
              </Link>
            </div>
          </section>

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
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">EVALUATE</Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">FAQ</Link>
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
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-gray-300">Contact Us</h3>
              <div className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <p><span className="font-semibold">Company:</span> JAYTIMMAID Inc.</p>
                <p><span className="font-semibold">Address:</span> 548 Market St Suite 96966, San Francisco, CA 94104</p>
                <p><span className="font-semibold">WhatsApp:</span> +1 (530) 218-1039</p>
                <p><span className="font-semibold">Telegram:</span> shaunID</p>
                <p><span className="font-semibold">Email:</span> jaytimmaid.orders@gmail.com</p>
                <div className="flex space-x-3 mt-4">
                  <a href="https://wa.me/15302181039" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a href="https://t.me/shaunID" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.116 13.815l-2.91-.907c-.632-.196-.642-.632.135-.936l11.37-4.364c.526-.194.988.12.817.936z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition">
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

