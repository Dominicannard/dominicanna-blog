import React from "react";
import { Instagram, Twitter, Facebook, Youtube, Linkedin, Newspaper, Mail } from "lucide-react";
import Categories from "./Sidebar/Categories";
import { Reader } from "../keystatic/utils";
import Link from "next/link";

export default async function Footer() {
	const menuLinks = await Reader().singletons.menuLinks.read();

	return (
		<footer className="bg-black text-white">
			<div className="container mx-auto px-6 py-6">
				{/* Social Icons - Top Right */}
				<div className="flex justify-end mb-8">
					<div className="flex gap-4 text-white">
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
							<Instagram size={18} />
						</a>
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="Twitter">
							<Twitter size={18} />
						</a>
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="Facebook">
							<Facebook size={18} />
						</a>
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="YouTube">
							<Youtube size={18} />
						</a>
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
							<Linkedin size={18} />
						</a>
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="News">
							<Newspaper size={18} />
						</a>
						<a href="#" className="hover:opacity-70 transition-opacity" aria-label="Email">
							<Mail size={18} />
						</a>
					</div>
				</div>

				{/* Footer Columns */}
				<div className="grid grid-cols-3 gap-12 mb-8">
					{/* Column 1 - Menu Links */}
					<div className="text-sm [&_h3]:hidden [&_ul]:space-y-2 [&_a]:text-white [&_a:hover]:opacity-70">
						{menuLinks && menuLinks.items.length > 0 && (
							<div className="block-content space-y-2 text-sm">
								{menuLinks.items.map((item, index) => (
									<div key={index} className={`category py-2 ${index > 0 ? "" : ""}`}>
										<Link
											className="alink"
											href={item?.url || "/"}
										>
											{item.menu}
										</Link>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Column 2 - Categories */}
					<div className="text-sm [&_h3]:hidden [&_ul]:space-y-2 [&_a]:text-white [&_a:hover]:opacity-70">
						<Categories />
					</div>

					{/* Column 3 - Additional Links (if any) */}
					<div>
						{/* This column can be populated with additional links */}
					</div>
				</div>

				{/* Copyright */}
				<div className="text-right text-xs text-white">
					<p>Copyright © 2025.</p>
					<p>Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}