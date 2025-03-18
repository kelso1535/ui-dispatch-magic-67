
import React, { useEffect } from 'react';
import DispatchTable from '@/components/DispatchTable';
import { useUser } from '@/contexts/UserContext';
import { useDispatchRecords } from '@/hooks/useDispatchRecords';
import audioService from '@/services/AudioService';

const MainContent: React.FC = () => {
  const { currentUser } = useUser();
  const { records, handleAttachToCall, handleDetachFromCall } = useDispatchRecords();

  // Test audio on component mount
  useEffect(() => {
    // Longer delay to ensure audio context is ready
    const timer = setTimeout(() => {
      console.log("Testing audio playback...");
      
      // Create and play a test sound directly to debug
      try {
        const testAudio = new Audio('./urgent-backup.mp3');
        testAudio.volume = 0.5;
        testAudio.play().catch(err => {
          console.info("Direct audio test failed:", JSON.stringify(err));
        });
        
        // Try the service after a small delay
        setTimeout(() => {
          audioService.play('emergency');
        }, 500);
      } catch (error) {
        console.error("Audio initialization error:", error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Table */}
      <div className="flex-1 overflow-y-auto animate-slide-up">
        <DispatchTable 
          records={records} 
          onAttachToCalls={handleAttachToCall}
          onDetachFromCall={handleDetachFromCall}
          currentUser={currentUser || undefined}
        />
      </div>
    </div>
  );
};

export default MainContent;
