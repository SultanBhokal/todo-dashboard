// LoadingScreen.js
import React from 'react';

const LoadingScreen2= () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="relative w-24 h-24">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-4 h-4 bg-purple-300 rounded-full transform -rotate-45 animate-fight-${index + 1}`}
          ></div>
        ))}
      </div>
      <div className="text-xl font-semibold ml-4 text-white">Loading...</div>
    </div>
  );
};

export default LoadingScreen2;
