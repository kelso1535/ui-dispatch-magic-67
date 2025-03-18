
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { UserCircle2 } from 'lucide-react';

interface DispatchHeaderProps {
  title: string;
  className?: string;
  currentUser?: { name: string; callsign: string } | null;
  onLogin?: (user: { name: string; callsign: string }) => void;
}

const DispatchHeader: React.FC<DispatchHeaderProps> = ({ 
  title, 
  className,
  currentUser,
  onLogin
}) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && callsign && onLogin) {
      onLogin({ name, callsign });
      setShowLoginForm(false);
    }
  };

  return (
    <div className={cn('w-full px-6 py-3 glass-panel flex items-center justify-between', className)}>
      <h1 className="text-sm font-mono uppercase tracking-wider text-white/80">
        {title}
      </h1>
      <div className="flex items-center space-x-3">
        <span className="text-xs text-white/60 font-mono">
          {new Date().toLocaleTimeString()}
        </span>
        
        {!currentUser ? (
          <button 
            onClick={() => setShowLoginForm(!showLoginForm)}
            className="px-3 py-1 text-xs rounded bg-dispatch-highlight/30 hover:bg-dispatch-highlight/50 text-white/80 transition-colors duration-200 flex items-center"
          >
            <UserCircle2 size={14} className="mr-1" />
            Login
          </button>
        ) : (
          <div className="px-3 py-1 text-xs rounded bg-dispatch-success/20 text-dispatch-success border border-dispatch-success/30">
            {currentUser.name} - {currentUser.callsign}
          </div>
        )}
        
        <button className="px-3 py-1 text-xs rounded bg-dispatch-muted/30 hover:bg-dispatch-muted/50 text-white/80 transition-colors duration-200">
          Restore
        </button>
      </div>
      
      {/* Login form popup */}
      {showLoginForm && (
        <div className="absolute top-16 right-6 glass-panel p-4 rounded-md z-30 blue-glow">
          <form onSubmit={handleLogin} className="flex flex-col space-y-3">
            <div>
              <label className="text-xs text-white/60 block mb-1">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dispatch-darker/70 border border-white/10 rounded px-2 py-1 text-sm text-white"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Callsign</label>
              <input 
                type="text" 
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                className="w-full bg-dispatch-darker/70 border border-white/10 rounded px-2 py-1 text-sm text-white"
                placeholder="[EN]"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="px-3 py-1 text-xs rounded bg-dispatch-muted/30 hover:bg-dispatch-muted/50 text-white/80 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-3 py-1 text-xs rounded bg-dispatch-accent/30 hover:bg-dispatch-accent/50 text-dispatch-accent transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DispatchHeader;
