import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing JSON files for different namespaces and languages
import he from "./he";
import en from "./en";

// Configuring i18next with resources and initialization options
i18n.use(initReactI18next).init({
  resources: {
    en: en,
    he: he,
  },
  lng: "en", // Default language
  fallbackLng: "en",
  ns: [
    "global",
    "growingAreas",
    "produce",
    "growers",
    "vehicle",
    "packagingType",
    "palletType",
    "pallets",
    "customers",
    "customerType",
    "marketers",
    "carriers",
    "shipping-certificate-status",
    "shipping-certificate-type",
  ], // Namespaces
  defaultNS: "global", // Default namespace
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
