"use client";

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BannerAdProps {
  // Define any props if needed in the future
}

const BannerAd: React.FC<BannerAdProps> = () => {
  // Define the ads array with all the ad data extracted
  const ads = [
    {
      href: "https://www.awin1.com/cread.php?s=4361523&v=77378&q=568095&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4361523&v=77378&q=568095&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4361529&v=77378&q=568096&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4361529&v=77378&q=568096&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4125642&v=70018&q=538933&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4125642&v=70018&q=538933&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4088064&v=100821&q=535237&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4088064&v=100821&q=535237&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4088084&v=100821&q=535233&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4088084&v=100821&q=535233&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=3873717&v=15607&q=364012&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=3873717&v=15607&q=364012&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=3770161&v=15607&q=364012&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=3770161&v=15607&q=364012&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=2987740&v=15607&q=348809&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=2987740&v=15607&q=348809&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=1012730&v=4032&q=173734&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=1012730&v=4032&q=173734&r=2598383"
    }
  ];

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  try {
    return (
      <div className="w-full">
        <Slider {...settings}>
          {ads.map((ad, index) => (
            <div key={index} className="p-4 bg-gray-200 text-center h-[200px] flex items-center justify-center">
              <a rel="sponsored" href={ad.href} target="_blank" className='flex items-center justify-center'>
                <Image
                  src={ad.imgSrc}
                  alt="Banner Ad"
                  width={1200}
                  height={400}
                  style={{ width: 'auto', height: '160px', objectFit: 'contain' }}
                />
              </a>
            </div>
          ))}
        </Slider>
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
