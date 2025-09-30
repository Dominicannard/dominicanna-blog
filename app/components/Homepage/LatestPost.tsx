// "use client";
import React from "react";
import PostGrid from "../Post/PostGrid";
import { IPost } from "@/app/keystatic/interface";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";

export default async function LatestPost() {
	const posts = await Reader().collections.posts.all();
	const sortedPosts = sortPostsByPublishDate(posts);
	const lastPosts = sortedPosts.slice(0, 6);

	const latestPost: IPost[] = lastPosts.map((post, index) => ({
		...post,
		index: index + 1,
	}));

	const categories = await Reader().collections.categories.all();

	return (
		<div>
			<h2 className="text-xl lg:text-3xl font-semibold my-10">Latest Posts</h2>
			<PostGrid posts={latestPost} categories={categories} />
		</div>
	);
}
