import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/index/stats')({
  component: () => <div>Hello /index/stats!</div>
})