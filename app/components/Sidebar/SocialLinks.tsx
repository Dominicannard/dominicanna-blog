import React from "react";
import Link from "next/link";
import { Reader } from "@/app/keystatic/utils";

export default async function SocialLinks() {
	const socialLinks = await Reader().singletons.socialLinks.read();

	return (
		<div className="w-full max-w-2xl font-sans"> {/* Mimic Categories.tsx outer div */}
			{/* Header */}
			<div className="mb-2 mt-4 flex items-start"> {/* Matching mb-2 from Categories.tsx */}
				<div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div> {/* Vertical bar */}
				<div className="bg-black px-6 py-2"> {/* Title box */}
					<h2 className="text-white text-md font-bold tracking-wide">Social Links</h2> {/* Title text */}
				</div>
			</div>

			{/* Social Links List */}
			{socialLinks && (
				<div className=""> {/* Mimic Categories.tsx content area container */}
					{socialLinks.twitter && (
						<div className="flex items-center justify-between py-1">
							<Link
								href={`https://twitter.com/${socialLinks.twitter}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity"
							>
								Twitter
							</Link>
						</div>
					)}
					{socialLinks.instagram && (
						<div className="flex items-center justify-between py-1">
							<Link
								href={`https://instagram.com/${socialLinks.instagram}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity"
							>
								Instagram
							</Link>
						</div>
					)}
					{socialLinks.facebook && (
						<div className="flex items-center justify-between py-1">
							<Link
								href={`https://facebook.com/${socialLinks.facebook}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity"
							>
								Facebook
							</Link>
						</div>
					)}
					{socialLinks.mail && (
						<div className="flex items-center justify-between py-1">
							<Link
								href={`mailto:${socialLinks.mail}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity"
							>
								Mail
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
