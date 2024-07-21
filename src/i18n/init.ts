import i18n, {Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import translations from './translations.json';

export const supportedLngs = Object.keys(translations);

export const initializeI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: translations as Resource,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
  });
};
