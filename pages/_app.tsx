import "@shopify/polaris/build/esm/styles.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "../styles/globals.css";
import { NavBar } from "../components/NavBar";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
}

export default MyApp;
