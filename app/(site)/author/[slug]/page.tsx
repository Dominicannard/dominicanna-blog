import { notFound } from "next/navigation";
import React from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import Image from "next/image";
import { Reader } from "@/app/keystatic/utils";
import PostGridServer from "@/app/components/Post/PostGridServer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const author = await Reader().collections.authors.read(params.slug);

	if (!author) {
		return {
			title: "Autor no encontrado - Dominicanna",
		};
	}

	return {
		title: `${author.name} - Dominicanna`,
		description: author.introduce || `Conoce más sobre ${author.name}, autor en Dominicanna`,
		alternates: {
			canonical: `/author/${params.slug}`,
		},
	};
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
	const { slug } = params;
	if (!slug) {
		notFound();
	}

	const author = await Reader().collections.authors.read(slug);

	if (!author) notFound();
	const allPosts = await Reader().collections.posts.all();
	const categories = await Reader().collections.categories.all();
	const authorPosts = allPosts.filter((post) => post.entry.authors.includes(slug));

	return (
		<div className="my-10 flex gap-5 flex-col px-4">
			<div className="@container m-auto bg-white p-6 md:p-10 w-full rounded-lg shadow-lg max-w-7xl border border-gray-100">
				<div className="flex gap-8 flex-col @3xl:flex-row @3xl:gap-12 items-start">
					<div className="author-image w-full @3xl:w-auto flex-shrink-0">
						<Image
							src={author?.avatar || "/images/avatar.jpg"}
							alt={`Avatar for ${author?.name}`}
							width={300}
							height={300}
							className="rounded-xl overflow-hidden aspect-square object-cover w-80 h-80 border-4 border-gray-100 shadow-md"
						/>
					</div>
					<div className="content w-full flex-col flex flex-1 min-w-0">
						<h1 className="page-title text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
							{author?.name}
						</h1>

						{author?.introduce && (
							<div className="author-intro mb-8">
								<h2 className="text-xl font-semibold text-gray-800 mb-3">Bio</h2>
								<div className="text-gray-700 text-base leading-relaxed max-w-3xl whitespace-pre-wrap">
									{author.introduce}
								</div>
							</div>
						)}

						{author?.showcase && author?.showcase.length > 0 && (
							<div className="showcase-section mb-8">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">Showcase</h2>
								<div className="showcase-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{author.showcase.map((item, index) => (
										<div key={index} className="showcase-item p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
											{item.discriminant === "link" && (
												<a
													href={item.value.url || undefined}
													target="_blank"
													rel="noopener noreferrer"
													className="block text-blue-600 hover:text-blue-800 font-medium hover:underline"
												>
													{item.value.label}
												</a>
											)}
											{item.discriminant === "youtubeVideoId" && (
												<a
													href={`https://www.youtube.com/watch?v=${item.value}`}
													target="_blank"
													rel="noopener noreferrer"
													className="block text-red-600 hover:text-red-800 font-medium hover:underline"
												>
													YouTube Video
												</a>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{authorPosts.length > 0 && (
					<div className="posts-section my-8 pt-8 border-t border-gray-200">
						<h2 className="text-2xl font-semibold text-gray-900 mb-6">Posts by {author.name || "Author"}</h2>
						<PostGridServer posts={authorPosts} categories={categories} />
					</div>
				)}

				{authorPosts.length === 0 && (
					<div className="empty-posts my-8 pt-8 border-t border-gray-200 text-center">
						<p className="text-gray-600 text-lg">No posts available from this author yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const authorSlugs = await Reader().collections.authors.list();

	return authorSlugs.map((authorSlug) => ({ slug: authorSlug }));
}
