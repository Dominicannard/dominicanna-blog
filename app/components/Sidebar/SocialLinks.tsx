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
						<div className="flex items-center justify-between py-1"> {/* Matching item structure from Categories.tsx */}
							<Link
								href={`https://twitter.com/${socialLinks.twitter}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity" // Matching Link classes from Categories.tsx
							>
								Twitter
							</Link>
							{/* No count equivalent for social links */}
						</div>
					)}
					{socialLinks.github && (
						<div className="flex items-center justify-between py-1">
							<Link
								href={`https://github.com/${socialLinks.github}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity"
							>
								Github
							</Link>
						</div>
					)}
					{socialLinks.linkedin && (
						<div className="flex items-center justify-between py-1">
							<Link
								href={`https://linkedin.com/in/${socialLinks.linkedin}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-bold hover:opacity-70 transition-opacity"
							>
								LinkedIn
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
								Facebook {/* Corrected typo */}
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
