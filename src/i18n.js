import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import translation_ar from './locales/ar.json';
import translation_en from './locales/en.json';
import translation_fr from './locales/fr.json';

const resources = {
  en: {
    translation: translation_en,
  },
  ar: {
    translation: translation_ar,
  },
  fr: {
    translation: translation_fr,
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
