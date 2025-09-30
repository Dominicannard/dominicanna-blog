"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// Define a type for the post data we expect to fetch
interface Post {
    slug: string;
    title: string;
    summary: string;
    authors?: string[]; // Changed from author?: string; to authors?: string[]
    link: string;
    image?: string;
    heroImage?: string; // Added heroImage as it's used in rendering
		categories?: string[],
		draft?: false,
		isFeatured?: false,
		postType?: string
		publishDate: string,
}

// Accept readonly array and allow nulls, then filter them out
export default function Banner({ props }: { props: readonly (string | null)[] }) {
	const [postsData, setPostsData] = useState<Post[]>([]); // State to hold fetched post data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        // Filter out nulls and empty strings from props first
        const validSlugs = (props || [])
            .filter((slug): slug is string => typeof slug === 'string' && slug.trim() !== '')
            .map(slug => slug.trim()); // Ensure no leading/trailing whitespace

        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            
            if (validSlugs.length === 0) {
                setPostsData([]);
                setLoading(false);
                return;
            }

            try {
                // Use Promise.all to fetch all posts concurrently
                const promises = validSlugs.map(async (slug) => {
                    try {
                        const response = await fetch(`/api/posts/${slug}`);
                        if (!response.ok) {
                            // Log the status and text for debugging
                            const errorText = await response.text();
                            console.error(`Failed to fetch post for slug: ${slug}, Status: ${response.status}, Body: ${errorText}`);
                            throw new Error(`Failed to fetch post for slug: ${slug} (Status: ${response.status})`);
                        }
                        const data = await response.json();
                        // Assuming the API returns a single post object
												data.slug = slug;
                        return data;
                    } catch (fetchError: any) {
                        console.error(`Error fetching post ${slug}:`, fetchError);
                        // Return null or a placeholder if a single post fails, so Promise.all doesn't reject
                        return null; 
                    }
                });
                
                const results = await Promise.all(promises);
                // Filter out any null results from failed fetches
                const validPosts = results.filter((post): post is Post => post !== null);
                setPostsData(validPosts);

            } catch (err: any) {
                console.error("Error fetching posts:", err);
                setError(`Failed to load posts. ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [props]); // Re-run effect if props (slugs) change

	// Group items into pairs for each slide
	const groupedItems = [];
	for (let i = 0; i < postsData?.length; i += 2) { // Use postsData state here
		groupedItems.push(postsData.slice(i, i + 2));
	}

	console.log('Received slugs: ', props);
    console.log('Fetched posts data: ', postsData);

    if (loading) {
        return <div className="w-full h-64 flex items-center justify-center">Loading banner posts...</div>;
    }

    if (error) {
        return <div className="w-full h-64 flex items-center justify-center text-red-500">{error}</div>;
    }

    if (postsData.length === 0) {
        // This message will show if props was empty, or if all fetches failed, or if no posts were found for the slugs.
        return <div className="w-full h-64 flex items-center justify-center">No posts found for the banner.</div>;
    }

	return (
		<div className="w-full bg-white border-t-4 border-red-600">
			<div className="w-full max-w-full">
				<Slider {...settings}>
					{groupedItems?.map((group: Post[], slideIndex: number) => ( // Use Post type for group
						<div key={slideIndex}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{group.map((item: Post, itemIndex: number) => { // Use Post type for item
									console.log('Rendering item: ', item);
									
									return (
										<div key={itemIndex} className="flex flex-col md:flex-row gap-6 items-start">
											{/* Image Section */}
											<div className="w-full md:w-1/2">
												<div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
													<Image
														src={item?.heroImage || "/"} // Use fetched data
														alt={item?.title || "Banner image"} // Use fetched data
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
														{item?.title} {/* Use fetched data */}
													</h2>

													<p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
														{item?.summary?.length > 100
															? item.summary.slice(0, 99) + "..."
															: item?.summary} {/* Use fetched data */}
													</p>

													{item?.authors && item.authors.length > 0 && ( // Check for authors array and if it's not empty
														<p className="text-sm text-red-500 mb-6">
															Por {item.authors.length === 1 ? item.authors[0] : `${item.authors[0]} y otros`}
														</p>
													)}
												</div>

												<Link 
													href={`/post/${item.slug}` || "/"} // Use fetched data
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
		</div>
	);
}
