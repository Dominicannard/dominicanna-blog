'use client';

import React from 'react';
import Link from 'next/link';
import { ICategory } from '../keystatic/interface';

interface CategoriesMarqueeProps {
	categories: ICategory[];
}

export default function CategoriesMarquee({ categories }: CategoriesMarqueeProps) {
	return (
		<div className="hidden md:block relative overflow-hidden hover:overflow-x-auto bg-red-600 text-white h-8 p-0 m-0 before:absolute before:inset-y-0 before:left-0 before:w-8 before:bg-[linear-gradient(to_right,rgba(220,38,38,1),rgba(220,38,38,0))] before:content-[''] before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-8 after:bg-[linear-gradient(to_left,rgba(220,38,38,1),rgba(220,38,38,0))] after:content-[''] after:z-10">
			<div className="flex animate-marquee whitespace-nowrap justify-center align-middle items-center h-full hover:animate-none">
				{categories.concat(categories).map((category, index) => (
					<Link
						key={index}
						href={`/post/category/${category.slug}`}
						className="alink px-4 py-1 hover:text-white inline-block text-xs"
					>
						{category.entry.category}
					</Link>
				))}
			</div>
		</div>
	);
}
