'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCart, ChevronUp, Upload, MapPin, User, DollarSign, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { addToCart, getCartItemCount } from '@/lib/cart';
import {
  COUNTRIES,
  getProductPrice,
  formatPriceForProduct,
  getProductsByCategory,
  getProductImage,
} from '@/lib/products';
import { useRouter } from 'next/navigation';

function OrderPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    product: searchParams?.get('product') || 'California',
    social: 'WhatsApp',
    socialValue: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: 'Male',
    birthday: '',
    hairColor: 'Black',
    eyesColor: 'Brown',
    heightFeet: '',
    heightInches: '',
    weight: '160',
    address: '',
    customize: '',
    paymentMethod: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>('/images/sample.png');
  const [signaturePreview, setSignaturePreview] = useState<string | null>('/images/sample2.png');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageView, setImageView] = useState<'front' | 'uv' | 'back'>('front');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
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

  // Update product when URL parameter changes
  useEffect(() => {
    const productParam = searchParams?.get('product');
    if (productParam) {
      setFormData(prev => ({ ...prev, product: decodeURIComponent(productParam) }));
    }
  }, [searchParams]);

  const productFrontImage = useMemo(
    () => getProductImage(formData.product),
    [formData.product]
  );

  const mainProductImage = useMemo(() => {
    if (imageView === 'uv') return '/images/uvfront.jpg';
    if (imageView === 'back') return '/images/idback.jpg';
    return productFrontImage;
  }, [imageView, productFrontImage]);

  // Reset to front view when product changes
  useEffect(() => {
    setImageView('front');
  }, [formData.product]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSignatureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert file to base64 with compression
  const convertFileToBase64 = async (file: File): Promise<string> => {
    const { convertFileToBase64: compressImage } = await import('@/lib/imageUtils');
    return compressImage(file, true);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    setSubmitError(null);
    setCartSuccess(false);

    try {
      // Validate required fields
      if (!formData.socialValue.trim()) {
        throw new Error('Please provide your WhatsApp number (with country code)');
      }
      if (!formData.firstName.trim()) {
        throw new Error('Please provide your first name');
      }
      if (!formData.lastName.trim()) {
        throw new Error('Please provide your last name');
      }
      if (!formData.birthday.trim()) {
        throw new Error('Please provide your birthday');
      }
      if (!formData.heightFeet || !formData.heightInches) {
        throw new Error('Please provide your height');
      }
      if (!photoFile && photoPreview === '/images/sample.png') {
        throw new Error('Please upload your photo');
      }
      if (!formData.paymentMethod.trim()) {
        throw new Error('Please select a payment method');
      }

      // Convert files to base64
      let photoBase64: string | null = null;
      let signatureBase64: string | null = null;

      if (photoFile) {
        photoBase64 = await convertFileToBase64(photoFile);
      } else if (photoPreview && photoPreview !== '/images/sample.png') {
        photoBase64 = photoPreview;
      }

      if (signatureFile) {
        signatureBase64 = await convertFileToBase64(signatureFile);
      } else if (signaturePreview && signaturePreview !== '/images/sample2.png') {
        signatureBase64 = signaturePreview;
      }

      const basePrice = getProductPrice(formData.product);
      const itemPrice = basePrice;

      // Add to cart
      addToCart({
        product: formData.product,
        quantity: quantity,
        price: itemPrice,
        image: productFrontImage,
        formData: {
          social: 'WhatsApp',
          socialValue: formData.socialValue,
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          sex: formData.sex,
          birthday: formData.birthday,
          hairColor: formData.hairColor,
          eyesColor: formData.eyesColor,
          heightFeet: formData.heightFeet,
          heightInches: formData.heightInches,
          weight: formData.weight,
          address: formData.address,
          customize: formData.customize,
          paymentMethod: formData.paymentMethod,
          photo: photoBase64,
          signature: signatureBase64,
        },
      });

      setCartSuccess(true);
      
      // Optionally redirect to cart after a short delay
      setTimeout(() => {
        router.push('/cart');
      }, 1500);

    } catch (error: any) {
      console.error('Error adding to cart:', error);
      setSubmitError(error.message || 'Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Reuse existing add-to-cart validation and logic, then go to cart page
      await handleAddToCart();
    } catch (error: any) {
      console.error('Error during checkout redirect:', error);
      setSubmitError(error.message || 'Failed to proceed to cart. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const basePrice = getProductPrice(formData.product);
  const totalPrice = basePrice * quantity;
  const priceLabel = formatPriceForProduct(formData.product, totalPrice);

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
              <Link href="/order" className="text-yellow-green hover:text-yellow-green transition text-xs sm:text-sm border-b-2 border-yellow-green pb-1">ORDER</Link>
              <Link href="/product-list" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">PRODUCT LIST</Link>
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
              <Link href="/order" className="text-yellow-green text-xs sm:text-sm whitespace-nowrap border-b-2 border-yellow-green pb-1">ORDER</Link>
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
      `}</style>

      {/* Main Content */}
      <div className="pt-32 sm:pt-40 lg:pt-48 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Product Display and Order Info Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Product Display */}
            <div className="space-y-4">
              {/* Main Product Image */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="bg-gray-100 rounded-lg aspect-[3.375/2.125] flex items-center justify-center overflow-hidden relative">
                  <div className="watermarked-image w-full h-full">
                    <img 
                      src={mainProductImage} 
                      alt="California Driver License" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  </div>
                  <div className="hidden w-full h-full items-center justify-center text-gray-400 absolute">
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-2">California Driver License</div>
                      <div className="text-sm">Product Preview</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                <div 
                  onClick={() => setImageView('front')}
                  className={`bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition-all border-2 ${imageView === 'front' ? 'border-yellow-green' : 'border-transparent hover:border-yellow-green'}`}
                >
                  <div className="bg-gray-100 rounded aspect-[3.375/2.125] flex items-center justify-center overflow-hidden relative">
                    <div className="watermarked-image w-full h-full">
                      <img 
                        src={productFrontImage} 
                        alt="Front view" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setImageView('uv')}
                  className={`bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition-all border-2 ${imageView === 'uv' ? 'border-yellow-green' : 'border-transparent hover:border-yellow-green'}`}
                >
                  <div className="bg-gray-100 rounded aspect-[3.375/2.125] flex items-center justify-center overflow-hidden relative">
                    <div className="watermarked-image w-full h-full">
                      <img 
                        src="/images/uvfront.jpg" 
                        alt="UV view" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setImageView('back')}
                  className={`bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition-all border-2 ${imageView === 'back' ? 'border-yellow-green' : 'border-transparent hover:border-yellow-green'}`}
                >
                  <div className="bg-gray-100 rounded aspect-[3.375/2.125] flex items-center justify-center overflow-hidden relative">
                    <div className="watermarked-image w-full h-full">
                      <img 
                        src="/images/idback.jpg" 
                        alt="Back view" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Selection and Order Info */}
            <div className="space-y-6">
              {/* Select Product */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Product (Supports searching for state names)
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  {COUNTRIES.map((country) => (
                    <optgroup key={country.category} label={`${country.flag} ${country.name}`}>
                      {getProductsByCategory(country.category).map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Order Quantity */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Order Quantity:</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition font-semibold text-gray-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition font-semibold text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Total Price:</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-red-600">{priceLabel}</span>
                </div>
              </div>

              {/* Order Now Button */}
              <button
                type="button"
                onClick={() => {
                  const orderProcessCard = document.getElementById('order-process-card');
                  if (orderProcessCard) {
                    orderProcessCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="w-full bg-orange-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-orange-600 transition text-lg"
              >
                Order Now
              </button>
            </div>
          </div>
          <div className="mb-12">
            {/* Order Process */}
            <div id="order-process-card" className="bg-gray-100 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Order Process</h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                {/* Step 1: Select Product */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-center">Select Product</span>
                </div>
                
                {/* Arrow */}
                <ArrowRight className="w-8 h-8 text-orange-500 hidden md:block" />
                <div className="md:hidden text-orange-500 text-2xl mb-2">↓</div>

                {/* Step 2: Fill in Card Info */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-center">Fill in Card Info</span>
                </div>
                
                {/* Arrow */}
                <ArrowRight className="w-8 h-8 text-orange-500 hidden md:block" />
                <div className="md:hidden text-orange-500 text-2xl mb-2">↓</div>

                {/* Step 3: Complete Payment */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-center">Complete Payment</span>
                </div>
                
                {/* Arrow */}
                <ArrowRight className="w-8 h-8 text-orange-500 hidden md:block" />
                <div className="md:hidden text-orange-500 text-2xl mb-2">↓</div>

                {/* Step 4: Received Goods */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-center">Received Goods</span>
                </div>
              </div>
            </div>
          </div>
          {/* Order Form */}
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
            {/* Cart Success Message */}
            {cartSuccess && (
              <div className="text-orange-600 mb-4">
                <p className="font-medium">Item added to cart successfully. Redirecting to cart...</p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{submitError}</span>
              </div>
            )}
            {/* WhatsApp Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                WhatsApp Contact <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2 flex gap-2">
                <div className="w-32 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm flex items-center">
                  WhatsApp
                </div>
                <input
                  type="text"
                  value={formData.socialValue}
                  onChange={(e) => handleInputChange('socialValue', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Enter your WhatsApp number (e.g. +15302181039)"
                />
              </div>
            </div>

            {/* First Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="First Name"
                />
              </div>
            </div>

            {/* Middle Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Middle Name
              </label>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Middle Name"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Sex */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Sex <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <select
                  value={formData.sex}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Birthday */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Birthday <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Hair Color */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Hair Color <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <select
                  value={formData.hairColor}
                  onChange={(e) => handleInputChange('hairColor', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  <option value="Black">Black</option>
                  <option value="Bald">Bald</option>
                  <option value="Blonde">Blonde</option>
                  <option value="Brown">Brown</option>
                  <option value="Gray">Gray</option>
                  <option value="Red">Red</option>
                  <option value="Sandy">Sandy</option>
                  <option value="White">White</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Eyes Color */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Eyes Color <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <select
                  value={formData.eyesColor}
                  onChange={(e) => handleInputChange('eyesColor', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  <option value="Brown">Brown</option>
                  <option value="Blue">Black</option>
                  <option value="Blue">Blue</option>
                  <option value="Gray">Gray</option>
                  <option value="Green">Green</option>
                  <option value="Hazel">Hazel</option>
                  <option value="Maroon">Maroon</option>
                  <option value="Pink">Pink</option>
                  <option value="Multicolor">Multicolor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Height <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2 flex gap-2">
                <select
                  value={formData.heightFeet}
                  onChange={(e) => handleInputChange('heightFeet', e.target.value)}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 8 }, (_, i) => i + 3).map(feet => (
                    <option key={feet} value={feet.toString()}>{feet}</option>
                  ))}
                </select>
                <span className="self-center text-gray-600">Feet</span>
                <select
                  value={formData.heightInches}
                  onChange={(e) => handleInputChange('heightInches', e.target.value)}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 12 }, (_, i) => i).map(inches => (
                    <option key={inches} value={inches.toString()}>{inches}</option>
                  ))}
                </select>
                <span className="self-center text-gray-600">Inches</span>
              </div>
            </div>

            {/* Weight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Weight (Pounds) <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="160"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <label className="text-gray-700 font-semibold md:text-right pt-2">
                Address
              </label>
              <div className="md:col-span-2">
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Format: Street address, City, State, Zip Code. Example: 123 Main St Apt 3B, Los Angeles, CA 90012"
                />
                <p className="text-xs text-gray-500 mt-1">If not filled in, it will be randomly generated</p>
              </div>
            </div>

            {/* Customize */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <label className="text-gray-700 font-semibold md:text-right pt-2">
                Customize
              </label>
              <div className="md:col-span-2">
                <textarea
                  value={formData.customize}
                  onChange={(e) => handleInputChange('customize', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Customize more information, such as: EXP, ISS, DLN, DD, CLASS."
                />
                <p className="text-xs text-gray-500 mt-1">If not filled in, these parameters will be randomly generated</p>
              </div>
            </div>

            {/* Photo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <label className="text-gray-700 font-semibold md:text-right pt-2">
                Photo <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Photo preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-gray-400 text-sm text-center px-2">Photo Preview</div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="mt-2 w-full bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
                    >
                      See Details
                    </button>
                  </div>
                  <div className="flex-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="mb-2 text-sm text-gray-500">Upload photo</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <ul className="mt-4 text-xs text-gray-600 space-y-1 list-disc list-inside">
                      <li>It can be a selfie.</li>
                      <li>The facial features should not be blocked and the head should be intact.</li>
                      <li>Try to choose a white background to avoid clutter</li>
                      <li>No glasses or headphones allowed.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <label className="text-gray-700 font-semibold md:text-right pt-2">
                Signature
              </label>
              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {signaturePreview ? (
                        <img src={signaturePreview} alt="Signature preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-gray-400 text-sm text-center px-2">Signature Preview</div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="mt-2 w-full bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
                    >
                      See Details
                    </button>
                  </div>
                  <div className="flex-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="mb-2 text-sm text-gray-500">Upload photo</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSignatureUpload}
                        className="hidden"
                      />
                    </label>
                    <ul className="mt-4 text-xs text-gray-600 space-y-1 list-disc list-inside">
                      <li>After signing on the white paper, take a photo and upload it.</li>
                      <li>If you do not upload it, it will be automatically generated by the default system.</li>
                      <li>Please do not capture the signature on your ID photo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-semibold md:text-right">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="md:col-span-2">
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                >
                  <option value="">Select Payment Method</option>
                  <option value="Cryptocurrency">Cryptocurrency</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Gift Card">Gift Card</option>
                  <option value="Chime">Chime</option>
                  <option value="CashApp">CashApp</option>
                  <option value="Zelle">Zelle</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding to cart...' : 'Go to Cart'}
              </button>
            </div>
          </form>
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
                <Link href="#" className="text-gray-400 hover:text-yellow-green transition text-xs sm:text-sm">USE GUIDE</Link>
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

      {/* Floating Back-to-top Button (moved to bottom-left to avoid WhatsApp widget) */}
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

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderPageContent />
    </Suspense>
  );
}

