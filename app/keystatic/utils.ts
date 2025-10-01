import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { IPost, ICategory, IPostResolved } from "@/app/keystatic/interface";
import { createGitHubReader } from '@keystatic/core/reader/github';

import { cache } from 'react';
import { cookies, draftMode } from 'next/headers';

export const Reader = cache(() => {
	let isDraftModeEnabled = false;
	// draftMode throws in e.g. generateStaticParams
	try {
		isDraftModeEnabled = draftMode().isEnabled;
	} catch {}

	const branch = cookies().get('ks-branch')?.value;

	if (isDraftModeEnabled && branch) {
		// Draft mode enabled and branch cookie found: use specific branch from cookie
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			ref: branch,
			token: cookies().get('keystatic-gh-access-token')?.value,
		});
	} else if (!isDraftModeEnabled) {
		// Not in draft mode (production/published content): use default branch (e.g., 'main')
		// This ensures content is read from the main branch on Vercel when not in draft mode.
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			ref: 'master', // Assuming 'main' is the production branch
			token: undefined, // No token needed for reading published content
		});
	} else {
		// Draft mode enabled but no branch cookie found: this is an unexpected state for production.
		// Log a warning and default to reading from the 'main' branch.
		console.warn("Draft mode enabled but 'ks-branch' cookie not found. Defaulting to 'main' branch for content reading.");
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			ref: 'master', // Default to 'main' branch
			token: cookies().get('keystatic-gh-access-token')?.value, // Token might still be useful if draft mode is on
		});
	}
});

// export const Reader = createReader(process.cwd(), keystaticConfig);

export const sortPostsByPublishDate = <T extends IPost | IPostResolved>(posts: T[]): T[] => {
	return posts.slice().sort((postA: T, postB: T) => {
		// Handle cases where publishDate is missing
		if (!postA.entry.publishDate) {
			return 1; // Move posts without publishDate to the end
		}
		if (!postB.entry.publishDate) {
			return -1;
		}

		// Convert dates to comparable values
		const dateA = new Date(postA.entry.publishDate);
		const dateB = new Date(postB.entry.publishDate);

		// Compare dates and return sort order
		return dateB.getTime() - dateA.getTime();
	});
};

export const getCategoryBySlug = async (slug: string) => {
	const categories = await Reader().collections.categories.all();

	const category: ICategory[] = categories.filter((c: ICategory) => c.slug === slug);
	if (category.length > 0) {
		return category[0];
	}

	return null;
};

// Helper function for display time elapsed since post date
export const formatTimeAgo = (dateString: string): string => {
	try {
		const postDate = new Date(dateString);
		const now = new Date();
		const diffInHours = Math.floor(
			(now.getTime() - postDate.getTime()) / (1000 * 60 * 60)
		);

		if (diffInHours < 24) {
			return `${diffInHours} hours ago`;
		} else if (diffInHours < 24 * 30) {
			const diffInDays = Math.floor(diffInHours / 24);
			return `${diffInDays} days ago`;
		} else {
			return postDate.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		}
	} catch (e) {
		// Fallback for invalid date strings
		return "N/A";
	}
};
