import React from "react";
import { Reader } from "@/app/keystatic/utils";
import Image from "next/image";
import Link from "next/link";

export default async function AuthorsPage() {
	const authors = await Reader().collections.authors.all();

	return (
		<div className="authors-page w-full p-3 lg:p-5 @container">
			<h1 className="page-title text-2xl lg:text-4xl font-heading text-center">
				Nuestros Autores
			</h1>
			<p className="text-center mb-8 mt-4 text-gray-500">
				Dominicanna es hogar de un equipo diverso de escritores y creadores de contenido apasionados por el mundo del cannabis.
			</p>
			<div className="authors-grid w-full m-auto mb-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{authors
					.filter((author) => author.entry.name) // Filter out authors without names if any
					.map((author) => (
						<div
							key={author.slug}
							className="author-card bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
						>
							<Link href={`/author/${author.slug}`}>
								{author.entry.avatar && (
									<div className="avatar-container mb-4">
										<Image
											src={author.entry.avatar}
											alt={author.entry.name || "Autor"}
											width={100}
											height={100}
											className="w-24 h-24 rounded-full mx-auto object-cover"
										/>
									</div>
								)}
								<h2 className="author-name text-xl font-semibold text-center mb-2">
									{author.entry.name}
								</h2>
							</Link>
							<div className="showcase-links text-sm text-gray-600">
								{author.entry.showcase && author.entry.showcase.length > 0 && (
									<ul className="flex justify-center gap-3 mt-4">
										{author.entry.showcase.map((item, index) => (
											<li key={index}>
												{item.discriminant === "youtubeVideoId" ? (
													<a
														href={`https://www.youtube.com/watch?v=${item.value as string}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:text-blue-600"
													>
														YouTube
													</a>
												) : item.discriminant === "link" ? (
													<a
														href={(item.value as unknown as { label: string; url: string }).url}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:text-blue-600"
													>
														{(item.value as unknown as { label: string; url: string }).label}
													</a>
												) : null}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
