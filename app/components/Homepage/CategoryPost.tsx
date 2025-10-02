import React from "react";
import PostGrid from "../Post/PostGrid";

export default function CategoryPost({
	posts,
	categories,
	title
}: {
	posts: any[];
	categories: any[];
	title: string;
}) {
	// Remove non-serializable content field from posts
	const serializablePosts = posts.map(post => ({
		slug: post.slug,
		entry: {
			...post.entry,
			content: undefined
		}
	}));

	return (
		<div className="container">
			<PostGrid
				posts={serializablePosts}
				categories={categories}
				layout="grid"
				title={title}
				viewMoreButton={true}
				viewMoreLimit={3}
			/>
		</div>
	);
}
