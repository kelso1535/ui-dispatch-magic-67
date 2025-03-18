
// Audio Service for handling sound effects in the dispatch system
class AudioService {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private initialized: boolean = false;

  constructor() {
    this.preloadSounds();
  }

  private preloadSounds() {
    if (this.initialized) return;

    // Use the correct path to the audio files in the public directory
    const soundEffects = {
      'emergency': './urgent-backup.mp3',
      'duress': './duress-alert.mp3',
      'backup': './backup-alert.mp3',
      'location': './location-share.mp3'
    };

    for (const [name, path] of Object.entries(soundEffects)) {
      try {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds.set(name, audio);
        console.log(`Preloaded sound: ${name} from ${path}`);
      } catch (error) {
        console.error(`Failed to load sound: ${name}`, error);
      }
    }

    this.initialized = true;
  }

  public play(soundName: string): void {
    const sound = this.sounds.get(soundName);
    
    if (sound) {
      // Create a new instance to allow overlapping sounds
      const soundInstance = sound.cloneNode() as HTMLAudioElement;
      
      // Add a more comprehensive error handler with better logging
      soundInstance.play().catch(error => {
        console.info("Audio play failed:", JSON.stringify(error));
      });
    } else {
      console.warn(`Sound not found: ${soundName}`);
    }
  }
}

// Export a singleton instance
const audioService = new AudioService();
export default audioService;
