
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface LocationBarProps {
  location: string;
  className?: string;
}

const LocationBar: React.FC<LocationBarProps> = ({ location, className }) => {
  return (
    <div className={cn('w-full glass-panel flex items-center px-6 py-3', className)}>
      <div className="flex items-center bg-dispatch-darker/70 rounded-l-md px-3 py-2 border-r border-white/10">
        <span className="text-xl font-bold mr-1">SE</span>
      </div>
      <div className="flex flex-col ml-4">
        <div className="flex items-center">
          <MapPin size={14} className="text-dispatch-accent mr-2" />
          <span className="text-sm font-semibold">{location}</span>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <div className="bg-dispatch-darker/70 rounded-full p-1.5">
          <div className="w-6 h-6 rounded-full bg-dispatch-accent flex items-center justify-center pulse-subtle">
            <span className="text-xs font-bold">&#8593;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
