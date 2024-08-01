import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/companies/stats")({
  component: () => <div>Hello /companies/stats!</div>,
});
