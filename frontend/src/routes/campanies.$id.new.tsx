import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/campanies/$id/new')({
  component: () => <div>Hello /campanies/$id/new!</div>
})