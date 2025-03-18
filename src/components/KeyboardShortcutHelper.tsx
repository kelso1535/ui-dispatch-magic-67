
import React, { useState, useEffect } from 'react';
import { Keyboard, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KeyBindingsSettings from './KeyBindingsSettings';
import { useKeyBindings } from '@/contexts/KeyBindingsContext';

const KeyboardShortcutHelper: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { keyBindings } = useKeyBindings();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // Hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm z-50 backdrop-blur-sm border border-white/10">
        <Keyboard className="h-4 w-4" />
        <span>
          Press <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">{keyBindings.urgentBackup.key.toUpperCase()}</kbd> for urgent assistance,
          <kbd className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">{keyBindings.locationShare.key.toUpperCase()}</kbd> to share location
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 ml-2"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-3 w-3" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
      
      <KeyBindingsSettings 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  );
};

export default KeyboardShortcutHelper;
