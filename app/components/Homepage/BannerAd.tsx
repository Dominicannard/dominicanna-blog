import React from 'react';

interface BannerAdProps {
  // Define any props if needed in the future
}

const BannerAd: React.FC<BannerAdProps> = () => {
  return (
    <div className="banner-ad bg-gray-200 p-4 rounded-lg text-center">
      <p className="text-lg font-semibold">Anuncios</p>
      <p className="text-sm text-gray-600">Contactanos para publicidad</p>
      {/* You can add an image or link here */}
    </div>
  );
};

export default BannerAd;
