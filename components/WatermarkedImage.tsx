import React from 'react';

interface WatermarkedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  noWatermark?: boolean;
}

export default function WatermarkedImage({ 
  src, 
  alt, 
  className = '', 
  noWatermark = false,
  ...props 
}: WatermarkedImageProps) {
  // Don't watermark logos
  const isLogo = alt.toLowerCase().includes('logo');
  
  if (noWatermark || isLogo) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }

  return (
    <div className={`watermarked-image ${className}`}>
      <img src={src} alt={alt} className="w-full h-auto" {...props} />
    </div>
  );
}

