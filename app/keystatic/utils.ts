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

  if (isDraftModeEnabled) {
    const branch = cookies().get('ks-branch')?.value;

    if (branch) {
      return createGitHubReader(keystaticConfig, {
        // Replace the below with your repo org an name
        repo: 'Dominicannard/dominicanna-blog',
        ref: branch,
        // Assuming an existing GitHub app
        token: cookies().get('keystatic-gh-access-token')?.value,
      });
    }
  }

	/*
	if (process.env.NODE_ENV === 'production'){
		return createGitHubReader(keystaticConfig, {
			repo: 'Dominicannard/dominicanna-blog',
			token: process.env.NEXT_PUBLIC_GITHUB_PAT,
		});
	}
	*/
  // If draft mode is off, use the regular reader
  return createReader(process.cwd(), keystaticConfig);
});

// export const Reader = createReader(process.cwd(), keystaticConfig); // This line is commented out and should not be used in production.

export const sortPostsByPublishDate = <T extends IPost | IPostResolved>(posts: T[]): T[] => {
	return posts?.slice().sort((postA: T, postB: T) => {
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
	let categories = await Reader().collections.categories.all();

	// Ensure categories is always an array, default to empty array if not
	if (!Array.isArray(categories)) {
		categories = [];
	}

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
