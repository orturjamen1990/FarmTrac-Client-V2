import { createFileRoute } from "@tanstack/react-router";
import Pallets from "@/features/pallets";

export const Route = createFileRoute("/_authenticated/pallets")({
  component: Pallets,
});
