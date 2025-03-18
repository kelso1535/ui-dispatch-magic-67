
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Completely transparent background */}
      <div className="absolute inset-0 z-0 bg-transparent" />
    </>
  );
};

export default BackgroundEffects;
