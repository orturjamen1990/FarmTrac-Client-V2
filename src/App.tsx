import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect, useState } from "react";
import { store } from "@/stores/store";
import { me } from "@/stores/common-slices/authSlice";
import { useAuth } from "./hooks/useAuth.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n.ts";
import messages from "@/locales/validationMessages.json";
import { ThemeProvider } from "./context/theme-context.tsx";
import { Toaster } from "sonner";
import { ConfirmProvider } from "./context/confirm-context.tsx";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authentication = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      await store.dispatch(me());
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const validationMessages = messages[i18n.language] || messages.en; // default to English if locale not found
    //Yup.setLocale(validationMessages);
    i18n.loadNamespaces(["global"]);
  }, [i18n]);

  if (isLoading) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ConfirmProvider>
          <Toaster richColors />
          {/* <ConfirmationDialog /> */}
          <RouterProvider router={router} context={{ authentication }} />
        </ConfirmProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
