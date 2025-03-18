
import React, { useState, useEffect } from 'react';
import UrgentAssistanceNotification from './UrgentAssistanceNotification';
import { useToast } from '@/hooks/use-toast';

// Define the notification types
interface NotificationType {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  details: string[];
  coordinates?: string;
  isUrgentBackup?: boolean;
}

const BackgroundEffects: React.FC = () => {
  const [showUrgentAssistance, setShowUrgentAssistance] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<NotificationType>({
    id: '539.1',
    title: 'URGENT ASSISTANCE',
    subtitle: 'UPDATED INCIDENT',
    location: 'Senora Fwy Grand Senora Desert',
    details: [
      'assistance - LOC OF CIR 753 Cnr Senora Fwy and Senora Way',
      '[UPD][44412]: [PRI-1] URG BACKUP @ CIR 701 Senora Fwy'
    ],
    coordinates: 'Senora Fwy Grand Senora Desert',
    isUrgentBackup: true
  });
  const { toast } = useToast();

  // Sample notifications (one urgent backup and one regular)
  const notifications: NotificationType[] = [
    {
      id: '539.1',
      title: 'URGENT ASSISTANCE',
      subtitle: 'UPDATED INCIDENT',
      location: 'Senora Fwy Grand Senora Desert',
      details: [
        'assistance - LOC OF CIR 753 Cnr Senora Fwy and Senora Way',
        '[UPD][44412]: [PRI-1] URG BACKUP @ CIR 701 Senora Fwy'
      ],
      coordinates: 'Senora Fwy Grand Senora Desert',
      isUrgentBackup: true
    },
    {
      id: '542',
      title: 'CODE 3',
      subtitle: 'UNIT BACKUP',
      location: 'Vinewood Park Dr, Vinewood Hills',
      details: [
        'assistance - LOC OF RCH 209 Vinewood Park Dr',
        'Vinewood Park Dr, Vinewood Hills'
      ],
      coordinates: 'Vinewood Park Dr, Vinewood Hills',
      isUrgentBackup: false
    }
  ];

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

    // Switch between notifications for demo purposes
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const nextNotification = notifications[Math.floor(Math.random() * notifications.length)];
        setCurrentNotification(nextNotification);
        if (showUrgentAssistance) {
          playAlertSound();
        }
      }
    }, 15000); // Every 15 seconds

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
      clearInterval(notificationInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showUrgentAssistance, toast]);

  const handleWaypoint = () => {
    setShowUrgentAssistance(false);
  };

  const handleNotificationClick = () => {
    // The same as pressing E - toggle the notification
    setShowUrgentAssistance(false);
    
    toast({
      title: "Notification Cleared",
      description: `Call #${currentNotification.id} removed from view`,
      variant: "default",
    });
  };

  return (
    <>
      {/* Very transparent dark background to improve readability without blocking view */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Urgent assistance notification */}
      <UrgentAssistanceNotification
        {...currentNotification}
        isVisible={showUrgentAssistance}
        onWaypoint={handleWaypoint}
        onDismiss={() => setShowUrgentAssistance(false)}
        onClick={handleNotificationClick}
      />
    </>
  );
};

export default BackgroundEffects;
