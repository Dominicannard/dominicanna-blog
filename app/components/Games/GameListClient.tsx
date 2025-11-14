'use client';

import React, { useState } from 'react';
import GameItem from './GameItem'; // Assuming GameItem is in the same directory

// Define a type for the game object
interface Game {
  slug: string;
  entry: {
    title: string;
    description: string;
    icon: string;
    embedUrl?: string;
  };
}

interface GameListClientProps {
  initialGames: Game[]; // Games fetched by the server component
}

export default function GameListClient({ initialGames }: GameListClientProps) {
  const [games] = useState<Game[]>(initialGames); // Use initialGames directly
  const [selectedGameEmbedUrl, setSelectedGameEmbedUrl] = useState<string | null>(null);

  const handleGameClick = (embedUrl: string | undefined) => {
    if (embedUrl) {
      setSelectedGameEmbedUrl(embedUrl);
    } else {
      // If a game doesn't have an embedUrl, we might want to navigate to a detail page
      // or show a message. For now, we'll just deselect if no embedUrl is provided.
      setSelectedGameEmbedUrl(null);
    }
  };

  const handleCloseGame = () => {
    setSelectedGameEmbedUrl(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Elige un juego</h1>

      {/* Modal for displaying the game */}
      {selectedGameEmbedUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full h-4/5">
            <button
              onClick={handleCloseGame}
              className="absolute top-0 right-0 m-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="Close game"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <iframe
              src={selectedGameEmbedUrl}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Game list */}
      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameItem
              key={game.slug}
              game={game}
              onClick={handleGameClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No games found.</div>
      )}
    </div>
  );
}
