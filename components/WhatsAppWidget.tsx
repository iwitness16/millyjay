'use client';

import React, { useState } from 'react';
import { WHATSAPP_NUMBER, TELEGRAM_URL } from '@/lib/site';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const baseMessage = message.trim() || 'Hi, I would like to know more about your services.';
    const encoded = encodeURIComponent(baseMessage);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed z-40 right-3 sm:right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-28 flex flex-col items-end gap-2 sm:gap-3">
      {isOpen && (
        <div className="mb-3 w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">Let&apos;s chat on WhatsApp</span>
                <span className="text-white/80 text-xs">Support</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white text-xl leading-none"
              aria-label="Minimize WhatsApp chat"
            >
              ×
            </button>
          </div>

          <div className="bg-[#E5DDD5] px-3 py-4 space-y-4">
            <div className="flex">
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-800">How can I help you? :)</p>
                <p className="text-[10px] text-gray-400 mt-1 text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white px-3 py-2 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                placeholder="Write your message..."
              />
              <button
                type="button"
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20BA5A] transition"
                aria-label="Send WhatsApp message"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#229ED9] flex items-center justify-center shadow-lg hover:bg-[#1d8bc4] transition"
        aria-label="Chat on Telegram"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.116 13.815l-2.91-.907c-.632-.196-.642-.632.135-.936l11.37-4.364c.526-.194.988.12.817.936z" />
        </svg>
      </a>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:bg-[#20BA5A] transition"
        aria-label="Open WhatsApp chat"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      </button>
    </div>
  );
}
