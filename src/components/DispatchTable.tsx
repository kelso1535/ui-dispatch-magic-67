
import React from 'react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { UserPlus } from 'lucide-react';

export interface DispatchRecord {
  id: string;
  time: string;
  from: string;
  type: string;
  location: string;
  details: string;
  assigned: {
    name: string;
    callsign: string;
  }[];
  statuses: string[];
}

interface DispatchTableProps {
  records: DispatchRecord[];
  className?: string;
  onAttachToCalls?: (recordId: string, user: { name: string; callsign: string }) => void;
  currentUser?: { name: string; callsign: string };
}

const DispatchTable: React.FC<DispatchTableProps> = ({ 
  records, 
  className,
  onAttachToCalls,
  currentUser
}) => {
  const handleAttachToCall = (recordId: string) => {
    if (onAttachToCalls && currentUser) {
      onAttachToCalls(recordId, currentUser);
    }
  };

  const isUserAttached = (record: DispatchRecord) => {
    if (!currentUser) return false;
    return record.assigned.some(person => 
      person.name === currentUser.name && person.callsign === currentUser.callsign
    );
  };

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Time</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">From</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Location</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Details</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-white/60 uppercase tracking-wider">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr 
                key={record.id} 
                className={cn(
                  'border-b border-white/5 hover:bg-white/5 transition-colors duration-150',
                  index % 2 === 0 ? 'bg-white/[0.02]' : ''
                )}
              >
                <td className="px-4 py-4 text-sm font-mono">{record.id}</td>
                <td className="px-4 py-4 text-sm font-mono">{record.time}</td>
                <td className="px-4 py-4 text-sm">{record.from}</td>
                <td className="px-4 py-4 text-sm">
                  <span className="inline-block rounded px-2 py-1 text-xs bg-dispatch-accent/10 text-dispatch-accent border border-dispatch-accent/30">
                    {record.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">{record.location}</td>
                <td className="px-4 py-4 text-sm max-w-md truncate">{record.details}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-end space-y-1">
                    {record.assigned.map((person, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-white/80">{person.name}</span>
                        <span className="text-white/50 ml-1">- {person.callsign}</span>
                      </div>
                    ))}
                    
                    {onAttachToCalls && currentUser && !isUserAttached(record) && (
                      <button 
                        onClick={() => handleAttachToCall(record.id)}
                        className="mt-2 px-2 py-1 text-xs rounded bg-dispatch-accent/20 hover:bg-dispatch-accent/30 text-dispatch-accent border border-dispatch-accent/30 transition-colors duration-200 flex items-center"
                      >
                        <UserPlus size={14} className="mr-1" />
                        Attach to Call
                      </button>
                    )}
                    
                    <div className="flex flex-wrap justify-end gap-1 mt-2">
                      {record.statuses.map((status, idx) => (
                        <StatusBadge key={idx} status={status as any} />
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DispatchTable;
