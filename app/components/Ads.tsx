import React from 'react';
import Image from 'next/image';
import AdComponent from './AdComponent';

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
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          layout="responsive" // Or 'fixed', 'intrinsic', 'fill' depending on desired behavior
        />
      </a>
    </div>
  );
};

export default Ads;
