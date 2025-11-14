import { Reader } from "@/app/keystatic/utils"; // Assuming Reader is here, adjust path if necessary
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Initialize the Keystatic reader
    const reader = Reader();

    // Get all games from the 'games' collection
    const gamesData = await reader.collections.games.all();

    // Ensure gamesData is an array, default to empty array if not
    if (!Array.isArray(gamesData)) {
      return NextResponse.json([], { status: 200 });
    }

    // Map the data to match the expected interface in the client component
    const formattedGames = gamesData.map((game) => ({
      title: game.entry.title,
      description: game.entry.description, // Maps to the 'description' frontmatter field
      icon: game.entry.icon,
      embedUrl: game.entry.embedUrl,
      // game.entry.content (markdown body) is not directly used in the current UI,
      // but is available if needed for future enhancements.
    }));

    return NextResponse.json(formattedGames);
  } catch (error: any) {
    console.error('Error fetching games:', error.message);
    // Return a 500 status code for server errors
    return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
  }
}
