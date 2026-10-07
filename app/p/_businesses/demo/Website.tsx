import type { BusinessWebsiteProps } from "../../_lib/types";

// Intentionally plain. This is a routing fixture, not a client website template.
export default function Website({ business }: BusinessWebsiteProps) {
  return (
    <main className="p-4">
      <h1>{business.name}</h1>
      <p>This is a fictional demo, not a real business.</p>
      <p>Website design has not been created yet.</p>
    </main>
  );
}
