
import React, { useEffect } from 'react';
import DispatchHeader from '@/components/DispatchHeader';
import MainContent from '@/components/MainContent';
import BackgroundEffects from '@/components/BackgroundEffects';
import KeyboardShortcutHelper from '@/components/KeyboardShortcutHelper';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { KeyBindingsProvider } from '@/contexts/KeyBindingsContext';
import { useFiveMBridge } from '@/utils/fivemBridge';

// Audio elements for sounds
const AudioElements = () => (
  <>
    <audio id="sound-emergency" src="sounds/emergency.mp3" preload="auto"></audio>
    <audio id="sound-duress" src="sounds/duress.mp3" preload="auto"></audio>
    <audio id="sound-backup" src="sounds/backup.mp3" preload="auto"></audio>
    <audio id="sound-location" src="sounds/location.mp3" preload="auto"></audio>
  </>
);

const IndexContent: React.FC = () => {
  const { currentUser, handleUserLogin } = useUser();
  const { isVisible, records, closeUI } = useFiveMBridge();
  
  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        closeUI();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, closeUI]);
  
  if (!isVisible) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-transparent relative overflow-hidden animate-fade-in">
      {/* Background and status indicators */}
      <BackgroundEffects />
      
      {/* Audio elements */}
      <AudioElements />
      
      {/* Content container with glass effect - now floating over screen */}
      <div className="absolute inset-0 z-10 flex flex-col">
        <div className="flex-1 max-w-[90%] w-full mx-auto mt-16 mb-16 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10">
          {/* Header */}
          <DispatchHeader 
            currentUser={currentUser}
            onLogin={handleUserLogin}
            onClose={closeUI}
          />
          
          <MainContent records={records} />
        </div>
      </div>
      
      {/* Keyboard shortcut helper */}
      <KeyboardShortcutHelper />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <UserProvider>
      <KeyBindingsProvider>
        <IndexContent />
      </KeyBindingsProvider>
    </UserProvider>
  );
};

export default Index;
