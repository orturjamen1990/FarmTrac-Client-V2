import { createFileRoute } from "@tanstack/react-router";
import GrowingAreas from "@/features/growing-areas";

export const Route = createFileRoute("/_authenticated/growing-areas/")({
  component: GrowingAreas,
});
