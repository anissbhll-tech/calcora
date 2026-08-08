export const GOOGLE_CONFIG = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://calcora.com',
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'rIRD4aaRFVbAs9cDjdyts7bc5h4PaCmK-i5YFDm57Og',
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || import.meta.env.VITE_GA_ID || '',
  gtmContainerId: import.meta.env.VITE_GTM_CONTAINER_ID || '',
  adsenseClientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || '',
};
