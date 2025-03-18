
import React from 'react';
import DispatchTable from '@/components/DispatchTable';
import { useUser } from '@/contexts/UserContext';
import { DispatchRecord } from '@/components/DispatchTable';
import { useFiveMBridge } from '@/utils/fivemBridge';

interface MainContentProps {
  records?: DispatchRecord[];
}

const MainContent: React.FC<MainContentProps> = ({ records = [] }) => {
  const { currentUser } = useUser();
  const { respondToCall } = useFiveMBridge();
  
  const handleAttachToCall = (recordId: string, user: { name: string; callsign: string }) => {
    respondToCall(recordId);
  };

  const handleDetachFromCall = (recordId: string) => {
    // This would be handled by FiveM integration
    console.log("Detaching from call", recordId);
  };

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
