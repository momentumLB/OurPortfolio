import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { StickyWhatsAppButton } from "./components/StickyWhatsAppButton";

declare global {
  interface Window { gtag: (...args: unknown[]) => void; }
}

function GATracker() {
  const location = useLocation();
  useEffect(() => {
    window.gtag?.('config', 'G-RD7XMJWH4H', { page_path: location.pathname + location.search });
  }, [location]);
  return null;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <GATracker />
        <AppRoutes />
        <StickyWhatsAppButton />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
