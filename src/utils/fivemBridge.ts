
import { useEffect, useState } from 'react';
import { DispatchRecord } from '@/components/DispatchTable';
import { useToast } from '@/hooks/use-toast';

// Type definitions for messages from FiveM
type FiveMMessage = {
  type: 'toggleUI' | 'newCall' | 'playSound';
  show?: boolean;
  data?: any;
  sound?: string;
};

// Hook to handle FiveM communication
export const useFiveMBridge = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [records, setRecords] = useState<DispatchRecord[]>([]);
  const { toast } = useToast();

  // Listen for messages from FiveM
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const item: FiveMMessage = event.data;
      
      if (item.type === 'toggleUI') {
        setIsVisible(!!item.show);
      } else if (item.type === 'newCall' && item.data) {
        // Format the data for our React UI
        const callData = item.data;
        const newCall: DispatchRecord = {
          id: callData.id || (records.length + 1).toString(),
          time: callData.time || new Date().toLocaleTimeString('en-US', { hour12: false }),
          from: callData.from || 'Dispatch',
          type: callData.type || 'CALL',
          location: callData.location || 'Unknown',
          details: callData.details || 'No details provided',
          assigned: [],
          statuses: ['GPS'],
          callerPhone: callData.callerPhone
        };

        // Add to our records
        setRecords(prev => [newCall, ...prev]);
        
        // Show notification
        toast({
          title: `New ${newCall.type}`,
          description: newCall.details.substring(0, 100),
          variant: newCall.type === 'EMERGENCY' ? 'destructive' : 'default',
        });
        
      } else if (item.type === 'playSound' && item.sound) {
        playSound(item.sound);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [records, toast]);

  // Function to play sounds
  const playSound = (sound: string) => {
    const audioElement = document.getElementById(`sound-${sound}`) as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(error => console.error('Audio play failed:', error));
    }
  };

  // Send a message back to FiveM
  const sendNUIMessage = (endpoint: string, data: any) => {
    fetch(`https://dispatch-system/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    }).catch(err => console.error('Failed to send NUI message:', err));
  };

  // Close the UI
  const closeUI = () => {
    sendNUIMessage('close', {});
    setIsVisible(false);
  };

  // Set waypoint on the map
  const setWaypoint = (coords: any) => {
    sendNUIMessage('setWaypoint', { coords });
  };

  // Respond to a call
  const respondToCall = (callId: string) => {
    sendNUIMessage('respondToCall', { callId });
    
    // Update local state to show responded
    setRecords(prev => 
      prev.map(record => {
        if (record.id === callId) {
          return {
            ...record,
            statuses: [...new Set([...record.statuses, 'ENROUTE'])]
          };
        }
        return record;
      })
    );
  };

  return {
    isVisible,
    records,
    closeUI,
    setWaypoint,
    respondToCall,
  };
};
