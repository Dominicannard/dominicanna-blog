import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RecentPost({ postNumber }: { postNumber: number }) {
	const allPosts = await Reader().collections.posts.all();
	const publishedPosts = allPosts.filter(post => !post.entry.draft);
	const recentPost = sortPostsByPublishDate(publishedPosts)?.slice(0, postNumber);

	return (
		<div className="w-full max-w-2xl font-sans"> {/* Main container */}
			{/* Header */}
			<div className="mb-2 mt-4 flex items-start"> {/* Header container */}
				<div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div> {/* Vertical bar */}
				<div className="bg-black px-6 py-2"> {/* Title box */}
					<h2 className="text-white text-md font-bold tracking-wide">Recent Posts</h2> {/* Title text */}
				</div>
			</div>

			{/* Content area for recent posts */}
			<div className="py-5"> {/* Inherit py-5 from block-content */}
				<div className="post-list flex flex-col gap-3">
					{recentPost.map((post) => (
						<div
							key={post.slug}
							className="post-item flex gap-2 bg-white border-b border-gray-700 hover:bg-gray-200 rounded-sm"
						>
							<Link href={`/post/${post.slug}`} className="post-image">
								<Image
									alt={post.entry.title}
									src={post.entry?.heroImage || "no-image.jpg"}
									width="110"
									height="80"
									className="rounded-sm h-full object-cover overflow-hidden"
								/>
							</Link>
							<div className="post-info flex flex-col flex-1 justify-start gap-1 p-2">
								<Link href={`/post/${post.slug}`} title={post.entry.title}>
									<h4 className="post-title line-clamp-2 text-black">{post.entry.title}</h4>
								</Link>
								<div className="post-date text-sm text-gray-400">
									{post.entry.publishDate}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
