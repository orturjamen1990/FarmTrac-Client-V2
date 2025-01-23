import { createFileRoute } from "@tanstack/react-router";
import GrowingArea from "@/features/growing-areas/components/GrowingArea";

export const Route = createFileRoute(
  "/_authenticated/growing-areas/$growingAreaId"
)({
  component: GrowingArea,
});
