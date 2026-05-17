import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { useAutoLanguageFromLocation } from "@/hooks/useAutoLanguageFromLocation";
import { useLocationContext } from "@/hooks/use-user-location";
import { isRtlLanguage } from "@/lib/country-languages";

function syncDocumentLanguage(lng: string) {
  document.documentElement.lang = lng;
  document.documentElement.dir = isRtlLanguage(lng) ? "rtl" : "ltr";
}

function AutoLanguageFromGeo() {
  const { location, isLoading } = useLocationContext();
  useAutoLanguageFromLocation(isLoading ? undefined : location);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    syncDocumentLanguage(i18n.language);
    const onChange = (lng: string) => syncDocumentLanguage(lng);
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <AutoLanguageFromGeo />
      {children}
    </I18nextProvider>
  );
}
