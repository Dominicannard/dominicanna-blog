import { MetadataRoute } from 'next';
import { Reader } from '@/app/keystatic/utils'; // Import the Reader function
import fs from 'fs';
import path from 'path';

// Helper function to get last modified date from file stats
const getLastModifiedDate = async (filePath: string): Promise<Date | undefined> => {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.mtime;
  } catch (error) {
    console.error(`Error getting stats for ${filePath}:`, error);
    return undefined;
  }
};

// Function to fetch posts using Keystatic Reader
async function fetchPosts(): Promise<MetadataRoute.Sitemap> {
  const reader = await Reader(); // Get the reader instance
  const posts = await reader.collections.posts.all();

  return posts.map((post) => {
    // Keystatic entries usually have a publishDate in their entry object
    // If not, we fall back to the file's last modified date.
    const lastModified = post.entry.publishDate
      ? new Date(post.entry.publishDate)
      : undefined; // Use undefined if publishDate is not available

    // If lastModified is still undefined, try to get it from the file system
    // This might be less reliable if using GitHub reader without specific ref handling for mtime
    // For simplicity, we'll prioritize publishDate from entry.
    // If you need file system mtime for GitHub, more complex logic might be needed.
    const finalLastModified = lastModified || new Date(); // Fallback to current date

    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/post/${post.slug}`,
      lastModified: finalLastModified,
    };
  });
}

// Function to fetch categories using Keystatic Reader
async function fetchCategories(): Promise<MetadataRoute.Sitemap> {
  const reader = await Reader(); // Get the reader instance
  const categories = await reader.collections.categories.all();

  const categorySitemaps = await Promise.all(
    categories.map(async (category) => {
      // Categories in this project seem to be JSON files without a specific publishDate field.
      // We'll use the file's last modified date as a fallback.
      const filePath = path.join(process.cwd(), `app/content/categories/${category.slug}.json`);
      const lastModified = await getLastModifiedDate(filePath); // Await the async operation

      return {
        url: `${process.env.NEXT_PUBLIC_API_URL}/post/category/${category.slug}`, // Using environment variable
        lastModified: lastModified || new Date(), // Fallback to current date if stat fails
      };
    })
  );
  return categorySitemaps;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts();
  const categories = await fetchCategories();

  // Add static routes here
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}`, // Your homepage, using environment variable
      lastModified: new Date(), // Consider fetching actual last modified date for homepage if available
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/sobre-nosotros`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/politicas-privacidad`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/politicas-cookies`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/anuncios`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/mapa-del-sitio`,
      lastModified: new Date(),
    },
  ];

  return [...staticRoutes, ...posts, ...categories];
}
