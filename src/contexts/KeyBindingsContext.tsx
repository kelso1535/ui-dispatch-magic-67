
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export type AlertType = 'duress' | 'urgentBackup' | 'generalBackup' | 'locationShare';

export type KeyBinding = {
  key: string;
  label: string;
  description: string;
};

export type KeyBindingsMap = {
  [key in AlertType]: KeyBinding;
};

const DEFAULT_KEY_BINDINGS: KeyBindingsMap = {
  duress: { 
    key: 'd', 
    label: 'D',
    description: 'Duress Signal - Officer in immediate danger'
  },
  urgentBackup: { 
    key: 'e', 
    label: 'E',
    description: 'Urgent Backup - Code 3 response needed' 
  },
  generalBackup: { 
    key: 'b', 
    label: 'B',
    description: 'General Backup - Requesting additional units'
  },
  locationShare: { 
    key: 'end', 
    label: 'End',
    description: 'Share Location - Broadcast current position'
  },
};

type KeyBindingsContextType = {
  keyBindings: KeyBindingsMap;
  updateKeyBinding: (type: AlertType, key: string) => void;
  resetKeyBindings: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  triggerAlert: (type: AlertType) => void;
};

const KeyBindingsContext = createContext<KeyBindingsContextType | undefined>(undefined);

export const KeyBindingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keyBindings, setKeyBindings] = useState<KeyBindingsMap>(() => {
    const savedBindings = localStorage.getItem('keyBindings');
    return savedBindings ? JSON.parse(savedBindings) : DEFAULT_KEY_BINDINGS;
  });
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const savedSoundSetting = localStorage.getItem('soundEnabled');
    return savedSoundSetting ? JSON.parse(savedSoundSetting) : true;
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('keyBindings', JSON.stringify(keyBindings));
  }, [keyBindings]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Function to play sound based on alert type
  const playAlertSound = (type: AlertType) => {
    if (!soundEnabled) return;
    
    let soundFile;
    switch (type) {
      case 'duress':
        soundFile = '/duress-alert.mp3';
        break;
      case 'urgentBackup':
        soundFile = '/urgent-backup.mp3';
        break;
      case 'generalBackup':
        soundFile = '/backup-alert.mp3';
        break;
      case 'locationShare':
        soundFile = '/location-share.mp3';
        break;
    }
    
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const updateKeyBinding = (type: AlertType, key: string) => {
    // Ensure we don't have duplicate key bindings
    const isKeyUsed = Object.entries(keyBindings).some(
      ([bindingType, binding]) => bindingType !== type && binding.key === key
    );
    
    if (isKeyUsed) {
      toast({
        title: "Key Already Assigned",
        description: "This key is already used for another action",
        variant: "destructive",
      });
      return;
    }
    
    setKeyBindings(prev => {
      const updated = { 
        ...prev,
        [type]: { 
          ...prev[type], 
          key 
        }
      };
      
      toast({
        title: "Key Binding Updated",
        description: `${keyBindings[type].description} is now bound to ${key.toUpperCase()}`,
      });
      
      return updated;
    });
  };

  const resetKeyBindings = () => {
    setKeyBindings(DEFAULT_KEY_BINDINGS);
    toast({
      title: "Key Bindings Reset",
      description: "All key bindings have been reset to defaults",
    });
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    toast({
      title: "Sound Alerts",
      description: !soundEnabled ? "Sound alerts enabled" : "Sound alerts disabled",
    });
  };
  
  const triggerAlert = (type: AlertType) => {
    playAlertSound(type);
    
    const alertInfo = {
      duress: {
        title: "OFFICER IN DISTRESS",
        message: "Immediate assistance required",
        variant: "destructive" as const
      },
      urgentBackup: {
        title: "URGENT BACKUP REQUESTED",
        message: "Code 3 response needed",
        variant: "destructive" as const
      },
      generalBackup: {
        title: "Backup Requested",
        message: "Additional units needed",
        variant: "default" as const
      },
      locationShare: {
        title: "Location Shared",
        message: "Current position has been broadcast",
        variant: "default" as const
      }
    };
    
    toast({
      title: alertInfo[type].title,
      description: alertInfo[type].message,
      variant: alertInfo[type].variant,
    });
  };

  return (
    <KeyBindingsContext.Provider 
      value={{ 
        keyBindings, 
        updateKeyBinding, 
        resetKeyBindings,
        soundEnabled,
        toggleSound,
        triggerAlert
      }}
    >
      {children}
    </KeyBindingsContext.Provider>
  );
};

export const useKeyBindings = () => {
  const context = useContext(KeyBindingsContext);
  if (!context) {
    throw new Error('useKeyBindings must be used within a KeyBindingsProvider');
  }
  return context;
};
