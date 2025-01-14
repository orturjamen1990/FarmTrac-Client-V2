import { createFileRoute } from "@tanstack/react-router";
import Main from "@/features/packaging-types";

export const Route = createFileRoute("/_authenticated/packaging-types")({
  component: Main,
});
