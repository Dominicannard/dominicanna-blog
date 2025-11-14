'use client';

import React from 'react';

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

interface GameItemProps {
  game: Game;
  onClick: (embedUrl: string | undefined) => void;
}

export default function GameItem({ game, onClick }: GameItemProps) {
  return (
    <div
      key={game.slug} // Use slug as a unique key
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onClick(game.entry.embedUrl)}
    >
      <span className="text-5xl mb-4">{game.entry.icon}</span>
      <h2 className="text-2xl font-semibold mb-2">{game.entry.title}</h2>
      <p className="text-gray-600 text-center">{game.entry.description}</p>
      {/* The actual opening logic will be in the parent component */}
    </div>
  );
}
