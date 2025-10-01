import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { IPost, ICategory, IPostResolved } from "@/app/keystatic/interface";
import { createGitHubReader } from '@keystatic/core/reader/github';

import { cache } from 'react';
import { cookies, draftMode, headers } from 'next/headers';

// Helper to determine if we are in a static generation context.
// This is a heuristic. If 'headers()' or 'cookies()' are not available, it's likely static generation.
const isStaticGeneration = () => {
	try {
		// Attempt to access functions that are only available in a request scope.
		// If they throw, we are likely in a static generation context.
		headers();
		cookies();
		return false; // If no error, we are in a request scope.
	} catch (e) {
		// If headers() or cookies() throws, assume static generation context.
		return true;
	}
};

export const Reader = cache(() => {
	// --- Static Generation Context ---
	// If in static generation context, always use GitHub reader with the production branch.
	// This avoids calling draftMode() or cookies() which are not available during SSG.
	if (isStaticGeneration()) {
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			ref: 'master', // Assuming 'master' is the production branch for published content.
			token: undefined, // No token needed for reading published content from the main branch.
		});
	}

	// --- Runtime Context ---
	// If not in static generation, we are in a runtime context (API route, server component at runtime).
	// Here, we can safely use draftMode() and cookies().
	let isDraftModeEnabled = false;
	let branch: string | undefined = undefined;

	try {
		isDraftModeEnabled = draftMode().isEnabled;
		branch = cookies().get('ks-branch')?.value;
	} catch (e) {
		// This catch is a safeguard for unexpected runtime issues, though isStaticGeneration() should prevent SSG issues.
		console.warn("Unexpected error accessing draftMode or cookies in runtime context. Assuming not in draft mode.", e);
		isDraftModeEnabled = false; // Default to not in draft mode if error occurs.
	}

	if (isDraftModeEnabled && branch) {
		// Draft mode enabled and branch cookie found: use specific branch from cookie.
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			ref: branch,
			token: cookies().get('keystatic-gh-access-token')?.value,
		});
	} else {
		// Not in draft mode (production/published content) OR draft mode is enabled but no branch cookie found.
		// In both these cases, use the GitHub reader with the default production branch ('master').
		// This ensures content is read from the main branch on Vercel when not in draft mode,
		// and also handles the case where draft mode is on but the branch cookie is missing.
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			ref: 'master', // Assuming 'master' is the production branch.
			token: undefined, // No token needed for reading published content from the main branch.
		});
	}
});

// export const Reader = createReader(process.cwd(), keystaticConfig); // This line is commented out and should not be used in production.

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
