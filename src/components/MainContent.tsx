
import React, { useEffect } from 'react';
import DispatchTable from '@/components/DispatchTable';
import { useUser } from '@/contexts/UserContext';
import { useDispatchRecords } from '@/hooks/useDispatchRecords';
import audioService from '@/services/AudioService';
import fivemBridge from '@/utils/fivemBridge';

const MainContent: React.FC = () => {
  const { currentUser } = useUser();
  const { records, handleAttachToCall, handleDetachFromCall } = useDispatchRecords();

  // Initialize FiveM bridge when component mounts
  useEffect(() => {
    console.log('Initializing FiveM bridge...');
    fivemBridge.initFivemBridge();
    
    // Set up listener for dispatch calls
    fivemBridge.onMessage((message) => {
      if (message.type === 'dispatch:receiveCall') {
        console.log('Received dispatch call:', message.data);
        
        // Play audio based on call type
        if (message.data.callType === 'emergency') {
          audioService.playDuressAlert();
        } else if (message.data.callType === 'backup') {
          audioService.playBackupAlert();
        } else if (message.data.callType === 'location') {
          audioService.playLocationShare();
        } else if (message.data.callType === 'urgent') {
          audioService.playUrgentBackup();
        }
      }
    });

    // Test audio files after a short delay
    setTimeout(() => {
      console.log('Testing audio playback...');
      audioService.testAllSounds();
    }, 1000);
    
    return () => {
      // Clean up if needed
    };
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
