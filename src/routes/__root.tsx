import {
  createRootRoute,
  ScrollRestoration,
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { RouterContext } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRouteWithContext<RouterContext>()({
  //notFoundComponent: PageNotFound,
  // errorComponent: ErrorPage,
  component: () => (
    <>
      <Outlet />
      <ScrollRestoration />
      <Toaster />
      {import.meta.env.MODE === "development" && (
        <>
          {/* <ReactQueryDevtools buttonPosition='bottom-left' /> */}
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
      {/* <ScrollRestoration />
      <TanStackRouterDevtools />
      <DashboardLayout /> */}
    </>
  ),
});
