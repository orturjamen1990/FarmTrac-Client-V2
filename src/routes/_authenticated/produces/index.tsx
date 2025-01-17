import { createFileRoute } from "@tanstack/react-router";
import Produces from "@/features/produce/Produces";

export const Route = createFileRoute("/_authenticated/produces/")({
  component: Produces,
});
