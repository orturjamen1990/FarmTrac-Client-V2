import { createFileRoute } from "@tanstack/react-router";
import Main from "@/features/calendar/Calendar";

export const Route = createFileRoute("/_authenticated/calendar")({
  component: Main,
});
