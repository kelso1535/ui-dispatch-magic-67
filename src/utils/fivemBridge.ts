
/**
 * FiveM Bridge to handle communication between React and FiveM
 */

// Type definitions for messages
type DispatchMessage = {
  type: string;
  data: any;
};

// Initialize with a debug mode for testing outside of FiveM
const isFivem = 'window' in globalThis && 'GetParentResourceName' in window;
const debugMode = !isFivem;

/**
 * Send a message to the FiveM client
 */
export const sendMessage = (event: string, data: any = {}) => {
  if (debugMode) {
    console.log(`[FiveM Bridge] Sending message: ${event}`, data);
    return;
  }

  // @ts-ignore - FiveM specific method
  fetch(`https://${GetParentResourceName()}/${event}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

/**
 * Set up a listener for FiveM messages
 */
export const onMessage = (callback: (message: DispatchMessage) => void) => {
  window.addEventListener('message', (event) => {
    if (debugMode) {
      console.log('[FiveM Bridge] Received message:', event.data);
    }
    
    callback(event.data);
  });
};

/**
 * Play audio using the FiveM NUI system
 */
export const playAudio = (audioFile: string, volume: number = 0.5) => {
  if (debugMode) {
    console.log(`[FiveM Bridge] Playing audio: ${audioFile} at volume ${volume}`);
    
    // Fall back to browser audio API when not in FiveM
    const audio = new Audio(audioFile);
    audio.volume = volume;
    audio.play().catch(err => {
      console.error('Audio play failed:', JSON.stringify(err, null, 2));
    });
    
    return;
  }
  
  // Send message to FiveM client to play audio
  sendMessage('playSound', { name: audioFile, volume });
};

// Initialize the bridge
export const initFivemBridge = () => {
  if (debugMode) {
    console.log('[FiveM Bridge] Initialized in debug mode');
  } else {
    console.log('[FiveM Bridge] Initialized in FiveM mode');
  }
  
  // Send ready event to FiveM
  sendMessage('uiReady');
};

// Export a default bridge object
const fivemBridge = {
  sendMessage,
  onMessage,
  playAudio,
  initFivemBridge,
  isFivem,
  debugMode,
};

export default fivemBridge;
