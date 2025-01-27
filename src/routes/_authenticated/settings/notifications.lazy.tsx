import { createLazyFileRoute } from '@tanstack/react-router'
import Notifications from '@/features/settings/notifications'

export const Route = createLazyFileRoute(
  '/_authenticated/settings/notifications',
)({
  component: Notifications,
})
