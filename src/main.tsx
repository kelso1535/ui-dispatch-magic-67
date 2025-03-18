
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
  // Handle FiveM messages here
  if (event.data.type === 'dispatch:receiveCall') {
    console.log('Received dispatch call:', event.data);
    // You can dispatch this to your React components
  }
});

// Make fetch available in FiveM
if (!window.fetch) {
  console.log("FiveM environment detected, setting up custom fetch");
}
