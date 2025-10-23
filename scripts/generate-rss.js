const fs = require('fs');
const path = require('path');

async function fetchRssFromContent() {
  const RSS = require('rss');
  const matter = require('gray-matter');
  const glob = require('glob');

  try {
    // Get all post files from the content directory
    const postsPath = path.join(process.cwd(), 'app', 'content', 'posts', '*.mdoc');
    const files = glob.sync(postsPath);

    console.log(`Found ${files.length} post files`);

    // Site configuration
    const site_url =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net"
        : "http://localhost:3000";

    const feedOptions = {
      title: "Dominicanna - Dominicanna es la primera revista dominicana dedicada al mundo del cannabis.",
      description: "Dominicanna es la primera revista dominicana dedicada al mundo del cannabis. Información, noticias y cultura sobre la planta Cannabis Sativa L.",
      site_url: site_url,
      feed_url: `${site_url}/api/rss`,
      image_url: `${site_url}/og_image.png`,
      pubDate: new Date(),
      copyright: `All rights reserved ${new Date().getFullYear()}, Dominicanna`,
      language: "es-do",
      webMaster: "hello.dominicanna@hotmail.com",
      managingEditor: "hello.dominicanna@hotmail.com",
      ttl: 60
    };

    const feed = new RSS(feedOptions);

    // Process each post file and collect valid posts
    const validPosts = [];

    for (const file of files) {
      try {
        const fileContent = fs.readFileSync(file, 'utf8');
        const { data, content } = matter(fileContent);

        // Skip draft posts
        if (data.draft) {
          console.log(`Skipping draft post: ${path.basename(file, '.mdoc')}`);
          continue;
        }

        // Extract summary from content (first paragraph or first 200 characters)
        const summary = data.summary || content.split('\n\n')[0].replace(/[#*`_~\[\]]/g, '').substring(0, 200) + '...';

        // Create post URL
        const postUrl = `${site_url}/post/${path.basename(file, '.mdoc')}`;

        // Add to valid posts array
        validPosts.push({
          title: data.title,
          description: summary,
          url: postUrl,
          guid: postUrl,
          date: data.publishDate ? new Date(data.publishDate) : new Date(),
          categories: data.categories || [],
          author: data.authors ? Array.from(data.authors).join(", ") : "",
          publishDate: data.publishDate
        });

      } catch (error) {
        console.error(`Error processing file ${file}:`, error.message);
      }
    }

    // Sort posts by publish date (most recent first)
    validPosts.sort((a, b) => {
      const dateA = a.date.getTime();
      const dateB = b.date.getTime();
      return dateB - dateA; // Descending order (most recent first)
    });

    console.log(`Found ${validPosts.length} published posts after filtering drafts`);

    // Add sorted posts to RSS feed
    validPosts.forEach(post => {
      feed.item({
        title: post.title,
        description: post.description,
        url: post.url,
        guid: post.guid,
        date: post.date,
        categories: post.categories,
        author: post.author
      });
    });

    // Generate RSS XML
    const rssXml = feed.xml({ indent: true });
    return rssXml;

  } catch (error) {
    console.error('Error generating RSS from content:', error);
    return null;
  }
}

async function generateRssFeed() {
  try {
    // Fetch RSS feed from the API route 
    const rssXml = await fetchRssFromContent();

    if (!rssXml) {
      console.error('Failed to fetch RSS feed from API');
      process.exit(1);
    }

    // Write the RSS feed to a file as XML
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
