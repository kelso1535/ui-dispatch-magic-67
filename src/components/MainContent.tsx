
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
    // Small delay to ensure audio context is ready
    const timer = setTimeout(() => {
      console.log("Testing audio playback...");
      audioService.play('emergency');
    }, 1000);

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
