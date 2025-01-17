import { createFileRoute } from '@tanstack/react-router'
import Produce from '@/features/produce/components/Produce'

export const Route = createFileRoute('/_authenticated/produces/$produceId')({
  component: Produce,
})
