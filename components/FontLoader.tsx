'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Check if links already exist
    const existingPreconnect1 = document.querySelector('link[href="https://fonts.googleapis.com"]');
    const existingPreconnect2 = document.querySelector('link[href="https://fonts.gstatic.com"]');
    const existingStylesheet = document.querySelector('link[href*="fonts.googleapis.com/css2"]');

    if (!existingPreconnect1) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);
    }

    if (!existingPreconnect2) {
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);
    }

    if (!existingStylesheet) {
      const stylesheet = document.createElement('link');
      stylesheet.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
      stylesheet.rel = 'stylesheet';
      document.head.appendChild(stylesheet);
    }
  }, []);

  return null;
}

