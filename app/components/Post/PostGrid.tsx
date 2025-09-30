"use client";

import React, { useState } from "react";
import { ICategory, IPost } from "@/app/keystatic/interface";
import PostCard from "./PostCard";
import dynamic from "next/dynamic";

const ScriptClient = dynamic(() => import("@/app/components/ScriptClient"), {
	ssr: false,
});

export default function PostGrid({
	posts,
	categories,
	size,
	layout = "grid",
	title,
	viewMoreLimit = 10,
	viewMoreButton = false,
}: {
	posts?: IPost[];
	categories?: ICategory[];
	size?: "sm" | "md" | "lg";
	layout?: "grid" | "featured" | "masonry";
	title?: string;
	viewMoreLimit?: number;
	viewMoreButton?: boolean;
}) {
	const [visibleCount, setVisibleCount] = useState(viewMoreLimit);

	let gridClass = "@2xl:grid-cols-2 @xl:gap-6 @5xl:grid-cols-3 @6xl:gap-8";
	let textSize = "text-md";

	switch (size) {
		case "sm":
			gridClass = "@lg:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-5 @5xl:grid-cols-4";
			textSize = "text-sm";
			break;
		case "lg":
			gridClass = "@3xl:grid-cols-2 @xl:gap-5 @3xl:gap-6 @6xl:grid-cols-3 @5xl:gap-8 @7xl:grid-cols-4";
			textSize = "xl:text-xl";
			break;
	}

	const displayedPosts = viewMoreButton ? posts?.slice(0, visibleCount) : posts;
	const hasMore = posts && posts.length > visibleCount;

	const handleViewMore = () => {
		setVisibleCount((prev) => prev + viewMoreLimit);
	};

	// Masonry layout like in the image
	if (layout === "masonry") {
		return (
			<>
				{posts && categories && (
					<div className="post-grid @container mb-12">
						{title && (
							<div className="mb-8">
								<h2 className="text-xl font-bold border-b-4 border-black inline-block pb-2">
									{title}
								</h2>
							</div>
						)}
						
						<div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-6">
							{displayedPosts?.map((post, index) => {
								// First row: 3 equal columns
								// Second row: 2 columns + 1 column (left item spans 2 rows from row 1)
								const gridPositions = [
									"@lg:col-start-1 @lg:row-start-1 @lg:row-span-2", // Item 1: spans 2 rows
									"@lg:col-start-2 @lg:row-start-1 @4xl:col-start-2", // Item 2
									"@lg:col-start-2 @lg:row-start-2 @4xl:col-start-3 @4xl:row-start-1", // Item 3
									"@lg:col-start-1 @lg:row-start-3 @4xl:col-start-1 @4xl:row-start-3", // Item 4
									"@lg:col-start-2 @lg:row-start-3 @4xl:col-start-2 @4xl:row-start-3", // Item 5
									"@lg:col-start-1 @lg:row-start-4 @4xl:col-start-3 @4xl:row-start-3", // Item 6
								];
								
								// Only show items up to index 5 for masonry pattern, then continue with remaining
								const positionClass = index < 6 ? gridPositions[index] : '';
								
								return (
									<div
										key={post.slug}
										className={`${positionClass} flex`}
									>
										<PostCard
											post={post}
											categories={categories}
											featured={index === 0}
										/>
									</div>
								);
							})}
						</div>
						
						{viewMoreButton && hasMore && (
							<div className="flex justify-center mt-8">
								<button
									onClick={handleViewMore}
									className="px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors"
								>
									Ver mas
								</button>
							</div>
						)}
						
						<ScriptClient />
					</div>
				)}
			</>
		);
	}

	// Featured layout for Editor's Picks
	if (layout === "featured") {
		return (
			<>
				{posts && categories && (
					<div className="post-grid @container mb-12">
						{title && (
							<div className="flex items-center gap-2 mb-6">
								<h2 className="text-2xl font-bold">{title}</h2>
								<svg
									className="w-6 h-6 fill-current"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
								</svg>
							</div>
						)}
						
						<div className="relative">
							<div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
								<div className="flex gap-6 pb-4" style={{ scrollSnapType: "x mandatory" }}>
									{displayedPosts?.map((post) => (
										<div
											key={post.slug}
											className="flex-none w-[85%] @md:w-[400px] @lg:w-[450px] @xl:w-[500px]"
											style={{ scrollSnapAlign: "start" }}
										>
											<PostCard
												post={post}
												categories={categories}
												featured={true}
											/>
										</div>
									))}
								</div>
							</div>
							
							{/* Carousel indicators */}
							<div className="flex justify-center gap-2 mt-4">
								{displayedPosts?.map((_, index) => (
									<button
										key={index}
										className={`h-1 rounded-full transition-all ${
											index === 0
												? "w-8 bg-red-600"
												: "w-6 bg-gray-300"
										}`}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>
						</div>
						
						{viewMoreButton && hasMore && (
							<div className="flex justify-center mt-8">
								<button
									onClick={handleViewMore}
									className="px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors"
								>
									Ver mas
								</button>
							</div>
						)}
						
						<ScriptClient />
					</div>
				)}
			</>
		);
	}

	// Default grid layout
	return (
		<>
			{posts && categories && (
				<div className="post-grid mt-6 @container">
					{title && (
						<div className="mb-8">
							<h2 className="text-xl font-bold border-b-4 border-black inline-block pb-2">
								{title}
							</h2>
						</div>
					)}
					<div className="post-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{displayedPosts?.map((post) => (
							<PostCard
								post={post}
								categories={categories}
								key={post.slug}
							/>
						))}
					</div>
					
					{viewMoreButton && hasMore && (
						<div className="flex justify-center mt-8">
							<button
								onClick={handleViewMore}
								className="text-black font-bold text-lg border-b-2 border-black inline-block hover:opacity-70 transition-opacity"
							>
								Ver mas
							</button>
						</div>
					)}
					
					<ScriptClient />
				</div>
			)}
		</>
	);
}