import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register';

registerSW();

createRoot(document.getElementById('root')).render(
    <App />
)
