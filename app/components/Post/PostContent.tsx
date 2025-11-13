"use client";

import { DocumentRenderer } from "@keystatic/core/renderer";
import React, { useEffect, useState } from "react"; // Import useState
import ShowcaseYoutube from "./ShowcaseYoutube";
import Image from "next/image";

import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default function PostContent({ postContent }: { postContent: any }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImageUrl, setSelectedImageUrl] = useState("");

	useEffect(() => {
		hljs.highlightAll();
	}, [postContent]);

	const openImageModal = (src: string) => {
		setSelectedImageUrl(src);
		setIsModalOpen(true);
	};

	const closeImageModal = () => {
		setIsModalOpen(false);
		setSelectedImageUrl("");
	};

	return (
		<div className="post-content max-w-4xl m-auto">
			<DocumentRenderer
				document={postContent}
				renderers={{
					block: {
						image: (props: any) => {
							return (
								<figure
									className="m-auto max-h-[800px] w-auto rounded-md cursor-pointer" // Added cursor-pointer
									onClick={() => openImageModal(props.src)} // Added onClick handler
								>
									<Image
										src={props.src}
										width={props.width || 900}
										height={props.height || 640}
										alt={props.alt || "Title"}
										unoptimized={true}
										className={props.classes}
									/>

									{props.alt && (
										<figcaption
											className="!mt-0 text-center p-2"
											dangerouslySetInnerHTML={{
												__html: props.alt,
											}}
										/>
									)}
								</figure>
							);
						},
					},
				}}
				componentBlocks={{
					"youtube-video": (props) => <ShowcaseYoutube videoId={props.youtubeVideoId} />,
				}}
			/>

			{/* Modal for full-screen image view */}
			{isModalOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
					onClick={closeImageModal} // Close modal when clicking outside the image
				>
					<div className="relative max-w-5xl max-h-screen" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking on image content */}
						<button
							className="absolute top-0 right-0 m-4 text-white text-3xl font-bold z-50"
							onClick={closeImageModal}
						>
							&times;
						</button>
						{/* Modified Image component for modal */}
						<Image
							src={selectedImageUrl}
							alt="Full screen view"
							width={900} // Use default width or original width if available
							height={640} // Use default height or original height if available
							unoptimized={true}
							className="block mx-auto max-w-full max-h-[85vh]" // Ensure image is centered and fits within modal bounds
						/>
					</div>
				</div>
			)}
		</div>
	);
}
