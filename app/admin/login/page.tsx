'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/adminAuth';
import { Lock, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (login(username, password)) {
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4">
            <img 
              src="/images/logo.jpg" 
              alt="JAYTIMMAID Logo" 
              className="h-12 w-12 object-contain rounded-lg"
            />
            <div className="flex flex-col">
              <div className="text-yellow-green text-xl font-display font-semibold tracking-tight">
                JAYTIMMAID
              </div>
              <div className="text-xs text-gray-400 font-sans">Admin Dashboard</div>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2 text-center">
            Admin Login
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your credentials to access the dashboard
          </p>

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent"
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-green text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-yellow-green text-sm transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-gray-500 text-xs mt-6">
          This is a secure admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
