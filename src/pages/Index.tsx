
import React from 'react';
import DispatchHeader from '@/components/DispatchHeader';
import MainContent from '@/components/MainContent';
import BackgroundEffects from '@/components/BackgroundEffects';
import { UserProvider, useUser } from '@/contexts/UserContext';

const IndexContent: React.FC = () => {
  const { currentUser, handleUserLogin } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-dispatch-dark relative overflow-hidden animate-fade-in">
      {/* Background and status indicators */}
      <BackgroundEffects />
      
      {/* Content container with glass effect */}
      <div className="relative z-10 flex flex-col flex-1 max-w-[1600px] w-full mx-auto my-4 rounded-lg overflow-hidden glass-panel blue-glow">
        {/* Header */}
        <DispatchHeader 
          title="STATE GOV OF VICTORIA ESTA - CAD"
          currentUser={currentUser}
          onLogin={handleUserLogin}
        />
        
        <MainContent />
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <UserProvider>
      <IndexContent />
    </UserProvider>
  );
};

export default Index;
