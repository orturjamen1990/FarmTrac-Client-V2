import { createFileRoute } from "@tanstack/react-router";
import Carriers from "@/features/carriers";

export const Route = createFileRoute("/_authenticated/carriers")({
  component: Carriers,
});
