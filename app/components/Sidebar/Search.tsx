"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reader } from "@/app/keystatic/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
	//const allPosts = await Reader().collections.posts.all();
	//const searchPosts = allPosts.filter((post) => post.entry.content.toString().includes(query));

	const searchParams = useSearchParams();
	const query = searchParams.get("query") || "";

	// const getPosts = (slug: string) => {
	// 	//const posts = allPosts.filter((post) => post.entry.categories.includes(slug));
	// 	const posts = allPosts.filter((post) => post.entry.content.toString().includes(query));
	// 	return posts.length;
	// };

	//const [resultsPosts, setResultsPosts] = useState<any[]>([]);
	const router = useRouter();

	const [searchText, setSearchText] = useState("");

	// const getPosts = async (query: string) => {
	// 	const allPosts = await Reader().collections.posts.all();
	// 	const searchPosts = allPosts.filter((post) => post.entry.content.toString().includes(query));
	// 	setResultsPosts(searchPosts);
	// };

	const refSearch = useRef(null);

	useEffect(() => {
		if (query) setSearchText(query);
	}, [query]);

	const handleSearch = () => {
		console.log(searchText);
		const link = refSearch.current;

		//router.push(`/post/search?query=${searchText}`);
	};

	const handleEnterPress = (event: any) => {
		if (event.key === "Enter") {
			router.push(`/post/search?query=${searchText}`);
		}
	};

	return (
		<div className="w-full max-w-2xl font-sans"> {/* Main container */}
			{/* Header */}
			<div className="mb-2 mt-4 flex items-start"> {/* Header container */}
				<div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div> {/* Vertical bar */}
				<div className="bg-black px-6 py-2"> {/* Title box */}
					<h2 className="text-white text-md font-bold tracking-wide">Search</h2> {/* Title text */}
				</div>
			</div>

			{/* Content area for search input and button */}
			<div className=""> {/* Inherit py-5 from block-content */}
				<div className="form-horizontal w-full justify-between flex gap-2 items-center">
					<input
						type="text"
						placeholder="Search..."
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						onKeyDown={handleEnterPress}
						className="px-3 py-2 border-b-2 border-black w-full flex flex-1"
					/>

					<Link
						id="Search"
						ref={refSearch}
						className="p-5 py-2 flex !text-white rounded-xl !no-underline bg-black hover:opacity-70"
						href={`/post/search?query=${searchText}`}
					>
						Search
					</Link>
				</div>
			</div>
		</div>
	);
}
