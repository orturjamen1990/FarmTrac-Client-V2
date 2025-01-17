import { createFileRoute } from "@tanstack/react-router";
import Customers from "@/features/customers/Customers";

export const Route = createFileRoute("/_authenticated/customers")({
  component: Customers,
});
