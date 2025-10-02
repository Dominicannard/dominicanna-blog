"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// Define a type for the post data we expect to receive
interface Post {
    slug: string;
    title: string;
    summary: string;
    authors?: string[];
    link: string;
    image?: string;
    heroImage?: string;
		categories?: string[],
		draft?: false,
		isFeatured?: false,
		postType?: string
		publishDate: string,
}

// Props for the client component
interface BannerSliderClientProps {
    postsData: Post[];
}

export default function BannerSliderClient({ postsData }: BannerSliderClientProps) {
    const settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
    };

    // Group items into pairs for each slide
    const groupedItems: Post[][] = [];
    for (let i = 0; i < postsData.length; i += 2) {
        groupedItems.push(postsData.slice(i, i + 2));
    }

    return (
        <div className="w-full max-w-full" style={{ marginBottom: -5 }}>
            <Slider {...settings}>
                {groupedItems.map((group: Post[], slideIndex: number) => (
                    <div key={slideIndex}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {group.map((item: Post, itemIndex: number) => {
                                return (
                                    <div key={itemIndex} className="flex flex-col md:flex-row gap-6 items-start">
                                        {/* Image Section */}
                                        <div className="w-full md:w-1/2">
                                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                                <Image
                                                    src={item?.heroImage || "/"}
                                                    alt={item?.title || "Banner image"}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {/* Vertical "CANNABIS" text */}
                                                <div
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 opacity-30 text-[10px] font-bold tracking-widest select-none"
                                                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                                                >
                                                    CANNABIS
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="w-full md:w-1/2 flex flex-col justify-between py-2 pl-4 pr-4">
                                            <div>
                                                <Link
                                                    href={`/post/${item.slug}` || "/"}
                                                >
                                                    <h2 className="text-xl md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                                                        {item?.title?.length > 50
                                                        ? item?.title?.slice(0, 49) + "..."
                                                        : item?.title}
                                                    </h2>
                                                </Link>

                                                <p className="text-base md:text-md text-gray-600 mb-4 leading-relaxed">
                                                    {item?.summary?.length > 75
                                                        ? item?.summary?.slice(0, 74) + "..."
                                                        : item?.summary}
                                                </p>

                                                {item?.authors && item.authors.length > 0 && (
                                                    <p className="text-sm text-red-500 mb-3">
                                                        Por {item.authors.length === 1 ? item.authors[0] : `${item.authors[0]} y otros`}
                                                    </p>
                                                )}
                                            </div>

                                            <Link
                                                href={`/post/${item.slug}` || "/"}
                                                className="inline-block px-6 py-2.5 bg-red-500 text-white hover:text-white text-xs font-bold rounded-full hover:bg-red-400 transition-colors duration-300 ease-in-out self-start uppercase tracking-wider"
                                            >
                                                Leer más
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </Slider>

            <style jsx global>{`
                .slick-dots {
                    bottom: -45px;
                }

                .slick-dots li {
                    margin: 0 4px;
                }

                .slick-dots li button:before {
                    font-size: 10px;
                    color: #d1d5db;
                }

                .slick-dots li.slick-active button:before {
                    color: #ef4444;
                }

                .slick-prev, .slick-next {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
