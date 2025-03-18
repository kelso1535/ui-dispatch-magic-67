
import React, { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertType, KeyBinding, useKeyBindings } from '@/contexts/KeyBindingsContext';
import { Keyboard, Volume2, VolumeX } from 'lucide-react';

interface KeyBindingsSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KeyBindingsSettings: React.FC<KeyBindingsSettingsProps> = ({
  open,
  onOpenChange
}) => {
  const { 
    keyBindings, 
    updateKeyBinding, 
    resetKeyBindings,
    soundEnabled,
    toggleSound
  } = useKeyBindings();
  
  const [editingType, setEditingType] = useState<AlertType | null>(null);
  const [listeningForKey, setListeningForKey] = useState(false);
  const keyListenerRef = useRef<(e: KeyboardEvent) => void | null>(null);
  
  useEffect(() => {
    // Clean up event listener when component unmounts
    return () => {
      if (keyListenerRef.current) {
        window.removeEventListener('keydown', keyListenerRef.current);
      }
    };
  }, []);
  
  const startListening = (type: AlertType) => {
    setEditingType(type);
    setListeningForKey(true);
    
    // Remove any existing listener
    if (keyListenerRef.current) {
      window.removeEventListener('keydown', keyListenerRef.current);
    }
    
    // Create new listener
    const keyListener = (e: KeyboardEvent) => {
      e.preventDefault();
      
      // Don't capture modifier keys on their own
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) {
        return;
      }
      
      // Use key from event, normalized to lowercase
      const key = e.key.toLowerCase();
      updateKeyBinding(type, key);
      
      // Clean up
      setListeningForKey(false);
      setEditingType(null);
      window.removeEventListener('keydown', keyListener);
    };
    
    keyListenerRef.current = keyListener;
    window.addEventListener('keydown', keyListener);
  };
  
  const cancelListening = () => {
    if (keyListenerRef.current) {
      window.removeEventListener('keydown', keyListenerRef.current);
    }
    setListeningForKey(false);
    setEditingType(null);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Customize key bindings for emergency alerts and actions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {Object.entries(keyBindings).map(([type, binding]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">{binding.description}</div>
                <div className="text-xs text-muted-foreground">
                  Currently: 
                  <kbd className="ml-2 bg-muted px-2 py-0.5 rounded text-xs font-mono">
                    {binding.key.toUpperCase()}
                  </kbd>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => startListening(type as AlertType)}
                disabled={listeningForKey}
                className={editingType === type ? "ring-2 ring-primary" : ""}
              >
                {editingType === type ? "Press a key..." : "Change"}
              </Button>
            </div>
          ))}
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="text-sm font-medium">Sound Alerts</div>
              <div className="text-xs text-muted-foreground">
                Enable sound notifications
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <Switch checked={soundEnabled} onCheckedChange={toggleSound} />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          {listeningForKey && (
            <Button variant="outline" onClick={cancelListening}>
              Cancel
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={resetKeyBindings}>
              Reset to Defaults
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KeyBindingsSettings;
