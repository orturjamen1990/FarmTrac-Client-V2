import { createFileRoute } from "@tanstack/react-router";
import Main from "@/features/marketers";

export const Route = createFileRoute("/_authenticated/marketers")({
  component: Main,
});
