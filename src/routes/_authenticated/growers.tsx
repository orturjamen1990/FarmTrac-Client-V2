import { createFileRoute } from "@tanstack/react-router";
import Growers from "@/features/growers/index";

export const Route = createFileRoute("/_authenticated/growers")({
  component: Growers,
});
