"use client";
import React, { useState } from "react";
import Link from "next/link";

interface MenuItem {
	menu: string;
	url: string | null;
}

interface MobileNavProps {
	menuItems: MenuItem[];
}

export default function MobileNav({ menuItems }: MobileNavProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="md:hidden">
			<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="black"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
					/>
				</svg>
			</button>
			{isMenuOpen && (
				<div className="absolute top-13 left-0 w-full bg-white shadow-md">
					<ul className="nav menu flex flex-col items-center list-none gap-4 text-xl font-heading py-4">
						{menuItems.map((item, index) => (
							<li key={index}>
								<Link className="menu-item text-gray-700 hover:text-sky-600" href={item.url || "/"}>
									{item.menu}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
