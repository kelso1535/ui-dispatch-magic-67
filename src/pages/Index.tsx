
import React, { useState, useEffect } from 'react';
import DispatchHeader from '@/components/DispatchHeader';
import DispatchTable, { DispatchRecord } from '@/components/DispatchTable';
import LocationBar from '@/components/LocationBar';

const MOCK_DATA: DispatchRecord[] = [
  {
    id: '398',
    time: '21:37:21',
    from: 'Unknown',
    type: 'Call',
    location: 'Panorama Dr Grand Senora',
    details: 'Possible Fire Reported. ALERT STRUCT BUILDING FIRE. YELLOW JACK, PANORAMA DR, GRAND SENORA DESERT',
    assigned: [
      { name: 'Samuel Gumtree', callsign: '[EN]' },
      { name: 'Leo Kiho', callsign: '[EN]' },
      { name: 'Ryan Booth', callsign: '[EN]' }
    ],
    statuses: ['GPS', 'ENROUTE', 'ARRIVED', '10-8']
  },
  {
    id: '403',
    time: '21:44:34',
    from: 'Unknown',
    type: 'Call',
    location: 'El Rancho Blvd El Burro Heights',
    details: 'Possible Fire Reported. ALERT STRUCT BUILDING FIRE - Elysian Fields Fwy, El Burro Heights',
    assigned: [
      { name: 'Samuel Gumtree', callsign: '[EN]' },
      { name: 'Leo Kiho', callsign: '[EN]' }
    ],
    statuses: ['GPS', 'ENROUTE', 'ARRIVED', '10-8']
  },
];

const Index: React.FC = () => {
  const [records, setRecords] = useState<DispatchRecord[]>([]);
  const [currentLocation, setCurrentLocation] = useState('Panorama Dr, Grand Senora Desert');
  const [currentUser, setCurrentUser] = useState<{ name: string; callsign: string } | null>(null);

  useEffect(() => {
    // Simulate loading data with a subtle animation
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRecords(MOCK_DATA);
    };
    
    loadData();
  }, []);

  const handleUserLogin = (user: { name: string; callsign: string }) => {
    setCurrentUser(user);
    console.log('User logged in:', user);
  };

  const handleAttachToCall = (recordId: string, user: { name: string; callsign: string }) => {
    setRecords(prevRecords => 
      prevRecords.map(record => {
        if (record.id === recordId) {
          // Check if the user is already assigned to avoid duplicates
          const isAlreadyAssigned = record.assigned.some(
            person => person.name === user.name && person.callsign === user.callsign
          );
          
          if (!isAlreadyAssigned) {
            return {
              ...record,
              assigned: [...record.assigned, user]
            };
          }
        }
        return record;
      })
    );
    
    console.log(`User ${user.name} (${user.callsign}) attached to call ${recordId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dispatch-dark relative overflow-hidden animate-fade-in">
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
      
      {/* Content container with glass effect */}
      <div className="relative z-10 flex flex-col flex-1 max-w-[1600px] w-full mx-auto my-4 rounded-lg overflow-hidden glass-panel blue-glow">
        {/* Header */}
        <DispatchHeader 
          title="STATE GOV OF VICTORIA ESTA - CAD" 
          currentUser={currentUser}
          onLogin={handleUserLogin}
        />
        
        {/* Main content area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Table */}
          <div className="flex-1 overflow-y-auto animate-slide-up">
            <DispatchTable 
              records={records} 
              onAttachToCalls={handleAttachToCall}
              currentUser={currentUser || undefined}
            />
          </div>
          
          {/* Footer location bar */}
          <LocationBar location={currentLocation} />
        </div>
      </div>
      
      {/* Status dots at top */}
      <div className="absolute top-4 right-4 z-20 flex space-x-3">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-subtle" />
        <div className="w-3 h-3 rounded-full bg-dispatch-muted" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse-subtle" />
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse-subtle" />
      </div>
    </div>
  );
};

export default Index;
