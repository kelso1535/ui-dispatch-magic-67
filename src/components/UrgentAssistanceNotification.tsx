
import React from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface UrgentAssistanceProps {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  details: string[];
  coordinates?: string;
  isVisible: boolean;
  onWaypoint?: () => void;
  onDismiss?: () => void;
}

const UrgentAssistanceNotification: React.FC<UrgentAssistanceProps> = ({
  id,
  title,
  subtitle,
  location,
  details,
  coordinates,
  isVisible,
  onWaypoint,
  onDismiss
}) => {
  const { toast } = useToast();

  const handleWaypoint = () => {
    toast({
      title: "Waypoint Set",
      description: `Waypoint set to ${location}`,
      variant: "default",
    });
    
    if (onWaypoint) onWaypoint();
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-8 right-8 z-50 w-80 bg-red-600/90 text-white rounded-md shadow-lg border border-white/10 backdrop-blur-sm",
        "animate-in fade-in slide-in-from-right duration-300",
        "flex flex-col"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/20">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase text-white">{title}</span>
          <span className="text-sm text-white/80">#{id}</span>
        </div>
        <MapPin className="h-5 w-5 text-white" />
      </div>
      
      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-bold text-lg uppercase">{subtitle || "INCIDENT"}</h3>
        
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-2">
            {index === 0 && <Phone className="h-4 w-4 mt-0.5 shrink-0" />}
            {index === 1 && <Navigation className="h-4 w-4 mt-0.5 shrink-0" />}
            <p className="text-sm">{detail}</p>
          </div>
        ))}
        
        {coordinates && (
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 shrink-0" />
            <p className="text-sm">{coordinates}</p>
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="p-3 border-t border-white/20 flex justify-end gap-2">
        <Button 
          onClick={handleWaypoint}
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white"
        >
          <Navigation className="h-4 w-4 mr-1" />
          Set Waypoint
        </Button>
      </div>
    </div>
  );
};

export default UrgentAssistanceNotification;
