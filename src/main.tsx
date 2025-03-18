
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root element if it doesn't exist (for FiveM compatibility)
let rootElement = document.getElementById("root");
if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = "root";
  document.body.appendChild(rootElement);
}

createRoot(rootElement).render(<App />);
