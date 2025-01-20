import {
  createRootRoute,
  ScrollRestoration,
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { RouterContext } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";

export const Route = createRootRouteWithContext<RouterContext>()({
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
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
