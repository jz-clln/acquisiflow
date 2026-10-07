import { previewSettings } from "../_lib/settings";

export default function AcquisiFlowOwnerCTA({ businessName }: { businessName: string }) {
  return (
    <aside aria-labelledby="acquisiflow-owner-heading" className="mt-6 border-t p-4">
      <h2 id="acquisiflow-owner-heading" className="font-semibold">For the business owner</h2>
      <p>This website is a concept created specifically for {businessName}.</p>
      <p>Interested in turning it into your real website?</p>
      <a href={previewSettings.contactUrl} className="inline-block py-3 underline underline-offset-4">
        Talk to {previewSettings.studioName}
      </a>
    </aside>
  );
}
