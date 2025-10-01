import React from 'react';
import Image from 'next/image';

const Ads: React.FC = () => {
  return (
    <div className="ads-container">
      <Image
        src="/images/ads/widget_ads.png"
        alt="Advertisement"
        width={300} // Adjust width as needed
        height={200} // Adjust height as needed
        layout="responsive" // Or 'fixed', 'intrinsic', 'fill' depending on desired behavior
      />
    </div>
  );
};

export default Ads;
