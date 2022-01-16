import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const initDarkMode = () => {
      if (!localStorage.getItem("darkmode")) {
        localStorage.setItem("darkmode", "false");
        return false;
      }
      return localStorage.getItem("darkmode") === "true";
    };
    setIsDarkMode(initDarkMode());
  }, []);

  return (
    <AppProvider
      i18n={enTranslations}
      theme={{
        colorScheme: isDarkMode ? "dark" : "light",
      }}
    >
      {/* The Polaris appbar wasnt suitable for this use case (I guess) */}
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default MyApp;
