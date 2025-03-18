
import React, { useState, useEffect } from 'react';
import UrgentAssistanceNotification from './UrgentAssistanceNotification';
import { useToast } from '@/hooks/use-toast';
import { useKeyBindings, AlertType } from '@/contexts/KeyBindingsContext';
import { useUser } from '@/contexts/UserContext';

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
  const { keyBindings, triggerAlert } = useKeyBindings();
  const { currentUser } = useUser();

  // Sample notifications (urgent backup and regular)
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
    },
    {
      id: '544',
      title: 'OFFICER LOCATION',
      subtitle: 'PURSUIT IN PROGRESS',
      location: 'Strawberry Ave, Davis',
      details: [
        'Officer sharing location during pursuit',
        'Heading northbound on Strawberry Ave'
      ],
      coordinates: 'Strawberry Ave, Davis',
      isUrgentBackup: false
    },
    {
      id: '547',
      title: 'DURESS SIGNAL',
      subtitle: 'OFFICER IN DANGER',
      location: 'Mission Row Police Station',
      details: [
        'EMERGENCY - Officer activated duress signal',
        'Immediate assistance required'
      ],
      coordinates: 'Mission Row Police Station',
      isUrgentBackup: true
    }
  ];

  // Generate a location-sharing notification with the current user
  const generateLocationNotification = (): NotificationType => {
    return {
      id: (540 + Math.floor(Math.random() * 100)).toString(),
      title: 'LOCATION SHARED',
      subtitle: currentUser ? `OFFICER ${currentUser.callsign}` : 'OFFICER LOCATION',
      location: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
      details: [
        currentUser ? 
          `${currentUser.name} (${currentUser.callsign}) shared their location` :
          'Officer shared their location',
        'Units requested to respond'
      ],
      coordinates: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
      isUrgentBackup: false
    };
  };
  
  // Create alert notification based on type
  const createAlertNotification = (type: AlertType): NotificationType => {
    switch (type) {
      case 'duress':
        return {
          id: (540 + Math.floor(Math.random() * 100)).toString(),
          title: 'DURESS SIGNAL',
          subtitle: 'OFFICER IN DANGER',
          location: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          details: [
            'EMERGENCY - Officer activated duress signal',
            'Immediate assistance required'
          ],
          coordinates: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          isUrgentBackup: true
        };
        
      case 'urgentBackup':
        return {
          id: (540 + Math.floor(Math.random() * 100)).toString(),
          title: 'URGENT ASSISTANCE',
          subtitle: 'CODE 3 RESPONSE',
          location: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          details: [
            'Officer requires urgent backup',
            'All available units respond code 3'
          ],
          coordinates: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          isUrgentBackup: true
        };
        
      case 'generalBackup':
        return {
          id: (540 + Math.floor(Math.random() * 100)).toString(),
          title: 'BACKUP REQUESTED',
          subtitle: 'ADDITIONAL UNITS',
          location: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          details: [
            'Officer requesting backup',
            'Additional units needed'
          ],
          coordinates: ['Downtown LS', 'Vinewood', 'Sandy Shores', 'Paleto Bay'][Math.floor(Math.random() * 4)],
          isUrgentBackup: false
        };
        
      case 'locationShare':
      default:
        return generateLocationNotification();
    }
  };

  // Handle key bindings for alerts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      // Check for each key binding
      Object.entries(keyBindings).forEach(([type, binding]) => {
        if (key === binding.key.toLowerCase()) {
          const alertType = type as AlertType;
          
          // For urgentBackup, toggle the notification
          if (alertType === 'urgentBackup') {
            setShowUrgentAssistance(prev => !prev);
            if (!showUrgentAssistance) {
              const notification = createAlertNotification(alertType);
              setCurrentNotification(notification);
            }
          } else {
            // For other alerts, show a notification and potentially update the UI
            const notification = createAlertNotification(alertType);
            setCurrentNotification(notification);
            if (!showUrgentAssistance) {
              setShowUrgentAssistance(true);
            }
          }
          
          // Trigger the appropriate alert
          triggerAlert(alertType);
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [keyBindings, showUrgentAssistance, triggerAlert]);

  // Simulate new urgent assistance calls
  useEffect(() => {
    // Show initial assistance after a delay
    const initialTimer = setTimeout(() => {
      setShowUrgentAssistance(true);
      triggerAlert('urgentBackup');
      
      toast({
        title: "Urgent Assistance Required",
        description: "Officer needs backup at Senora Fwy",
        variant: "destructive",
      });
    }, 5000);

    // Switch between notifications for demo purposes
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.5 && showUrgentAssistance) {
        const nextNotification = notifications[Math.floor(Math.random() * notifications.length)];
        setCurrentNotification(nextNotification);
        triggerAlert(nextNotification.isUrgentBackup ? 'urgentBackup' : 'generalBackup');
      }
    }, 15000); // Every 15 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(notificationInterval);
    };
  }, [showUrgentAssistance, toast, triggerAlert]);

  return (
    <>
      {/* Very transparent dark background to improve readability without blocking view */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Urgent assistance notification */}
      <UrgentAssistanceNotification
        {...currentNotification}
        isVisible={showUrgentAssistance}
      />
    </>
  );
};

export default BackgroundEffects;
