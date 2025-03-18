
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'GPS' | 'ENROUTE' | 'ARRIVED' | '10-8';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'GPS':
        return 'bg-dispatch-highlight/20 text-dispatch-highlight border-dispatch-highlight/40';
      case 'ENROUTE':
        return 'bg-dispatch-accent/20 text-dispatch-accent border-dispatch-accent/40';
      case 'ARRIVED':
        return 'bg-dispatch-success/20 text-dispatch-success border-dispatch-success/40';
      case '10-8':
        return 'bg-dispatch-warning/20 text-dispatch-warning border-dispatch-warning/40';
      default:
        return 'bg-dispatch-muted/20 text-dispatch-muted border-dispatch-muted/40';
    }
  };

  return (
    <div className="status-badge-container">
      <div
        className={cn(
          'text-xs font-semibold px-2 py-0.5 rounded border w-16 text-center',
          getStatusStyles(),
          className
        )}
      >
        {status}
      </div>
    </div>
  );
};

export default StatusBadge;
