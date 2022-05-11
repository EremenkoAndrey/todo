import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './src/App';
import './index.css';

let rootElement = window.document.getElementById('root');
if (!rootElement) {
    rootElement = window.document.createElement('div');
    window.document.appendChild(rootElement);
}
createRoot(rootElement).render(<App />);
