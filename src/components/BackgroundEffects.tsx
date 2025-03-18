
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Background effect */}
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{
          backgroundImage: 'url(/lovable-uploads/45b96a74-abb3-4cff-86ac-a453be1785d2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)'
        }}
      />
    </>
  );
};

export default BackgroundEffects;
