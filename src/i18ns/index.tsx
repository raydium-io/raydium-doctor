import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enUS from './en-US.json';
import zhCN from './zh-CN.json';

i18n
  // https://www.i18next.com/overview/configuration-options
  .use(initReactI18next)
  // https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development' ? true : false,
    resources: {
      'en-US': enUS,
      'zh-CN': zhCN
    },
    load: 'currentOnly',
    supportedLngs: ['en-US', 'zh-CN'],
    fallbackLng: 'en-US',
    defaultNS: 'common',

    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    backend: {}
  });

export default i18n;
