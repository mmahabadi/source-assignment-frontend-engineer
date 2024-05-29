import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './global.css';

import App from './app/app';
import ErrorBoundary from './app/components/error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
