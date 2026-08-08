import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, TRANSLATIONS, LanguageInfo } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  currentLanguageInfo: LanguageInfo;
  isRTL: boolean;
  formatNumber: (num: number) => string;
  formatDate: (date: Date | number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('calcora_lang') as Language;
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      const browserLang = navigator.language.slice(0, 2) as Language;
      if (LANGUAGES.some((l) => l.code === browserLang)) {
        return browserLang;
      }
    } catch {}
    return 'en';
  });

  const currentLanguageInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const isRTL = currentLanguageInfo.dir === 'rtl';

  useEffect(() => {
    try {
      localStorage.setItem('calcora_lang', language);
    } catch {}

    // Update HTML dir attribute for RTL support
    document.documentElement.dir = currentLanguageInfo.dir;
    document.documentElement.lang = language;
  }, [language, currentLanguageInfo]);

  const setLanguage = (lang: Language) => {
    if (LANGUAGES.some((l) => l.code === lang)) {
      setLanguageState(lang);
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return defaultText || key;
  };

  const formatNumber = (num: number): string => {
    try {
      return new Intl.NumberFormat(language).format(num);
    } catch {
      return num.toString();
    }
  };

  const formatDate = (date: Date | number): string => {
    try {
      const d = typeof date === 'number' ? new Date(date) : date;
      return new Intl.DateTimeFormat(language, { dateStyle: 'medium' }).format(d);
    } catch {
      return new Date(date).toLocaleDateString();
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageInfo,
        isRTL,
        formatNumber,
        formatDate,
      }}
    >
      <div dir={currentLanguageInfo.dir} className="w-full min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
