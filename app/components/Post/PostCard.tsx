import { ICategory, IPost } from "@/app/keystatic/interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryTags from "./CategoryTags";

export default function PostCard({
	post,
	categories,
	size,
	featured = false,
}: {
	post: IPost;
	categories?: ICategory[];
	size?: "sm" | "md" | "lg";
	featured?: boolean;
}) {
	let textSize = "text-md";

	switch (size) {
		case "sm":
			textSize = "text-sm";
			break;
		case "lg":
			textSize = "xl:text-xl";
			break;
	}

	// Get the first category for display
	const primaryCategory = post.entry.categories && post.entry.categories.length > 0
		? categories?.find(cat => cat.slug === post.entry.categories[0])
		: null;

	return (
		<article key={post.slug} className="post-card group h-full" id={post.slug}>
			<Link 
				href={`/post/${post.slug}`}
				className="flex flex-col h-full"
			>
				{/* Image Container with Category Badge */}
				<div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
					{post.entry?.heroImage ? (
						<Image
							width={800}
							height={600}
							src={post.entry?.heroImage}
							alt={post.entry?.title}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
							<span className="text-2xl text-gray-500 font-medium px-4 text-center">
								{post.entry.title}
							</span>
						</div>
					)}
					
					{/* Category Badge - positioned in bottom right corner */}
					{post.entry?.categories && post.entry?.categories.length > 0 && (
						<div className="absolute bottom-2 left-2 bg-black bg-opacity-80 text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase">
							{post.entry?.categories[0]}
						</div>
					)}
				</div>

				{/* Content Section */}
				<div className="flex-1 flex flex-col p-5 bg-white">
					{/* Title */}
					<h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
						{post.entry.title}
					</h3>

					{/* Author info */}
					{post.entry?.authors && post.entry.authors.length > 0 && ( // Check for authors array and if it's not empty
						<p className="text-sm text-red-500 mb-6">
							Por {post.entry.authors.length === 1 ? post.entry.authors[0] : `${post.entry.authors[0]} y otros`}
						</p>
					)}

					{/* Excerpt/Description */}
					{post.entry.summary && (
						<p className="text-gray-700 text-sm line-clamp-2 leading-relaxed flex-1">
							{post.entry.summary?.length > 100
						? post.entry.summary.slice(0, 99) + "..."
						: post.entry.summary}
						</p>
					)}
				</div>
			</Link>
		</article>
	);
}