/**
 * Compress an image file to reduce its size
 * @param file - The image file to compress
 * @param maxWidth - Maximum width (default: 800)
 * @param maxHeight - Maximum height (default: 800)
 * @param quality - JPEG quality 0-1 (default: 0.7)
 * @param maxSizeKB - Maximum file size in KB (default: 500KB)
 * @returns Promise<string> - Base64 encoded compressed image
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.7,
  maxSizeKB: number = 500
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        let compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        
        // If still too large, reduce quality further
        const checkSize = () => {
          const sizeKB = (compressedBase64.length * 3) / 4 / 1024; // Approximate KB
          
          if (sizeKB > maxSizeKB && quality > 0.3) {
            quality -= 0.1;
            compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            checkSize();
          } else {
            resolve(compressedBase64);
          }
        };
        
        checkSize();
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert file to base64 with compression
 */
export const convertFileToBase64 = async (file: File, compress: boolean = true): Promise<string> => {
  if (compress && file.type.startsWith('image/')) {
    return compressImage(file);
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

