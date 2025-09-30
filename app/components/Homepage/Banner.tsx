"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Banner({ props }: { props: any }) {
	const settings = {
		dots: true,
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
	const groupedItems = [];
	for (let i = 0; i < props?.length; i += 2) {
		groupedItems.push(props.slice(i, i + 2));
	}

	return (
		<div className="w-full bg-white border-t-4 border-red-600">
			<div className="w-full max-w-full px-8 py-8">
				<Slider {...settings}>
					{groupedItems?.map((group: any[], slideIndex: number) => (
						<div key={slideIndex}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{group.map((item: any, itemIndex: number) => {
									console.log('item: ', item);
									
									return (
										<div key={itemIndex} className="flex flex-col md:flex-row gap-6 items-start">
											{/* Image Section */}
											<div className="w-full md:w-1/2">
												<div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
													<Image
														src={item?.image || "/"}
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
											<div className="w-full md:w-1/2 flex flex-col justify-between py-2">
												<div>
													<h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
														{item?.title}
													</h2>

													<p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
														{item?.description?.length > 100
															? item.description.slice(0, 99) + "..."
															: item?.description}
													</p>

													{item?.author && (
														<p className="text-sm text-red-500 mb-6">
															Por {item.author}
														</p>
													)}
												</div>

												<Link 
													href={item?.link || "/"} 
													className="inline-block px-6 py-2.5 bg-red-500 text-white text-xs font-bold rounded-full hover:bg-red-600 transition-colors self-start uppercase tracking-wider"
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
		</div>
	);
}