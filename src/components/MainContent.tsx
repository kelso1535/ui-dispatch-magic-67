
import React, { useState } from 'react';
import DispatchTable from '@/components/DispatchTable';
import LocationBar from '@/components/LocationBar';
import TitleEditor from '@/components/TitleEditor';
import { useUser } from '@/contexts/UserContext';
import { useDispatchRecords } from '@/hooks/useDispatchRecords';

const MainContent: React.FC = () => {
  const [currentLocation] = useState('Panorama Dr, Grand Senora Desert');
  const [dispatchTitle, setDispatchTitle] = useState("STATE GOV OF VICTORIA ESTA - CAD");
  const { currentUser } = useUser();
  const { records, handleAttachToCall, handleDetachFromCall } = useDispatchRecords();

  return (
    <div className="relative z-10 flex flex-col flex-1 max-w-[1600px] w-full mx-auto my-4 rounded-lg overflow-hidden glass-panel blue-glow">
      {/* Header is moved to the Index component */}
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col">
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
        
        {/* Footer location bar */}
        <LocationBar location={currentLocation} />
      </div>
    </div>
  );
};

export default MainContent;
