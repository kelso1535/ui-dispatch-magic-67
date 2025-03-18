
import React, { useState, useEffect } from 'react';
import DispatchHeader from '@/components/DispatchHeader';
import DispatchTable, { DispatchRecord } from '@/components/DispatchTable';
import LocationBar from '@/components/LocationBar';
import { useToast } from '@/hooks/use-toast';

const MOCK_DATA: DispatchRecord[] = [
  {
    id: '398',
    time: '21:37:21',
    from: 'Dispatch',
    type: 'CALL',
    location: 'Panorama Dr Grand Senora',
    details: 'Possible Fire Reported. ALERT STRUCT BUILDING FIRE. YELLOW JACK, PANORAMA DR, GRAND SENORA DESERT',
    assigned: [],
    statuses: ['GPS']
  },
  {
    id: '403',
    time: '21:44:34',
    from: 'Dispatch',
    type: 'CALL',
    location: 'El Rancho Blvd El Burro Heights',
    details: 'Possible Fire Reported. ALERT STRUCT BUILDING FIRE - Elysian Fields Fwy, El Burro Heights',
    assigned: [],
    statuses: ['GPS']
  },
  {
    id: '405',
    time: '21:48:01',
    from: 'Dispatch',
    type: 'ALERT',
    location: 'Olympic Fwy Downtown',
    details: 'Vehicle accident with injuries. Multiple vehicles involved. Possible entrapment.',
    assigned: [],
    statuses: ['GPS']
  },
  {
    id: '407',
    time: '21:52:12',
    from: '911',
    type: 'EMERGENCY',
    location: 'Vespucci Beach',
    details: 'Water rescue - swimmer in distress approximately 100 yards offshore. Caller states victim is struggling to stay above water.',
    assigned: [],
    statuses: ['GPS']
  },
  {
    id: '410',
    time: '22:01:34',
    from: 'Officer',
    type: 'BACKUP',
    location: 'Vinewood Blvd',
    details: 'Request for officer assistance. Suspect attempting to flee on foot after traffic stop.',
    assigned: [],
    statuses: ['GPS', 'URGENT']
  },
];

const Index: React.FC = () => {
  const [records, setRecords] = useState<DispatchRecord[]>([]);
  const [currentLocation, setCurrentLocation] = useState('Panorama Dr, Grand Senora Desert');
  const [currentUser, setCurrentUser] = useState<{ name: string; callsign: string } | null>(null);
  const [dispatchTitle, setDispatchTitle] = useState("STATE GOV OF VICTORIA ESTA - CAD");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data with a subtle animation
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRecords(MOCK_DATA);
    };
    
    loadData();
    
    // Simulate getting occasional new calls
    const newCallInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newCall: DispatchRecord = {
          id: (410 + Math.floor(Math.random() * 100)).toString(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          from: ['Dispatch', '911', 'Officer'][Math.floor(Math.random() * 3)],
          type: ['CALL', 'EMERGENCY', 'ALERT', 'BACKUP'][Math.floor(Math.random() * 4)],
          location: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          details: 'New incident reported. Units requested to respond.',
          assigned: [],
          statuses: ['GPS']
        };
        
        setRecords(prev => [newCall, ...prev]);
        
        toast({
          title: "New Dispatch Call",
          description: `${newCall.type}: ${newCall.location}`,
          variant: "default",
        });
      }
    }, 30000);
    
    return () => clearInterval(newCallInterval);
  }, [toast]);

  const handleUserLogin = (user: { name: string; callsign: string }) => {
    setCurrentUser(user);
    toast({
      title: "Logged In",
      description: `Welcome ${user.name} (${user.callsign})`,
      variant: "default",
    });
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
            toast({
              title: "Attached to Call",
              description: `You are now assigned to call #${recordId}`,
              variant: "default",
            });
            
            return {
              ...record,
              assigned: [...record.assigned, user],
              statuses: [...new Set([...record.statuses, 'ENROUTE'])]
            };
          }
        }
        return record;
      })
    );
  };

  const handleDetachFromCall = (recordId: string, user: { name: string; callsign: string }) => {
    setRecords(prevRecords => 
      prevRecords.map(record => {
        if (record.id === recordId) {
          const updatedAssigned = record.assigned.filter(
            person => person.name !== user.name || person.callsign !== user.callsign
          );
          
          toast({
            title: "Detached from Call",
            description: `You have been removed from call #${recordId}`,
            variant: "default",
          });
          
          return {
            ...record,
            assigned: updatedAssigned
          };
        }
        return record;
      })
    );
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
          title={dispatchTitle} 
          currentUser={currentUser}
          onLogin={handleUserLogin}
        />
        
        {/* Main content area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Title editor */}
          <div className="px-6 py-2 bg-dispatch-darker/50 flex items-center">
            <button 
              onClick={() => {
                const newTitle = prompt("Enter new dispatch title:", dispatchTitle);
                if (newTitle) setDispatchTitle(newTitle);
              }}
              className="text-xs bg-dispatch-muted/30 hover:bg-dispatch-muted/50 text-white/80 px-2 py-1 rounded"
            >
              Edit Title
            </button>
          </div>
          
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
