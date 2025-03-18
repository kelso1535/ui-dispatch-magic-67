
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Very transparent dark background to improve readability without blocking view */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm" />
    </>
  );
};

export default BackgroundEffects;
