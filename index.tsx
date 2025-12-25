import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Failed to find the root element with ID 'root'. Check index.html.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Tipde/Tipdora Application Mounted Successfully.");
  } catch (error) {
    console.error("Critical Error during React hydration:", error);
  }
}