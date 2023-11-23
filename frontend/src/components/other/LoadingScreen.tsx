// LoadingScreen.js
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-opacity-60 bg-gradient-to-r from-zinc-600 via-zinc-700 to-neutral-800 absolute" style={{zIndex:100}}>
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-purple-300 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-200"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-400"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-600"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-800"></div>
        </div>
      </div>
      <div className="text-xl font-semibold ml-4 text-white">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
