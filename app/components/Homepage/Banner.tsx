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
		autoplay: false,
		infinite: true,
		autoplaySpeed: 5000,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: false,
	};

	// console.log('props: ', props);

	return (
		<div className="slider-container w-full m-auto max-w-7xl px-4 py-8">
			<Slider {...settings}>
				{props.map((item: any, index: number) => (
					<div key={index}>
						<Link href={item?.link || "/"} className="flex flex-col lg:flex-row gap-8 items-center group">
							{/* Image Section */}
							<div className="w-full lg:w-1/2">
								<div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
									<Image
										src={item?.image || "/"}
										alt={item?.title || "title"}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
							</div>

							{/* Content Section */}
							<div className="w-full lg:w-1/2 flex flex-col gap-4">
								{/* Trending Badge */}
								<div className="flex items-center gap-3">
									<span className="text-red-600 text-sm font-semibold uppercase tracking-wide">
										Trending
									</span>
									<div className="flex gap-2">
										<button 
											className="p-2 hover:bg-gray-100 rounded-full transition-colors"
											onClick={(e) => e.preventDefault()}
										>
											<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
											</svg>
										</button>
										<button 
											className="p-2 hover:bg-gray-100 rounded-full transition-colors"
											onClick={(e) => e.preventDefault()}
										>
											<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
											</svg>
										</button>
										<button 
											className="p-2 hover:bg-gray-100 rounded-full transition-colors"
											onClick={(e) => e.preventDefault()}
										>
											<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
											</svg>
										</button>
									</div>
								</div>

								{/* Title */}
								<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
									{item?.title}
								</h2>

								{/* Description */}
								<p className="text-gray-700 text-base leading-relaxed line-clamp-4">
									{item?.description}
								</p>

								{/* Meta Info */}
								<div className="flex items-center gap-3 text-sm text-gray-600">
									<span>2 hours ago</span>
									<span>•</span>
									<span>By Lucy Hiddleston</span>
									<span>•</span>
									<span>4min read</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</Slider>

			{/* Breaking News Banner */}
			<div className="mt-14 bg-red-600 rounded-lg p-4 flex items-center gap-4">
				<span className="bg-white text-red-600 px-4 py-2 rounded font-semibold text-sm whitespace-nowrap">
					Breaking News
				</span>
				<p className="text-white font-medium">
					{"Kanye West says he's running for president in 2020."}
				</p>
			</div>
		</div>
	);
}
