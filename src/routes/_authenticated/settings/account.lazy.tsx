import { createLazyFileRoute } from "@tanstack/react-router";
import Account from "@/features/settings/account";
export const Route = createLazyFileRoute("/_authenticated/settings/account")({
  component: Account,
});
