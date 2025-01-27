import { createLazyFileRoute } from "@tanstack/react-router";
import Appearance from "@/features/settings/appearance";

export const Route = createLazyFileRoute("/_authenticated/settings/appearance")(
  {
    component: Appearance,
  }
);
