'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronUp, Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { getCartItems, updateCartItem, removeFromCart, clearCart, type CartItem } from '@/lib/cart';
import { submitOrder } from '@/lib/firestore';
import { formatPriceForProduct } from '@/lib/products';
import { buildCartOrderMessage, openWhatsAppWithMessage } from '@/lib/orderWhatsApp';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Load cart items from localStorage
  useEffect(() => {
    const loadCart = () => {
      const items = getCartItems();
      setCartItems(items);
    };

    loadCart();

    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  // Check if product is UK
  const formatItemPrice = (productName: string, amount: number) =>
    formatPriceForProduct(productName, amount);

  // Calculate totals
  const selectedItems = cartItems.filter(item => item.selected);
  const selectedCount = selectedItems.length;
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount based on quantity
  let discount = 0;
  let discountText = '';
  if (totalQuantity >= 2 && totalQuantity <= 3) {
    discount = totalQuantity * 10;
    discountText = '2-3, $10 each card reduce';
  } else if (totalQuantity >= 4 && totalQuantity <= 9) {
    discount = totalQuantity * 20;
    discountText = '4-9, $20 each card reduce';
  } else if (totalQuantity >= 10) {
    discount = totalQuantity * 25;
    discountText = '10+, $25 each card reduce';
  }
  
  const originalAmount = subtotal + discount;
  const finalAmount = subtotal;

  // Handle quantity change
  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateCartItem(id, { quantity: newQuantity });
      setCartItems(items =>
        items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i)
      );
    }
  };

  // Handle item selection
  const handleSelectItem = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      const newSelected = !item.selected;
      updateCartItem(id, { selected: newSelected });
      setCartItems(items =>
        items.map(i => i.id === id ? { ...i, selected: newSelected } : i)
      );
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    const newSelected = !allSelected;
    cartItems.forEach(item => {
      updateCartItem(item.id, { selected: newSelected });
    });
    setCartItems(items =>
      items.map(item => ({ ...item, selected: newSelected }))
    );
  };

  // Handle delete item
  const handleDeleteItem = (id: string) => {
    removeFromCart(id);
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Handle batch delete
  const handleBatchDelete = () => {
    const selectedIds = cartItems.filter(item => item.selected).map(item => item.id);
    selectedIds.forEach(id => removeFromCart(id));
    setCartItems(items => items.filter(item => !item.selected));
  };

  // Handle checkout
  const handleCheckout = async () => {
    const selectedItems = cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      setSubmitError('Please select at least one item to checkout');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit each selected item as a separate order
      const orderPromises = selectedItems.map(async (item) => {
        const totalPrice = item.price * item.quantity;

        const orderData = {
          product: item.product,
          quantity: item.quantity,
          totalPrice: totalPrice,
          social: item.formData.social,
          socialValue: item.formData.socialValue,
          email: item.formData.email ?? '',
          firstName: item.formData.firstName,
          middleName: item.formData.middleName,
          lastName: item.formData.lastName,
          sex: item.formData.sex,
          birthday: item.formData.birthday,
          hairColor: item.formData.hairColor,
          eyesColor: item.formData.eyesColor,
          heightFeet: item.formData.heightFeet,
          heightInches: item.formData.heightInches,
          weight: item.formData.weight,
          address: item.formData.address,
          customize: item.formData.customize,
          paymentMethod: item.formData.paymentMethod || 'Not specified',
          photo: item.formData.photo,
          signature: item.formData.signature,
        };

        const orderId = await submitOrder(orderData);
        return { orderId, orderData };
      });

      const orderResults = await Promise.all(orderPromises);

      const submittedIds = selectedItems.map((item) => item.id);
      submittedIds.forEach((id) => removeFromCart(id));

      const whatsappItems = orderResults.map(({ orderId, orderData }) => ({
        orderId,
        product: orderData.product,
        quantity: orderData.quantity,
        totalPrice: orderData.totalPrice,
        paymentMethod: orderData.paymentMethod,
        firstName: orderData.firstName,
        middleName: orderData.middleName,
        lastName: orderData.lastName,
        email: orderData.email,
        social: orderData.social,
        socialValue: orderData.socialValue,
        address: orderData.address,
      }));

      const whatsappMessage = buildCartOrderMessage(whatsappItems);
      openWhatsAppWithMessage(whatsappMessage);
      setTimeout(() => window.location.assign('/order-confirmed'), 400);
    } catch (error: any) {
      console.error('Error during checkout:', error);
      setSubmitError(error.message || 'Failed to checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

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
              <Link href="/use-guide" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">USE GUIDE</Link>
              <Link href="/evaluate" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">EVALUATE</Link>
              <Link href="/faq" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">FAQ</Link>
              <Link href="/contact-us" className="hover:text-yellow-green transition text-xs sm:text-sm text-gray-300">CONTACT US</Link>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center relative">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 cursor-pointer hover:text-blue-300 transition" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
          {/* Cart Title */}
          <div className="flex items-center mb-6 sm:mb-8">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800 mr-2 sm:mr-3" />
            <h1 className="text-xl sm:text-2xl font-display font-semibold text-black">
              Cart
            </h1>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{submitError}</span>
            </div>
          )}

          {/* Cart Table - Responsive */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 w-12">
                      <input
                        type="checkbox"
                        checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Information</th>
                    <th className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-medium text-gray-700">Price</th>
                    <th className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-medium text-gray-700">Subtotal</th>
                    <th className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-medium text-gray-700">Operate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-xs sm:text-sm">
                        Your cart is empty
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-4 py-3">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="font-medium text-gray-800 text-xs sm:text-sm text-center w-full">{item.product}</div>
                            <div className="watermarked-image w-24 h-16 sm:w-32 sm:h-20 relative flex-shrink-0 flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.product}
                                className="w-full h-full object-contain rounded"
                                onError={(e) => {
                                  e.currentTarget.src = '/images/idfront.jpg';
                                }}
                              />
                            </div>
                            <div className="text-gray-500 text-xs text-center">{item.formData.firstName} {item.formData.lastName}</div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-center text-gray-800 font-medium text-xs sm:text-sm">
                          {formatItemPrice(item.product, item.price)}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="w-10 sm:w-12 text-center font-medium text-gray-800 text-xs sm:text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-center text-gray-800 font-medium text-xs sm:text-sm">
                          {formatItemPrice(item.product, item.price * item.quantity)}
                        </td>
                        <td className="px-3 sm:px-4 py-3">
                          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                            <button className="px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm">
                              detail
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-xs sm:text-sm"
                            >
                              delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-xs sm:text-sm">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start space-x-3 mb-3">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col items-center space-y-2">
                        <div className="font-medium text-gray-800 text-xs sm:text-sm text-center w-full">{item.product}</div>
                        <div className="watermarked-image w-full max-w-[200px] h-24 sm:h-32 relative flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.product}
                            className="w-full h-full object-contain rounded"
                            onError={(e) => {
                              e.currentTarget.src = '/images/idfront.jpg';
                            }}
                          />
                        </div>
                        <div className="text-gray-500 text-xs text-center">{item.formData.firstName} {item.formData.lastName}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-500">Price: </span>
                        <span className="font-medium text-gray-800">{formatItemPrice(item.product, item.price)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Subtotal: </span>
                        <span className="font-medium text-gray-800">{formatItemPrice(item.product, item.price * item.quantity)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-800 text-xs">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs">
                          detail
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-xs"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Summary and Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Left: Selection and Batch Delete */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-gray-700 font-medium text-xs sm:text-sm">selected ({selectedCount})</span>
                <button
                  onClick={handleBatchDelete}
                  disabled={selectedCount === 0}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  Batch Delete
                </button>
              </div>

              {/* Center: Amount and Discount */}
              <div className="flex flex-col items-start sm:items-center lg:items-center space-y-1.5 sm:space-y-2">
                <div className="text-gray-700 text-xs sm:text-sm">
                  <span className="font-medium">Amount to: </span>
                  <span className="text-sm sm:text-base font-semibold">${originalAmount}</span>
                </div>
                {discount > 0 && (
                  <div className="text-gray-700 text-xs sm:text-sm">
                    <span className="font-medium">Discounted: </span>
                    <span className="text-sm sm:text-base font-semibold text-red-600">${discount}</span>
                  </div>
                )}
              </div>

              {/* Right: Final Amount and Discount Info */}
              <div className="flex flex-col items-start sm:items-end lg:items-end space-y-1.5 sm:space-y-2">
                <div className="text-gray-700 text-xs sm:text-sm">
                  <span className="font-medium">Meet: </span>
                  <span className="text-sm sm:text-base font-semibold text-red-600">${finalAmount}</span>
                </div>
                {discountText && (
                  <div className="text-xs text-gray-500">{discountText}</div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/product-list"
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition text-center text-xs sm:text-sm"
              >
                Continue adding 
              </Link>
              <button
                onClick={handleCheckout}
                disabled={selectedCount === 0 || isSubmitting}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving order...
                  </span>
                ) : (
                  'Send order via WhatsApp'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back-to-top Button */}
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

