'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AdComponent = dynamic(() => import('./AdComponent'), {
  ssr: false,
});

const Ads: React.FC = () => {
  // Define the ads array with all the ad data extracted
  const ads = [
    {
      href: "https://www.awin1.com/cread.php?s=4361546&v=77378&q=568096&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4361546&v=77378&q=568096&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4361559&v=77378&q=568095&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4361559&v=77378&q=568095&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4361533&v=77378&q=568095&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4361533&v=77378&q=568095&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4361480&v=77378&q=568095&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4361480&v=77378&q=568095&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4125641&v=70018&q=538933&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4125641&v=70018&q=538933&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4125619&v=70018&q=538932&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4125619&v=70018&q=538932&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4125625&v=70018&q=538933&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4125625&v=70018&q=538933&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=4088069&v=100821&q=535241&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=4088069&v=100821&q=535241&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=3770159&v=15607&q=364012&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=3770159&v=15607&q=364012&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=3671533&v=15607&q=348809&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=3671533&v=15607&q=348809&r=2598383"
    },
    {
      href: "https://www.awin1.com/cread.php?s=2987755&v=15607&q=348809&r=2598383",
      imgSrc: "https://www.awin1.com/cshow.php?s=2987755&v=15607&q=348809&r=2598383"
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

  return (
    <div className="ads-container">
      <span>
        <AdComponent adSlot="7208043460" />
      </span>
      <div className="w-full">
        <Slider {...settings}>
          {ads.map((ad, index) => (
            <div key={index} className="text-center h-[300px] flex items-center justify-center">
              <a rel="sponsored" href={ad.href} target="_blank">
                <Image
                  src={ad.imgSrc}
                  alt="Banner Ad"
                  width={300}
                  height={300}
                  style={{ width: 300, height: 300 }}
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
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
