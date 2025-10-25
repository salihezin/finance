import { useTranslation as useReactI18NextTranslation } from 'react-i18next';
import i18n from './i18n';

export const useTranslation = () => {
  return useReactI18NextTranslation(undefined, { i18n });
};