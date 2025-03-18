
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface UrgentAssistanceProps {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  details: string[];
  coordinates?: string;
  isVisible: boolean;
  isUrgentBackup?: boolean;
  callerPhone?: string; // Added caller phone number
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
  isUrgentBackup = false,
  callerPhone,
  onDismiss
}) => {
  const { toast } = useToast();
  const [flashState, setFlashState] = useState<'red' | 'blue'>('red');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isUrgentBackup && isVisible) {
      // Create flashing effect for urgent backup
      const flashInterval = setInterval(() => {
        setFlashState(prev => prev === 'red' ? 'blue' : 'red');
      }, 500);
      
      // Play sound when urgent backup notification appears
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.info("Audio play failed:", JSON.stringify(error));
        });
      }
      
      return () => clearInterval(flashInterval);
    }
  }, [isUrgentBackup, isVisible]);

  if (!isVisible) return null;

  const bgColorClass = isUrgentBackup 
    ? flashState === 'red' 
      ? 'bg-red-600/90'
      : 'bg-blue-600/90'
    : 'bg-blue-600/90';

  return (
    <>
      {/* Audio elements for notifications */}
      <audio ref={audioRef} src={isUrgentBackup ? "/backup-alert.mp3" : "/duress-alert.mp3"} />
      
      <div 
        className={`
          fixed top-8 right-8 z-50 w-80 text-white rounded-md shadow-lg border border-white/10 backdrop-blur-sm
          animate-in fade-in slide-in-from-right duration-300
          flex flex-col
          ${bgColorClass}
          ${isUrgentBackup ? "transition-colors duration-300" : ""}
        `}
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
          
          {callerPhone && (
            <div className="flex items-start gap-2 bg-black/20 p-2 rounded mb-1">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-sm font-mono">{callerPhone}</p>
            </div>
          )}
          
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              {index === 0 && !callerPhone && <Phone className="h-4 w-4 mt-0.5 shrink-0" />}
              {index === (callerPhone ? 0 : 1) && <Navigation className="h-4 w-4 mt-0.5 shrink-0" />}
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
      </div>
    </>
  );
};

export default UrgentAssistanceNotification;
