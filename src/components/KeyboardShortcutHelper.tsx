
import React, { useState, useEffect } from 'react';
import { Keyboard, MousePointer } from 'lucide-react';

const KeyboardShortcutHelper: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // Hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm z-50 backdrop-blur-sm border border-white/10">
      <Keyboard className="h-4 w-4" />
      <span>Press <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">E</kbd> to toggle urgent assistance notification</span>
      <span className="mx-2">|</span>
      <MousePointer className="h-4 w-4" />
      <span>Click on notification to dismiss</span>
    </div>
  );
};

export default KeyboardShortcutHelper;
