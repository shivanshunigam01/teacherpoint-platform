import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../../public/locales/en/common.json";
import zhCommon from "../../public/locales/zh/common.json";
import frCommon from "../../public/locales/fr/common.json";
import deCommon from "../../public/locales/de/common.json";
import esCommon from "../../public/locales/es/common.json";
import itCommon from "../../public/locales/it/common.json";

export const SUPPORTED_LANGUAGES = ["en", "zh", "fr", "de", "es", "it"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  en: { common: enCommon },
  zh: { common: zhCommon },
  fr: { common: frCommon },
  de: { common: deCommon },
  es: { common: esCommon },
  it: { common: itCommon },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: [...SUPPORTED_LANGUAGES],
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "selectedLanguage",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

export default i18n;
