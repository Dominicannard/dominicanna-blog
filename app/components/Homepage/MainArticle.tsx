import { ICategory, IPost } from "@/app/keystatic/interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryTags from "../Post/CategoryTags";

export default function MainArticle({
	post,
	categories,
}: {
	post: IPost;
	categories?: ICategory[];
}) {
	return (
		<div className="main-article">
			<Link href={`/post/${post.slug}`}>
				{post.entry?.heroImage && (
					<Image
						width={1200}
						height={800}
						src={post.entry.heroImage}
						alt={post.entry.title}
						className="rounded-lg"
					/>
				)}
			</Link>
			<div className="article-content mt-4">
				<div className="categories">
					{categories && post.entry.categories && post.entry.categories.length > 0 && (
						<CategoryTags categories={post.entry.categories} allCategory={categories} />
					)}
				</div>
				<Link href={`/post/${post.slug}`}>
					<h2 className="text-3xl font-bold mt-2 hover:text-sky-500">
						{post.entry.title}
					</h2>
				</Link>
				<p className="text-gray-600 mt-2">{post.entry.summary}</p>
				<Link
					href={`/post/${post.slug}`}
					className="text-lg font-semibold text-sky-500 hover:underline mt-4 inline-block"
				>
					Read More
				</Link>
			</div>
		</div>
	);
}
