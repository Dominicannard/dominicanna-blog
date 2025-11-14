'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'; // Import useState

// Define a type for the game object
interface Game {
  id: number;
  title: string;
  description: string;
  icon: string; // Using emoji as icon for now
  embedUrl?: string; // Optional embedUrl for games that can be embedded directly
}

// Array of games
const games: Game[] = [
  {
    id: 1,
    title: 'Crucigrama sobre Cannabis',
    description: 'Crucigrama sobre cannabis.',
    icon: '📝',
    embedUrl: 'https://www.educaplay.com/game/26639054-crucigrama_sobre_cannabis.html',
  },
  {
    id: 2,
    title: 'Facts sobre Cannabis',
    description: 'Cuestionario de datos sobre el cannabis.',
    icon: '✅',
    embedUrl: 'https://www.educaplay.com/game/26639570-facts_sobre_cannabis_sativa.html',
  },
];

export default function GamesPage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // State to track the selected game

  const handleGameClick = (game: Game) => {
    // If the game has an embedUrl, set it as the selected game to display the iframe
    if (game.embedUrl) {
      setSelectedGame(game);
    } else {
      // For games without embedUrl, you might navigate to a dedicated page or log an action
      console.log(`Navigating to game with ID: ${game.id}`);
      // Example: router.push(`/games/${game.id}`);
    }
  };

  const handleBackToGames = () => {
    setSelectedGame(null); // Clear the selected game to go back to the list
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Elige un juego</h1>
      {selectedGame ? (
        // Display the selected game's iframe
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">{selectedGame.title}</h2>
          <iframe
            allow="fullscreen; autoplay;"
            allowFullScreen
            width="795"
            height="690"
            frameBorder="0"
            src={selectedGame.embedUrl}
          ></iframe>
          <button
            onClick={handleBackToGames}
            className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Games List
          </button>
        </div>
      ) : (
        // Display the list of games
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleGameClick(game)} // Pass the whole game object
            >
              <span className="text-5xl mb-4">{game.icon}</span>
              <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
              <p className="text-gray-600 text-center">{game.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
