import React from 'react';
import Image from 'next/image';

interface BannerAdProps {
  // Define any props if needed in the future
}

const BannerAd: React.FC<BannerAdProps> = () => {
  try {
    return (
      <div className="banner-ad bg-gray-200 p-4 text-center">
        {/* You can add an image or link here */}
        <a rel="sponsored" href="https://www.awin1.com/cread.php?s=1012730&v=4032&q=173734&r=2598383" target='_blank'>
          <Image
            src="https://www.awin1.com/cshow.php?s=1012730&v=4032&q=173734&r=2598383"
            alt="Banner Ad"
            width={12000}
            height={400}
          />
        </a>
      </div>
    );
  } catch (error) {
    // If any error occurs during rendering (e.g., image loading failure on server-side)
    // display the fallback content.
    console.error("Error rendering BannerAd:", error);
    return (
      <div className="banner-ad bg-gray-200 p-4 text-center">
        <p className="text-lg font-semibold">Anuncios</p>
        <p className="text-sm text-gray-600"><a href={`mailto:hello.dominicanna@hotmail.com`} target="_blank" rel="noopener noreferrer">Contactanos</a> para publicidad</p>
      </div>
    );
  }
};

export default BannerAd;
