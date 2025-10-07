import PostGridServer from "@/app/components/Post/PostGridServer";
import { ICategory } from "@/app/keystatic/interface";
import { Reader, getCategoryBySlug, sortPostsByPublishDate } from "@/app/keystatic/utils";
import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const category = await Reader().collections.categories.read(params.slug);

	if (!category) {
		return {
			title: "Categoría no encontrada - Dominicanna",
		};
	}

	return {
		title: `${category.category} - Dominicanna`,
		description: category.description || `Publicaciones sobre ${category.category} en Dominicanna`,
		alternates: {
			canonical: `/post/category/${params.slug}`,
		},
	};
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;

	if (!slug) notFound();

	const categories = await Reader().collections.categories.all();
	const category = await Reader().collections.categories.read(slug);
	const allPosts = await Reader().collections.posts.all();
	const posts = sortPostsByPublishDate(allPosts);
	const categoryPosts = posts.filter((post) => post.entry.categories.includes(slug));

	return (
		<div className="category-page w-full">
			<h1 className="page-title text-gradient">
				<span>{category?.category}</span>
			</h1>
			<div className="post-category">
				<p className="text-xl text-center">
					{category?.description || "Publicaciones sobre " + category?.category}
				</p>
			</div>
			<div className="post-container mt-8">
				<PostGridServer posts={categoryPosts} categories={categories} size="lg" />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const slugs = await Reader().collections.categories.list();

	return slugs.map((slug) => ({ slug: slug }));
}
