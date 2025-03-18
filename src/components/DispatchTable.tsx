import React from 'react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { MapPin, CheckCircle, XCircle, Trash2, Navigation, Phone } from 'lucide-react';
import { Button } from './ui/button';

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
  callerPhone?: string;
}

interface DispatchTableProps {
  records: DispatchRecord[];
  className?: string;
  onAttachToCalls?: (recordId: string, user: { name: string; callsign: string }) => void;
  onDetachFromCall?: (recordId: string, user: { name: string; callsign: string }) => void;
  currentUser?: { name: string; callsign: string };
}

const DispatchTable: React.FC<DispatchTableProps> = ({ 
  records, 
  className,
  onAttachToCalls,
  onDetachFromCall,
  currentUser
}) => {
  const handleAttachToCall = (recordId: string) => {
    if (onAttachToCalls && currentUser) {
      onAttachToCalls(recordId, currentUser);
    }
  };

  const handleDetachFromCall = (recordId: string) => {
    if (onDetachFromCall && currentUser) {
      onDetachFromCall(recordId, currentUser);
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
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Assigned</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-white/60 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr 
                key={record.id} 
                className={cn(
                  'border-b border-white/5 hover:bg-white/5 transition-colors duration-150',
                  index % 2 === 0 ? 'bg-black/20' : 'bg-black/10'
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
                <td className="px-4 py-4 text-sm">
                  {record.callerPhone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-white/60" />
                      <span className="font-mono">{record.callerPhone}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col space-y-1">
                    {record.assigned.length > 0 ? (
                      record.assigned.map((person, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="text-white/80">{person.name}</span>
                          <span className="text-white/50 ml-1">- {person.callsign}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-white/40">No units assigned</span>
                    )}
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="flex flex-row items-center justify-end gap-1">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-sm"
                    >
                      <Navigation size={16} />
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded-sm"
                    >
                      <CheckCircle size={16} />
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 rounded-sm"
                    >
                      <XCircle size={16} />
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                    
                    {currentUser && !isUserAttached(record) ? (
                      <Button 
                        onClick={() => handleAttachToCall(record.id)}
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 px-2 py-0 text-xs bg-dispatch-accent/20 hover:bg-dispatch-accent/30 text-dispatch-accent rounded-sm"
                      >
                        Attach
                      </Button>
                    ) : currentUser && isUserAttached(record) ? (
                      <Button 
                        onClick={() => handleDetachFromCall(record.id)}
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 px-2 py-0 text-xs bg-dispatch-warning/20 hover:bg-dispatch-warning/30 text-dispatch-warning rounded-sm"
                      >
                        Detach
                      </Button>
                    ) : null}
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
