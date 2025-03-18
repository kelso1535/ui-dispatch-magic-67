
import React, { useState } from 'react';
import DispatchTable from '@/components/DispatchTable';
import TitleEditor from '@/components/TitleEditor';
import { useUser } from '@/contexts/UserContext';
import { useDispatchRecords } from '@/hooks/useDispatchRecords';

const MainContent: React.FC = () => {
  const [dispatchTitle, setDispatchTitle] = useState("STATE GOV OF VICTORIA ESTA - CAD");
  const { currentUser } = useUser();
  const { records, handleAttachToCall, handleDetachFromCall } = useDispatchRecords();

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Title editor */}
      <TitleEditor 
        dispatchTitle={dispatchTitle} 
        setDispatchTitle={setDispatchTitle} 
      />
      
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
