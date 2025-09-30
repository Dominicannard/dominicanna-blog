import React from "react";
import Link from "next/link";
import { Reader } from "@/app/keystatic/utils";

export default async function SocialLinks() {
	const socialLinks = await Reader().singletons.socialLinks.read();

	return (
		<div className="block">
			<h3 className="block-title">Social Links</h3>
			<div className="block-content">
				{socialLinks && (
					<ul className="flex flex-col">
						{socialLinks.twitter && (
							<li className="py-2">
								<Link
									className="alink"
									href={`#`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Twitter
								</Link>
							</li>
						)}
						{socialLinks.github && (
							<li className="py-2 border-t">
								<Link
									className="alink"
									href={`#`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Github
								</Link>
							</li>
						)}
						{socialLinks.linkedin && (
							<li className="py-2 border-t">
								<Link
									className="alink"
									href={`#`}
									target="_blank"
									rel="noopener noreferrer"
								>
									LinkedIn
								</Link>
							</li>
						)}
						{socialLinks.facebook && (
							<li className="py-2 border-t">
								<Link
									className="alink"
									href={`#`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Faccebook
								</Link>
							</li>
						)}
					</ul>
				)}
			</div>
		</div>
	);
}
