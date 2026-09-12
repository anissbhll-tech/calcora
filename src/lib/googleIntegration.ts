import { GOOGLE_CONFIG } from '../config/google';
import { initGA } from './analytics';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    adsbygoogle: any[];
  }
}

/**
 * Initializes Google Services (Search Console verification, GA4, GTM, AdSense)
 * dynamically when credentials are present in environment variables.
 */
export function initGoogleServices(): void {
  if (typeof window === 'undefined') return;

  // 1. Google Search Console Meta Tag
  if (GOOGLE_CONFIG.googleSiteVerification) {
    let meta = document.querySelector('meta[name="google-site-verification"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'google-site-verification');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', GOOGLE_CONFIG.googleSiteVerification);
  }

  // 2. Google Analytics 4 (GA4)
  initGA();

  // 3. Google Tag Manager (GTM)
  if (GOOGLE_CONFIG.gtmContainerId) {
    const existingGtm = document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`);
    if (!existingGtm) {
      const script = document.createElement('script');
      script.async = true;
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GOOGLE_CONFIG.gtmContainerId}');`;
      document.head.appendChild(script);
    }
  }

  // 4. Google AdSense
  if (GOOGLE_CONFIG.adsenseClientId) {
    const existingAdsense = document.querySelector(`script[src*="pagead2.googlesyndication.com"]`);
    if (!existingAdsense) {
      const clientId = GOOGLE_CONFIG.adsenseClientId.startsWith('ca-')
        ? GOOGLE_CONFIG.adsenseClientId
        : `ca-${GOOGLE_CONFIG.adsenseClientId}`;
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }
}

/**
 * Sends custom events to Google Analytics 4 if available
 */
export function trackGA4Event(action: string, category: string, label?: string, value?: number): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && GOOGLE_CONFIG.gaMeasurementId) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
