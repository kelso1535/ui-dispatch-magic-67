
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Background effect */}
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{
          backgroundImage: 'url(/lovable-uploads/9aeb6cd7-cf5f-4447-a467-96f5b9141f65.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)'
        }}
      />
      
      {/* Status dots at top */}
      <div className="absolute top-4 right-4 z-20 flex space-x-3">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-subtle" />
        <div className="w-3 h-3 rounded-full bg-dispatch-muted" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse-subtle" />
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse-subtle" />
      </div>
    </>
  );
};

export default BackgroundEffects;
