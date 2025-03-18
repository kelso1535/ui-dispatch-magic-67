
import { useState, useEffect } from 'react';
import { DispatchRecord } from '@/components/DispatchTable';
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
    statuses: ['GPS'],
    callerPhone: '555-0123'
  },
  {
    id: '403',
    time: '21:44:34',
    from: 'Dispatch',
    type: 'CALL',
    location: 'El Rancho Blvd El Burro Heights',
    details: 'Possible Fire Reported. ALERT STRUCT BUILDING FIRE - Elysian Fields Fwy, El Burro Heights',
    assigned: [],
    statuses: ['GPS'],
    callerPhone: '555-0124'
  },
  {
    id: '405',
    time: '21:48:01',
    from: 'Dispatch',
    type: 'ALERT',
    location: 'Olympic Fwy Downtown',
    details: 'Vehicle accident with injuries. Multiple vehicles involved. Possible entrapment.',
    assigned: [],
    statuses: ['GPS'],
    callerPhone: '555-2468'
  },
  {
    id: '407',
    time: '21:52:12',
    from: '911',
    type: 'EMERGENCY',
    location: 'Vespucci Beach',
    details: 'Water rescue - swimmer in distress approximately 100 yards offshore. Caller states victim is struggling to stay above water.',
    assigned: [],
    statuses: ['GPS'],
    callerPhone: '555-7890'
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

export type User = {
  name: string;
  callsign: string;
};

export const useDispatchRecords = () => {
  const [records, setRecords] = useState<DispatchRecord[]>([]);
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
          statuses: ['GPS'],
          callerPhone: Math.random() > 0.3 ? `555-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` : undefined
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

  const handleAttachToCall = (recordId: string, user: User) => {
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

  const handleDetachFromCall = (recordId: string, user: User) => {
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

  return {
    records,
    handleAttachToCall,
    handleDetachFromCall
  };
};
