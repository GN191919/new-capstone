import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enEmployee from './locales/en/employee.json';
import enReports from './locales/en/reports.json';
import enSidebar from './locales/en/sidebar.json';
import enDashboard from './locales/en/dashboard.json';
import enTranslations from './locales/en/translations.json';
import ruEmployee from './locales/ru/employee.json';
import ruReports from './locales/ru/reports.json';
import ruSidebar from './locales/ru/sidebar.json';
import ruDashboard from './locales/ru/dashboard.json';
import ruTranslations from './locales/ru/translations.json';
import kzEmployee from './locales/kz/employee.json';
import kzReports from './locales/kz/reports.json';
import kzSidebar from './locales/kz/sidebar.json';
import kzDashboard from './locales/kz/dashboard.json';
import kzTranslations from './locales/kz/translations.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        employee: enEmployee,
        reports: enReports,
        sidebar: enSidebar,
        dashboard: enDashboard,
        translations: enTranslations
      },
      ru: {
        employee: ruEmployee,
        reports: ruReports,
        sidebar: ruSidebar,
        dashboard: ruDashboard,
        translations: ruTranslations
      },
      kz: {
        employee: kzEmployee,
        reports: kzReports,
        sidebar: kzSidebar,
        dashboard: kzDashboard,
        translations: kzTranslations
      }
    },
    lng: localStorage.getItem('language') || 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language'
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
