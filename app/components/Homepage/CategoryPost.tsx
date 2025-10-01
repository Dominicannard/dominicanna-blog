"use client";
import React, { useEffect, useState } from "react";
import PostGrid from "../Post/PostGrid";
import { IPost, ICategory } from "@/app/keystatic/interface";
import { Loading } from "./FeaturedPost";

export default function CategoryPost({ categorySlug }: { categorySlug: string }) {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [categoryTitle, setCategoryTitle] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				
				// Fetch posts
				const postsRes = await fetch('/api/posts');
				const postsData = await postsRes.json();
				
				// Fetch categories
				const categoriesRes = await fetch('/api/posts/category');
				let categoriesData = await categoriesRes.json();

				// Ensure categoriesData is always an array, default to empty array if not
				if (!Array.isArray(categoriesData)) {
					categoriesData = [];
				}
				
				// Filter posts by category slug (posts can have multiple categories)
				const filteredPosts = postsData?.filter((post: IPost) => 
					post.entry.categories && post.entry.categories.includes(categorySlug)
				);
				
				// Find category name for title
				const category = categoriesData?.find((cat: ICategory) => 
					cat.slug === categorySlug
				);

				setPosts(filteredPosts);
				setCategories(categoriesData);
				setCategoryTitle(category?.entry?.category || categorySlug);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [categorySlug]);

	if (loading) {
		return (
			<Loading />
		);
	}

	return (
		<div className="container">
			<PostGrid
				posts={posts}
				categories={categories}
				layout="grid"
				title={categoryTitle}
				viewMoreButton={true}
				viewMoreLimit={3}
			/>
		</div>
	);
}
