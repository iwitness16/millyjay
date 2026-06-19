'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout, getAdminUsername } from '@/lib/adminAuth';
import { fetchAllOrders, downloadBase64Image, AdminOrderData } from '@/lib/adminFirestore';
import { Timestamp } from 'firebase/firestore';
import { 
  LogOut, 
  Package, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Download, 
  Eye,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<AdminOrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderData | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    loadOrders();
  }, [router]);

  useEffect(() => {
    // Filter orders based on search term
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = orders.filter(order => 
        order.firstName?.toLowerCase().includes(term) ||
        order.lastName?.toLowerCase().includes(term) ||
        order.email?.toLowerCase().includes(term) ||
        order.socialValue?.toLowerCase().includes(term) ||
        order.product?.toLowerCase().includes(term) ||
        order.id?.toLowerCase().includes(term)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const loadOrders = async () => {
    setIsLoading(true);
    setError('');
    try {
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatDate = (date: Date | Timestamp | null): string => {
    if (!date) return 'N/A';
    let d: Date;
    if (date instanceof Date) {
      d = date;
    } else if (date && typeof (date as any).toDate === 'function') {
      d = (date as Timestamp).toDate();
    } else {
      d = new Date(date as any);
    }
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  if (!isAuthenticated()) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <img 
                  src="/images/logo.jpg" 
                  alt="JAYTIMMAID Logo" 
                  className="h-10 w-10 object-contain rounded-lg"
                />
                <div className="flex flex-col">
                  <div className="text-yellow-green text-lg font-display font-semibold tracking-tight">
                    JAYTIMMAID
                  </div>
                  <div className="text-xs text-gray-400 font-sans">Admin Dashboard</div>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                Welcome, <span className="text-yellow-green font-semibold">{getAdminUsername()}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-green">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatPrice(orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0))}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-green" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, product, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={loadOrders}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-green text-black font-semibold rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-green mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No orders found</p>
            {searchTerm && (
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
            )}
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                >
                  {/* Order Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.firstName} {order.middleName} {order.lastName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4" />
                            <span>{order.product}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{order.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatPrice(order.totalPrice)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Customer Details */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h4>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">First Name</p>
                              <p className="font-medium">{order.firstName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Middle Name</p>
                              <p className="font-medium">{order.middleName || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Name</p>
                              <p className="font-medium">{order.lastName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Sex</p>
                              <p className="font-medium">{order.sex}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Birthday</p>
                              <p className="font-medium">{order.birthday || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Height</p>
                              <p className="font-medium">
                                {order.heightFeet && order.heightInches 
                                  ? `${order.heightFeet}' ${order.heightInches}"`
                                  : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Weight</p>
                              <p className="font-medium">{order.weight || 'N/A'} lbs</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Hair Color</p>
                              <p className="font-medium">{order.hairColor || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Eyes Color</p>
                              <p className="font-medium">{order.eyesColor || 'N/A'}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-2">Contact Information</p>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{order.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">
                                  {order.social}: {order.socialValue}
                                </span>
                              </div>
                            </div>
                          </div>

                          {order.address && (
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-500 mb-2">Address</p>
                              <div className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <span className="text-sm">{order.address}</span>
                              </div>
                            </div>
                          )}

                          {order.customize && (
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-500 mb-2">Customization Notes</p>
                              <p className="text-sm">{order.customize}</p>
                            </div>
                          )}
                        </div>

                        {/* Right Column - Order Details & Images */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Product</span>
                              <span className="font-medium">{order.product}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Quantity</span>
                              <span className="font-medium">{order.quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Total Price</span>
                              <span className="font-medium text-lg">{formatPrice(order.totalPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Payment Method</span>
                              <span className="font-medium">{order.paymentMethod || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Order ID</span>
                              <span className="font-mono text-xs">{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Order Date</span>
                              <span className="font-medium text-sm">{formatDate(order.createdAt)}</span>
                            </div>
                          </div>

                          {/* Images Section */}
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Images</h4>
                            
                            <div className="space-y-4">
                              {/* Photo */}
                              {order.photo && (
                                <div>
                                  <p className="text-sm text-gray-500 mb-2">Customer Photo</p>
                                  <div className="bg-gray-100 rounded-lg p-4">
                                    <img
                                      src={order.photo}
                                      alt="Customer Photo"
                                      className="max-w-full h-auto rounded-lg mb-2 max-h-64 object-contain mx-auto"
                                    />
                                    <button
                                      onClick={() => downloadBase64Image(order.photo!, `photo-${order.id}.jpg`)}
                                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-green text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
                                    >
                                      <Download className="w-4 h-4" />
                                      <span>Download Photo</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Signature */}
                              {order.signature && (
                                <div>
                                  <p className="text-sm text-gray-500 mb-2">Customer Signature</p>
                                  <div className="bg-gray-100 rounded-lg p-4">
                                    <img
                                      src={order.signature}
                                      alt="Customer Signature"
                                      className="max-w-full h-auto rounded-lg mb-2 max-h-64 object-contain mx-auto"
                                    />
                                    <button
                                      onClick={() => downloadBase64Image(order.signature!, `signature-${order.id}.jpg`)}
                                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-green text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
                                    >
                                      <Download className="w-4 h-4" />
                                      <span>Download Signature</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {!order.photo && !order.signature && (
                                <p className="text-sm text-gray-500 text-center py-4">
                                  No images uploaded for this order
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
