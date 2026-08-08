import { GOOGLE_CONFIG } from '../config/google';

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
  if (GOOGLE_CONFIG.gaMeasurementId) {
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_CONFIG.gaMeasurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GOOGLE_CONFIG.gaMeasurementId, {
        send_page_view: true,
        anonymize_ip: true,
      });
    }
  }

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
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_CONFIG.adsenseClientId}`;
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
