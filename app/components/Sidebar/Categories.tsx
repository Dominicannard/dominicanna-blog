import React from "react";
import Link from "next/link";
// import { ICategory } from "@/app/keystatic/interface";
import { Reader } from "@/app/keystatic/utils";

export default async function Categories() {
	const categories = await Reader().collections.categories.all();
	const allPosts = await Reader().collections.posts.all();

	const getPosts = (slug: string) => {
		const posts = allPosts.filter((post) => post.entry.categories.includes(slug));
		return posts.length;
	};

	return (
		<div className="w-full max-w-2xl font-sans"> {/* Main container */}
			{/* Header */}
			<div className="mb-2 mt-4 flex items-start"> {/* Header container */}
				<div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div> {/* Vertical bar */}
				<div className="bg-black px-6 py-2"> {/* Title box */}
					<h2 className="text-white text-md font-bold tracking-wide">Categories</h2> {/* Title text */}
				</div>
			</div>

			{/* Content area for categories */}
			<div className=""> {/* Inherit py-5 from block-content */}
				{categories.map((category, index) => (
					<div key={index} className="flex items-center justify-between py-1">
						<Link
							className="text-sm font-bold hover:opacity-70 transition-opacity"
							href={`/post/category/${category.slug}`}
						>
							{category.entry.category}
						</Link>
						<span className="count ml-2 text-sm" style={{ color: category.entry.customColor }}>
							({getPosts(category.slug)})
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
