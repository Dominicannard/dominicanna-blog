import { Reader } from '@/app/keystatic/utils'; // Import the Reader
import GameListClient from '@/app/components/Games/GameListClient'; // Import the new client component

// Define a type for the game object fetched from the API/Reader
// This should align with the structure returned by Reader().collections.games.all()
interface Game {
  slug: string; // Keystatic returns a slug
  entry: {
    title: string;
    description: string;
    icon: string; // Using emoji as icon for now
    embedUrl?: string; // Optional embedUrl for games that can be embedded directly
  };
}

// Server component to fetch and display games
export default async function GamesPage() {
  let games: Game[] = [];
  let error: string | null = null;

  try {
    // Initialize the Keystatic reader
    const reader = Reader();
    // Get all games from the 'games' collection
    const gamesData = await reader.collections.games.all();

    // Ensure gamesData is an array, default to empty array if not
    if (Array.isArray(gamesData)) {
      games = gamesData.map((game) => ({
        slug: game.slug,
        entry: {
          title: game.entry.title,
          description: game.entry.description,
          icon: game.entry.icon,
          embedUrl: game.entry.embedUrl,
        },
      }));
    } else {
      // Handle cases where gamesData might not be an array as expected
      error = 'Invalid data format received for games.';
      console.error('Invalid gamesData format:', gamesData);
    }
  } catch (e: any) {
    console.error('Error fetching games:', e.message);
    error = 'An error occurred while loading games.';
  }

  console.log('games_ ', games);
  
  return (
    <div className="container mx-auto p-8">
      {/* Pass the fetched games data to the client component */}
      <GameListClient initialGames={games} />
      {error && <div className="text-center text-red-500 mt-8">{error}</div>}
    </div>
  );
}
