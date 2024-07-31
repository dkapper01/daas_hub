import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/companies/new/")({
  component: () => <div>Hello /companies/new/!</div>,
});
