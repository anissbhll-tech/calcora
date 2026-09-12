export const GOOGLE_CONFIG = {
  siteUrl: 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
    (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('run.app') ? window.location.origin : 'https://calcora-2a4.pages.dev'),
  googleSiteVerification: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SITE_VERIFICATION) || 'rIRD4aaRFVbAs9cDjdyts7bc5h4PaCmK-i5YFDm57Og',
  gaMeasurementId: (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_GA_MEASUREMENT_ID || import.meta.env?.VITE_GA_ID)) || 'G-1QP06KH58D',
  gtmContainerId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GTM_CONTAINER_ID) || '',
  adsenseClientId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_CLIENT_ID) || 'pub-8777191533297348',
};
