
import React, { useState, useEffect } from 'react';
import UrgentAssistanceNotification from './UrgentAssistanceNotification';
import { useToast } from '@/hooks/use-toast';

const BackgroundEffects: React.FC = () => {
  const [showUrgentAssistance, setShowUrgentAssistance] = useState(false);
  const [urgentAssistanceData, setUrgentAssistanceData] = useState({
    id: '539.1',
    title: 'URGENT ASSISTANCE',
    subtitle: 'UPDATED INCIDENT',
    location: 'Senora Fwy Grand Senora Desert',
    details: [
      'assistance - LOC OF CIR 753 Cnr Senora Fwy and Senora Way',
      '[UPD][44412]: [PRI-1] URG BACKUP @ CIR 701 Senora Fwy'
    ],
    coordinates: 'Senora Fwy Grand Senora Desert'
  });
  const { toast } = useToast();

  // Simulate new urgent assistance calls
  useEffect(() => {
    // Show initial assistance after a delay
    const initialTimer = setTimeout(() => {
      setShowUrgentAssistance(true);
      playAlertSound();
      
      toast({
        title: "Urgent Assistance Required",
        description: "Officer needs backup at Senora Fwy",
        variant: "destructive",
      });
    }, 5000);

    // Function to play alert sound
    const playAlertSound = () => {
      try {
        const audio = new Audio('/alert.mp3'); // You would need to add this audio file
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      } catch (error) {
        console.log('Audio not supported');
      }
    };

    // Simulate keypresses to show/hide assistance (for demo purposes)
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'e' || event.key === 'E') {
        setShowUrgentAssistance(prev => !prev);
        if (!showUrgentAssistance) {
          playAlertSound();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showUrgentAssistance, toast]);

  const handleWaypoint = () => {
    setShowUrgentAssistance(false);
  };

  return (
    <>
      {/* Very transparent dark background to improve readability without blocking view */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Urgent assistance notification */}
      <UrgentAssistanceNotification
        {...urgentAssistanceData}
        isVisible={showUrgentAssistance}
        onWaypoint={handleWaypoint}
        onDismiss={() => setShowUrgentAssistance(false)}
      />
    </>
  );
};

export default BackgroundEffects;
