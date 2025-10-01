'use client'
import React, { useEffect } from 'react';

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ adSlot, adFormat = 'auto', adLayout = '' }) => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      // Removed adsbygoogle.push({}) as it can cause duplicate ad errors if called multiple times.
      // The AdSense script should handle processing ads automatically once loaded.
    } catch (e) {
      console.error('Error loading ads:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
         data-ad-slot={adSlot}
         data-ad-format={adFormat}
         data-ad-layout={adLayout}></ins>
  );
};

export default AdComponent;
