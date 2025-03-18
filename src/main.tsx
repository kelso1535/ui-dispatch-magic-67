
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure the DOM is ready before rendering
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    createRoot(rootElement).render(<App />);
    console.log("React app mounted successfully");
  } else {
    console.error("Root element not found");
  }
});
