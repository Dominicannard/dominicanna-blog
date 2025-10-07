import { Metadata } from "next";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import PostGridServer from "@/app/components/Post/PostGridServer";

export const metadata: Metadata = {
	title: "Noticias - Dominicanna",
	description: "Todas las noticias y artículos sobre cannabis en República Dominicana. Información actualizada sobre la planta Cannabis Sativa L.",
	alternates: {
		canonical: "/post",
	},
};

export default async function Page() {
	const allPosts = await Reader().collections.posts.all();
	const posts = sortPostsByPublishDate(allPosts);

	const categories = await Reader().collections.categories.all();

	return (
		<div className="posts w-full pb-10">
			<h1 className="page-title text-gradient my-5">Noticias</h1>
			{posts && categories && <PostGridServer posts={posts} categories={categories} size="lg" />}
		</div>
	);
}
