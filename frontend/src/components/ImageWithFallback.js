"use client";

import { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({ 
  src, 
  fallbackSrc, 
  alt, 
  width, 
  height, 
  className, 
  unoptimized = false,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={unoptimized}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      {...props}
    />
  );
};

export default ImageWithFallback;