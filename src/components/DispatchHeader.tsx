
import React from 'react';
import { cn } from '@/lib/utils';

interface DispatchHeaderProps {
  title: string;
  className?: string;
}

const DispatchHeader: React.FC<DispatchHeaderProps> = ({ title, className }) => {
  return (
    <div className={cn('w-full px-6 py-3 glass-panel flex items-center justify-between', className)}>
      <h1 className="text-sm font-mono uppercase tracking-wider text-white/80">
        {title}
      </h1>
      <div className="flex items-center space-x-3">
        <span className="text-xs text-white/60 font-mono">
          {new Date().toLocaleTimeString()}
        </span>
        <button className="px-3 py-1 text-xs rounded bg-dispatch-muted/30 hover:bg-dispatch-muted/50 text-white/80 transition-colors duration-200">
          Restore
        </button>
      </div>
    </div>
  );
};

export default DispatchHeader;
