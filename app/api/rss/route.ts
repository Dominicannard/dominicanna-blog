import { NextRequest, NextResponse } from "next/server";
import RSS from "rss";

async function fetchPostsFromAPI() {
  // Use localhost in development, production URL otherwise
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseUrl = isDevelopment ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net");
  const apiUrl = `${baseUrl}/api/posts`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts from API:', error);
    return [];
  }
}

// Simplified sort function
function sortPostsByPublishDate(posts: any[]) {
  return posts?.slice().sort((postA: any, postB: any) => {
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
}

export async function GET(request: NextRequest) {
  try {
    // Fetch posts using the existing API route
    let posts = await fetchPostsFromAPI();

    // Ensure posts is always an array
    if (!Array.isArray(posts)) {
      posts = [];
    }

    // Sort posts by publish date (newest first)
    posts = sortPostsByPublishDate(posts);

    // Filter out draft posts and limit to recent posts (e.g., last 50)
    const publishedPosts = posts
      .filter((post: any) => !post.entry.draft)
      .slice(0, 50);

    console.log(`RSS: After filtering drafts, ${publishedPosts.length} published posts`);

    // Site metadata
    const siteTitle = "Dominicanna - Dominicanna es la primera revista dominicana dedicada al mundo del cannabis.";
    const siteDescription = "Dominicanna es la primera revista dominicana dedicada al mundo del cannabis. Información, noticias y cultura sobre la planta Cannabis Sativa L.";
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net";
    const currentDate = new Date();

    // Create RSS feed using the RSS library
    const feed = new RSS({
      title: siteTitle,
      description: siteDescription,
      site_url: siteUrl,
      feed_url: `${siteUrl}/api/rss`,
      image_url: `${siteUrl}/og_image.png`,
      pubDate: currentDate,
      copyright: `All rights reserved ${new Date().getFullYear()}, Dominicanna`,
      language: 'es-do',
      webMaster: 'hello.dominicanna@hotmail.com',
      managingEditor: 'hello.dominicanna@hotmail.com',
      ttl: 60,
    });

    // Add each post to the feed
    publishedPosts.forEach((post: any) => {
      const postUrl = `${siteUrl}/post/${post.slug}`;
      const publishDate = post.entry.publishDate ? new Date(post.entry.publishDate) : currentDate;
      const description = post.entry.summary || '';

      feed.item({
        title: post.entry.title,
        description: description,
        url: postUrl,
        guid: postUrl,
        date: publishDate,
        categories: post.entry.categories ? Array.from(post.entry.categories) : [],
        author: post.entry.authors ? Array.from(post.entry.authors).join(', ') : '',
      });
    });

    // Generate RSS XML
    const rssXml = feed.xml({ indent: true });

    // Return RSS feed with proper headers
    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error: any) {
    console.error('RSS generation error:', error);
    return NextResponse.json(
      { error: `An error occurred generating RSS feed: ${error.message}` },
      { status: 500 }
    );
  }
}
