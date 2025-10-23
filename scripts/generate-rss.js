const fs = require('fs');
const path = require('path');

async function fetchRssFromAPI() {
  // Use the RSS API route to get the RSS feed
  const site_url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net"
      : "http://localhost:3000";

  const apiUrl = `${site_url}/api/rss`;

  console.log('Getting RSS feed: ', apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rssXml = await response.text();
    return rssXml;
  } catch (error) {
    console.error('Error fetching RSS from API:', error);
    return null;
  }
}

async function generateRssFeed() {
  try {
    // Fetch RSS feed from the API route
    const rssXml = await fetchRssFromAPI();

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
