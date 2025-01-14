import { createFileRoute } from "@tanstack/react-router";
import Main from "@/features/pallet-types/index";

export const Route = createFileRoute("/_authenticated/pallet-types")({
  component: Main,
});
