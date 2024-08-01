import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/companies/stats/$id")({
  component: () => <div>Hello /companies/stats/$id!</div>,
});
