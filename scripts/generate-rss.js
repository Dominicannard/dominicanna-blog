const fs = require('fs');
const path = require('path');
const RSS = require('rss');

// Simplified Reader function for build-time usage (without React cache)
async function createReader() {
  const keystaticConfig = require('../keystatic.config.tsx');

  // Use the local reader for build time (not GitHub reader)
  const { createReader } = require('@keystatic/core/reader');
  return createReader(path.join(process.cwd()), keystaticConfig.default || keystaticConfig);
}

// Simplified sort function (copy from utils)
function sortPostsByPublishDate(posts) {
  return posts?.slice().sort((postA, postB) => {
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

async function generateRssFeed() {

  const site_url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net"
      : "http://localhost:3000";

  const feedOptions = {
    title: "Dominicanna - Dominicanna es la primera revista dominicana dedicada al mundo del cannabis.",
    description: "Dominicanna es la primera revista dominicana dedicada al mundo del cannabis. Información, noticias y cultura sobre la planta Cannabis Sativa L.",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/og_image.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Dominicanna`,
    language: 'es-do',
    webMaster: 'hello.dominicanna@hotmail.com',
    managingEditor: 'hello.dominicanna@hotmail.com',
    ttl: 60,
  };

  const feed = new RSS(feedOptions);

  try {
    // Fetch posts using Keystatic reader
    const Reader = await createReader();
    let posts = await Reader.collections.posts.all();

    // Ensure posts is always an array
    if (!Array.isArray(posts)) {
      posts = [];
    }

    // Sort posts by publish date (newest first)
    posts = sortPostsByPublishDate(posts);

    // Filter out draft posts and limit to recent posts (e.g., last 50)
    const publishedPosts = posts
      .filter(post => !post.entry.draft)
      .slice(0, 50);

    console.log(`Generating RSS feed with ${publishedPosts.length} posts...`);

    // Add each individual post to the feed
    publishedPosts.map((post) => {
      const postUrl = `${site_url}/post/${post.slug}`;
      const publishDate = post.entry.publishDate ? new Date(post.entry.publishDate) : new Date();
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

    // Write the RSS feed to a file as XML
    const rssXml = feed.xml({ indent: true });
    const outputPath = path.join(process.cwd(), 'public', 'rss.xml');

    fs.writeFileSync(outputPath, rssXml);
    console.log(`RSS feed generated successfully at ${outputPath}`);

  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  }
}

// Run the script
generateRssFeed();
