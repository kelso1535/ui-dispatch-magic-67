
import React from 'react';
import DispatchTable from '@/components/DispatchTable';
import { useUser } from '@/contexts/UserContext';
import { useDispatchRecords } from '@/hooks/useDispatchRecords';

const MainContent: React.FC = () => {
  const { currentUser } = useUser();
  const { records, handleAttachToCall, handleDetachFromCall } = useDispatchRecords();

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
