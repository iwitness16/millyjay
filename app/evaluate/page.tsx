'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingCart, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Generate 180+ reviews (36 pages × 5 reviews per page)
const generateReviews = () => {
  const firstNames = [
    'Jason', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'James', 'Amanda', 'Robert', 'Lisa',
    'John', 'Jennifer', 'William', 'Ashley', 'Richard', 'Michelle', 'Joseph', 'Kimberly', 'Thomas', 'Amy',
    'Christopher', 'Angela', 'Daniel', 'Melissa', 'Matthew', 'Deborah', 'Anthony', 'Stephanie', 'Mark', 'Rebecca',
    'Donald', 'Sharon', 'Steven', 'Laura', 'Paul', 'Donna', 'Andrew', 'Carol', 'Joshua', 'Nancy',
    'Kenneth', 'Betty', 'Kevin', 'Margaret', 'Brian', 'Sandra', 'George', 'Ashley', 'Timothy', 'Kimberly',
    'Ronald', 'Emily', 'Edward', 'Donna', 'Jason', 'Michelle', 'Jeffrey', 'Carol', 'Ryan', 'Amanda',
    'Jacob', 'Melissa', 'Gary', 'Deborah', 'Nicholas', 'Stephanie', 'Eric', 'Rebecca', 'Jonathan', 'Sharon',
    'Stephen', 'Cynthia', 'Larry', 'Kathleen', 'Justin', 'Amy', 'Scott', 'Angela', 'Brandon', 'Brenda',
    'Benjamin', 'Emma', 'Samuel', 'Olivia', 'Frank', 'Rachel', 'Gregory', 'Samantha', 'Raymond', 'Patricia',
    'Alexander', 'Christine', 'Patrick', 'Marie', 'Jack', 'Janet', 'Dennis', 'Catherine', 'Jerry', 'Frances',
    'Tyler', 'Ann', 'Aaron', 'Marie', 'Jose', 'Helen', 'Adam', 'Shirley', 'Nathan', 'Diane',
    'Henry', 'Joyce', 'Zachary', 'Virginia', 'Douglas', 'Victoria', 'Peter', 'Kelly', 'Kyle', 'Christina',
    'Noah', 'Joan', 'Ethan', 'Evelyn', 'Jeremy', 'Judith', 'Walter', 'Megan', 'Christian', 'Cheryl',
    'Keith', 'Andrea', 'Roger', 'Hannah', 'Terry', 'Jacqueline', 'Gerald', 'Martha', 'Harold', 'Gloria',
    'Sean', 'Teresa', 'Austin', 'Sara', 'Carl', 'Janice', 'Arthur', 'Marie', 'Lawrence', 'Julia',
    'Dylan', 'Grace', 'Jesse', 'Judy', 'Jordan', 'Theresa', 'Bryan', 'Madison', 'Billy', 'Beverly',
    'Bruce', 'Denise', 'Gabriel', 'Marilyn', 'Joe', 'Amber', 'Ralph', 'Danielle', 'Roy', 'Brittany',
    'Wayne', 'Diana', 'Eugene', 'Abigail', 'Louis', 'Jane', 'Philip', 'Lori', 'Johnny', 'Mason'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
    'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams',
    'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips',
    'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris',
    'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
    'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks',
    'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez',
    'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez', 'Powell', 'Jenkins',
    'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes', 'Gonzales', 'Fisher',
    'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham', 'Reynolds', 'Griffin'
  ];

  const reviewTexts = [
    "I ordered during the limited-time sale, and it was such a great deal! Very satisfied— highly recommend!",
    "For anyone wondering I just tried them out good customer service. Answered all my msg. I'll keep y'all informed",
    "I made a mistake in the info due to my own carelessness, but the customer service caught it - incredibly attentive! Service deserves full marks!",
    "Had to unwrap three layers to find the card - the concealment is next level!",
    "The package disguise worked brilliantly, completely flew under the radar.",
    "Packaging is super stealthy - zero indication from the outside it contains a card. Privacy protection is top-notch! Total surprise when opened!",
    "Looks real and works perfectly for any checks.",
    "I ordered an ID from this website, and the quality is really high!",
    "The official store delivered my ID card swiftly with high-quality hologram and UV marking.",
    "The holiday sale price was too good to pass up, so I got a Florida driver's license. Shipping was fast, and the realism is incredible—no issues at all",
    "Customer service is fantastic – answers all my questions promptly.",
    "Received my California ID in perfect condition. The hologram looks authentic and it scans perfectly!",
    "Fast shipping and excellent quality. The card feels real and passes all checks.",
    "Great service! The ID arrived exactly as described. Very satisfied with my purchase.",
    "The packaging was very discreet. Card quality is top-notch, highly recommend!",
    "Ordered a New York ID and it's perfect. Scans work great, no issues at all.",
    "Excellent customer support throughout the process. The ID arrived on time and looks authentic.",
    "Very professional service. The card quality exceeded my expectations.",
    "Quick delivery and perfect quality. The hologram and UV features are spot on!",
    "Got my Texas ID and it's flawless. Works everywhere I've tried it.",
    "Amazing quality and fast shipping. The card looks completely authentic.",
    "Great experience from start to finish. The ID is perfect and scans correctly.",
    "Very satisfied with my purchase. The card quality is excellent and delivery was fast.",
    "The ID arrived in perfect condition. Quality is top tier and it works great!",
    "Excellent service and product quality. The card looks and feels completely real.",
    "Fast shipping and authentic-looking ID. Very happy with my order!",
    "The ID quality is incredible. Hologram and UV features are perfect.",
    "Great customer service and excellent product. Highly recommend this service!",
    "Received my Florida ID and it's perfect. Quality is outstanding!",
    "The card arrived quickly and looks completely authentic. Very satisfied!",
    "Excellent quality and fast delivery. The ID works perfectly everywhere.",
    "Great service! The ID quality is top-notch and it scans perfectly.",
    "Very professional service. The card looks authentic and works great!",
    "Fast shipping and excellent quality. The hologram features are perfect.",
    "The ID arrived in perfect condition. Quality exceeds expectations!",
    "Excellent customer support and product quality. Very satisfied!",
    "Great experience! The card looks completely authentic and works perfectly.",
    "Perfect quality and fast shipping. Highly recommend!",
    "The ID works great everywhere I've tried it. Very satisfied!",
    "Outstanding service and product quality. Will order again!",
    "Fast delivery and authentic-looking card. Very happy!",
    "The hologram and UV features are spot on. Perfect quality!",
    "Great customer service throughout the process. Highly satisfied!",
    "The card quality exceeded all my expectations. Excellent!",
    "Quick shipping and perfect quality. Works great everywhere!",
    "Very professional service. The ID looks completely authentic.",
    "Fast delivery and excellent quality. Very satisfied with purchase!",
    "The ID arrived in perfect condition. Quality is outstanding!",
    "Great experience from start to finish. Highly recommend!",
    "Excellent service and product quality. Very happy with order!",
    "Perfect quality and fast shipping. Works great everywhere!",
    "Shipping was incredibly fast - got my ID within a week! The tracking updates were on point and delivery was smooth.",
    "I was skeptical at first but this is a legitimate business. They respond quickly to messages and the product is exactly as advertised.",
    "Delivery was discreet and fast. The ID quality is amazing - you can't tell it's not real. Highly recommend this service!",
    "Customer service team is responsive and professional. They helped me fix an issue with my order details before shipping.",
    "The shipping process was seamless. Received tracking info within 24 hours and the package arrived exactly when expected.",
    "This is a trustworthy service. They deliver on time and the quality is consistent. I've ordered multiple times now.",
    "Fast shipping and excellent communication. They kept me updated throughout the entire process from order to delivery.",
    "The delivery was super discreet - no one would know what's inside. Quality is top-notch and shipping was faster than expected.",
    "Legitimate business with real customer service. They answer questions promptly and the shipping is reliable.",
    "Shipping was quick and the packaging was professional. The ID quality exceeded my expectations - looks completely authentic.",
    "Great experience overall. Fast shipping, good communication, and the product quality is excellent. Will definitely order again.",
    "They ship fast and the delivery is always on time. The ID quality is consistent and the customer service is helpful.",
    "Professional service from start to finish. Shipping was fast, delivery was discreet, and the product quality is outstanding.",
    "I've used this service multiple times and they never disappoint. Fast shipping, great quality, and reliable delivery every time.",
    "The shipping was faster than I expected. The ID arrived in perfect condition and the quality is exactly as described.",
    "Excellent shipping and delivery service. They provide tracking updates and the package arrived safely and on time.",
    "Fast and reliable shipping. The ID quality is amazing and the delivery was completely discreet. Highly satisfied!",
    "This is a legitimate and professional service. Fast shipping, great communication, and excellent product quality.",
    "Shipping was quick and the delivery was smooth. The ID quality is top-tier and the customer service is responsive.",
    "Great shipping experience - got tracking info quickly and delivery was on time. The ID quality is excellent!",
    "Fast shipping and professional service. The delivery was discreet and the ID quality is outstanding. Very satisfied!",
    "Reliable shipping and delivery. The ID arrived on time and in perfect condition. Quality is exactly as promised.",
    "Excellent shipping service with real-time tracking. The delivery was fast and the ID quality is top-notch.",
    "Fast shipping and great customer service. The delivery was discreet and the ID quality exceeded my expectations.",
    "Professional shipping and delivery. They keep you informed throughout the process and the product quality is excellent.",
    "Shipping was incredibly fast and the delivery was completely discreet. The ID quality is amazing - looks completely real!",
    "This is a legitimate business with fast shipping and reliable delivery. The ID quality is excellent and customer service is great.",
    "Fast shipping, professional delivery, and excellent product quality. This is a trustworthy service that delivers on their promises.",
    "Great shipping experience - received tracking quickly and delivery was on time. The ID quality is outstanding and looks completely authentic.",
    "Reliable shipping and fast delivery. The ID quality is top-tier and the customer service is responsive and helpful.",
    "Fast shipping and excellent delivery service. The ID arrived in perfect condition and the quality is exactly as described.",
    "Professional shipping with real-time updates. The delivery was fast and discreet, and the ID quality is outstanding.",
    "Fast shipping and reliable delivery. The ID quality is excellent and the customer service is professional and responsive.",
    "Great shipping experience - tracking was provided quickly and delivery was on time. The ID quality is top-notch!",
    "Fast shipping and professional delivery. The ID quality is excellent and the service is legitimate and trustworthy.",
    "Shipping was incredibly fast and the delivery was completely discreet. The ID quality is amazing and looks completely authentic!",
    "This is a legitimate business with excellent shipping and delivery. The ID quality is outstanding and customer service is great.",
    "Fast shipping, reliable delivery, and excellent product quality. This is a professional service that delivers on their promises."
  ];

  const reviews = [];
  const totalReviews = 180; // 36 pages × 5 reviews per page

  // Create a shuffled array of name combinations to ensure variety
  const nameCombinations: { firstName: string; lastName: string }[] = [];
  for (let i = 0; i < totalReviews; i++) {
    // Use different indices to mix names better
    const firstNameIndex = (i * 7 + 13) % firstNames.length; // Prime number multiplication for better distribution
    const lastNameIndex = (i * 11 + 17) % lastNames.length; // Different prime for last names
    nameCombinations.push({
      firstName: firstNames[firstNameIndex],
      lastName: lastNames[lastNameIndex]
    });
  }

  for (let i = 0; i < totalReviews; i++) {
    const { firstName, lastName } = nameCombinations[i];
    const name = `${firstName} ${lastName}`;
    
    // Generate dates starting from 2026-01-15 with varying gaps (not day by day)
    // First review is 2026-01-15, then gaps like 2 days, 5 days, 10 days, etc.
    // Last reviews are in 2022
    const startDate = new Date('2026-01-15');
    let totalDaysToSubtract = 0;
    
    // Calculate cumulative days to subtract with varying gaps
    // Use a pattern that creates natural-looking gaps: 2, 3, 5, 7, 10, 12, 15, etc.
    for (let j = 0; j < i; j++) {
      // Create varying gaps: smaller gaps early, larger gaps later
      const gapPattern = [2, 3, 2, 5, 3, 7, 5, 10, 7, 12, 10, 15, 12, 20, 15, 25, 20, 30, 25, 35];
      const gapIndex = j % gapPattern.length;
      const gap = gapPattern[gapIndex];
      // Add some randomness: ±1-3 days
      const randomVariation = (j % 4) - 1; // -1, 0, 1, 2
      totalDaysToSubtract += gap + randomVariation;
    }
    
    const reviewDate = new Date(startDate);
    reviewDate.setDate(reviewDate.getDate() - totalDaysToSubtract);
    
    // Ensure date doesn't go before 2022-01-01
    const minDate = new Date('2022-01-01');
    if (reviewDate < minDate) {
      reviewDate.setTime(minDate.getTime());
    }
    
    const year = reviewDate.getFullYear();
    const month = String(reviewDate.getMonth() + 1).padStart(2, '0');
    const day = String(reviewDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    
    // Use only real human photos for avatars (no animations or letter-based)
    const avatarId = (i % 70) + 1;
    const gender = i % 2 === 0 ? 'men' : 'women';
    // Alternate between pravatar and randomuser for variety, both provide real photos
    const avatar = i % 2 === 0 
      ? `https://i.pravatar.cc/150?img=${avatarId}`
      : `https://randomuser.me/api/portraits/${gender}/${avatarId % 50}.jpg`;
    
    const text = reviewTexts[i % reviewTexts.length];
    
    // Assign proof images especially to first 3 pages (reviews 0-14) and last 2 pages (reviews 170-179)
    let image = null;
    const proofImages = [
      '/images/proof1.png',
      '/images/proof2.png',
      '/images/proof3.png',
      '/images/proof4.png',
      '/images/proof5.png',
      '/images/proof6.png',
      '/images/proof7.png',
      '/images/proof8.png',
      '/images/proof9.jpg'
    ];
    
    if (i < 5) {
      // First page (reviews 0-4) - only first 3 reviews have images
      if (i < 3) {
        image = proofImages[i]; // First 3 reviews get proof1-3
      }
    } else if (i >= 170) {
      // Last 2 pages (reviews 170-179) - assign proof images more frequently
      const lastPageIndex = i - 170;
      if (lastPageIndex < 9) {
        image = proofImages[lastPageIndex]; // First 9 reviews on last pages get proof1-9
      } else {
        image = proofImages[lastPageIndex % 9]; // Remaining get proof images
      }
    } else {
      // Other pages - some reviews have images (about 1 in 5)
      if (i % 5 === 0) {
        image = proofImages[i % 9]; // Use proof images for variety
      }
    }
    
    reviews.push({
      id: i + 1,
      name,
      date,
      text,
      avatar,
      image
    });
  }

  return reviews;
};

export default function EvaluatePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = 36;
  
  const allReviews = useMemo(() => generateReviews(), []);
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = allReviews.slice(startIndex, endIndex);
  
  // Pagination logic
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Show pages 1-5, ellipsis, last page
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page, ellipsis, last 5 pages
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

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
              <Link href="/product-list" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT LIST</Link>
              <Link href="#" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="text-yellow-green hover:text-yellow-green transition text-xs sm:text-sm border-b-2 border-yellow-green pb-1">EVALUATE</Link>
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
              <Link href="/product-info" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT INFO</Link>
              <Link href="/order" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">ORDER</Link>
              <Link href="/product-list" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">PRODUCT LIST</Link>
              <Link href="#" className="text-gray-300 hover:text-yellow-green transition text-xs sm:text-sm whitespace-nowrap">USE GUIDE</Link>
              <Link href="/evaluate" className="text-yellow-green text-xs sm:text-sm whitespace-nowrap border-b-2 border-yellow-green pb-1">EVALUATE</Link>
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

      {/* Main Content */}
      <div className="pt-32 sm:pt-40 lg:pt-48 pb-12 px-4 sm:px-6 lg:px-8 bg-white text-black border-t border-white">
        <div className="max-w-2xl mx-auto">

          {/* Reviews - Single Column */}
          <div className="space-y-4 mb-12">
            {currentReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm">
                {/* Review Header */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      // Fallback to a real photo avatar if image fails to load
                      const fallbackId = review.id % 70;
                      e.currentTarget.src = `https://i.pravatar.cc/150?img=${fallbackId + 1}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-black text-sm sm:text-base">{review.name}</div>
                    <div className="text-gray-500 text-xs sm:text-sm">{review.date}</div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-xs sm:text-sm mb-3 leading-relaxed">
                  {review.text}
                </p>

                {/* Review Image if available */}
                {review.image && (
                  <div className="mt-3">
                    <img 
                      src={review.image} 
                      alt="Review image"
                      className="w-full h-auto rounded-lg max-h-64 sm:max-h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }

              // TypeScript type guard: page is now guaranteed to be a number
              const pageNumber = page as number;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-gray-300">Contact Us</h3>
              <div className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <p><span className="font-semibold">Company:</span> JAYTIMMAID Inc.</p>
                <p><span className="font-semibold">Address:</span> 548 Market St Suite 96966, San Francisco, CA 94104</p>
                <p><span className="font-semibold">WhatsApp:</span> +1 (940) 407-4328</p>
                <p><span className="font-semibold">Telegram:</span> jaytimma1</p>
                <p><span className="font-semibold">Email:</span> jaytimmaid.orders@gmail.com</p>
                <div className="flex space-x-3 mt-4">
                  <a href="https://wa.me/19404074328" className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
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
