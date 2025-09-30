import React from "react";
import { ICategory, IPost } from "@/app/keystatic/interface";
import PostCard from "./PostCard";
import dynamic from "next/dynamic";

const ScriptClient = dynamic(() => import("@/app/components/ScriptClient"), {
	ssr: false,
});

const getCategories = async () => {
	const res = await fetch('/api/posts/category', {
		next: {
			revalidate: 300,
		},
	});
	const categories = await res.json();
	return categories;
};

export default async function PostGrid({
	posts,
	categories,
	size,
	layout = "grid",
	title,
}: {
	posts?: IPost[];
	categories?: ICategory[];
	size?: "sm" | "md" | "lg";
	layout?: "grid" | "featured";
	title?: string;
}) {
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
									{posts.map((post) => (
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
								{posts.map((_, index) => (
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
				<div className="post-grid @container">
					<div className={`post-list grid gap-5 ${gridClass}`}>
						{posts && posts.map((post) => (
							<PostCard
								post={post}
								categories={categories}
								key={post.slug}
							/>
						))}
					</div>
					<ScriptClient />
				</div>
			)}
		</>
	);
}