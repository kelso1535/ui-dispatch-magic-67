
import fivemBridge from '../utils/fivemBridge';

// Audio files
const AUDIO_FILES = {
  BACKUP_ALERT: './backup-alert.mp3',
  DURESS_ALERT: './duress-alert.mp3',
  LOCATION_SHARE: './location-share.mp3', 
  URGENT_BACKUP: './urgent-backup.mp3'
};

class AudioService {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private volume: number = 0.5;
  
  constructor() {
    this.preloadAudios();
  }

  private preloadAudios() {
    Object.entries(AUDIO_FILES).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.audioElements.set(key, audio);
      
      // Load the audio
      audio.load();
      
      console.log(`Preloaded audio: ${key} from ${path}`);
    });
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    this.audioElements.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  public playBackupAlert() {
    this.playSound('BACKUP_ALERT');
  }

  public playDuressAlert() {
    this.playSound('DURESS_ALERT');
  }

  public playLocationShare() {
    this.playSound('LOCATION_SHARE');
  }

  public playUrgentBackup() {
    this.playSound('URGENT_BACKUP');
  }

  private playSound(soundKey: string) {
    // Use FiveM bridge if in FiveM environment
    if (!fivemBridge.debugMode) {
      const audioPath = AUDIO_FILES[soundKey as keyof typeof AUDIO_FILES];
      fivemBridge.playAudio(audioPath, this.volume);
      return;
    }
    
    // Fall back to browser audio API when not in FiveM
    const audio = this.audioElements.get(soundKey);
    
    if (!audio) {
      console.error(`Audio not found: ${soundKey}`);
      return;
    }
    
    // Reset and play
    try {
      audio.currentTime = 0;
      audio.play()
        .catch(err => {
          console.error('Audio play failed:', JSON.stringify(err, null, 2));
        });
    } catch (error) {
      console.error(`Error playing ${soundKey}:`, error);
    }
  }
  
  // Test all audio files
  public testAllSounds() {
    console.log('Testing all audio files...');
    setTimeout(() => this.playBackupAlert(), 500);
    setTimeout(() => this.playDuressAlert(), 1500);
    setTimeout(() => this.playLocationShare(), 2500);
    setTimeout(() => this.playUrgentBackup(), 3500);
  }
}

// Export a singleton instance
const audioService = new AudioService();
export default audioService;
