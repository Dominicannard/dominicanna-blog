"use client";
import React, { useEffect, useState } from "react";
import PostGrid from "../Post/PostGrid";
import { IPost, ICategory } from "@/app/keystatic/interface";
import { Loading } from "./FeaturedPost";

export default function LatestPost() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				
				// Fetch posts
				const apiUrl = "/";  
				const postsRes = await fetch(`${apiUrl}api/posts`);
				const postsData = await postsRes.json();
				
				// Fetch categories
				const categoriesRes = await fetch(`${apiUrl}api/posts/category`);
				const categoriesData = await categoriesRes.json();
				
				setPosts(postsData);
				setCategories(categoriesData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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
				title="Lo Más Reciente"
				viewMoreButton={true}
				viewMoreLimit={9}
			/>
		</div>
	);
}