import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	//const { params } = context;
	//console.log(params);

	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("id");

	// console.log(searchParams);

	try {
		const posts = await Reader().collections.posts.all();
		// Filter posts based on search parameters if they were used.
		// For now, we focus on excluding the 'content' function.

		const data = posts.map((post) => {
			const { content: entryContent, ...restEntry } = post.entry; // Exclude 'content' from entry
			const { content, ...restPost } = post; // Exclude 'content' from the post object
			return {
				...restPost, // Spread the post object excluding its 'content' function
				entry: restEntry, // Use the entry without its 'content' function
			};
		});

		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
