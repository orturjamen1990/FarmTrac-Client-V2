import { createFileRoute } from "@tanstack/react-router";
import CustomerType from "@/features/customer-type/customer-type";

export const Route = createFileRoute("/_authenticated/customer-type")({
  component: CustomerType,
});
