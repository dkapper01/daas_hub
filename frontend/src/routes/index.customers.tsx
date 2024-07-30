import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/index/customers")({
  component: () => <div>Hello /index/customers!</div>,
});
