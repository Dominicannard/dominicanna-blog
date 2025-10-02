import React from "react";
import PostGrid from "../Post/PostGrid";

export default function LatestPost({
	posts,
	categories
}: {
	posts: any[];
	categories: any[];
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
				title="Lo Más Reciente"
				viewMoreButton={true}
				viewMoreLimit={9}
			/>
		</div>
	);
}
