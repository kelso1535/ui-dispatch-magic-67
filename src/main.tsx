
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wait for the DOM to be fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Root element not found");
  }
});

// Set up a way to communicate with the FiveM client
window.addEventListener('message', (event) => {
  if (event.data.type === 'dispatch:receiveCall') {
    console.log('Received dispatch call:', event.data);
  }
});

// Console log to verify the UI is loading
console.log('FiveM Dispatch UI initialized');
