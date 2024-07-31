import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashbord')({
  component: () => <div>Hello /dashbord!</div>
})