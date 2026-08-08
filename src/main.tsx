import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext';
import { initGoogleServices } from './lib/googleIntegration';
import { ErrorBoundary } from './components/ErrorBoundary';

// Initialize Google Analytics 4, GTM, Search Console & AdSense if keys exist
try {
  initGoogleServices();
} catch (e) {
  console.warn('Google services init warning:', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);



