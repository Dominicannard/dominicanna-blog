import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { Reader } from "../keystatic/utils";
import MobileNav from "./MobileNav";

interface MenuItem {
	menu: string;
	url: string | null;
}

export default async function Header() {
	const menuLink = await Reader().singletons.menuLinks.read();
	const menuItems: readonly MenuItem[] = menuLink?.items || [];

	return (
		<header className="header w-full bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="container m-auto px-4 h-14 flex justify-between items-center">
				<div className="logo flex items-center">
					<Link className="flex items-center" href="/">
						<span className="text-2xl font-bold text-black">
							<Image src="/dom-logo.png" alt="" width={50} height={100} style={{ position: 'relative', left: '-12px' }} />
						</span> 
					</Link>
				</div>
				<nav className="hidden md:flex flex-1 justify-center">
					{menuItems.length > 0 && (
						<ul className="nav menu flex list-none gap-8 text-sm font-medium">
							{menuItems.map((item: MenuItem, index: number) => (
								<li key={index}>
									<Link
										className="menu-item text-gray-900 hover:text-gray-600 transition-colors"
										href={item?.url || "/"}
									>
										{item.menu}
									</Link>
								</li>
							))}
						</ul>
					)}
				</nav>
				<div className="flex items-center gap-4">
					<Link className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors" href={`/keystatic`}>
						<svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</Link>
					<button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
						<svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
					<div className="md:hidden">
						<MobileNav menuItems={[...menuItems]} />
					</div>
				</div>
			</div>
		</header>
	);
}
