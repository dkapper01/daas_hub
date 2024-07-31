import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/companies/new/$id')({
  component: () => <div>Hello /companies/new/$id!</div>
})