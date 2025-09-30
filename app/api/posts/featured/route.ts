import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const allPosts = await Reader().collections.posts.all();
		const featuredPost = allPosts.filter((post) => post.entry.isFeatured);

		const data = featuredPost.map((post, index) => {
			const { content, ...restEntry } = post.entry; // Exclude 'content' from entry
			return {
				...post,
				entry: restEntry, // Use the entry without 'content'
				index: index + 1,
			};
		});

		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
