'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AdComponent = dynamic(() => import('./AdComponent'), {
  ssr: false,
});

const Ads: React.FC = () => {
  return (
    <div className="ads-container">
      <span>
        <AdComponent adSlot="7208043460" />
      </span>
      <a href={`mailto:hello.dominicanna@hotmail.com`} target="_blank" rel="noopener noreferrer">
        <Image
          src="/images/ads/widget_ads.png"
          alt="Advertisement"
          width={300}
          height={200}
        />
      </a>
    </div>
  );
};

export default Ads;
