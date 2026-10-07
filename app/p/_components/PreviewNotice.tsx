import { previewSettings } from "../_lib/settings";

export default function PreviewNotice() {
  return (
    <aside aria-label="Unofficial preview notice" className="border-b p-4 text-sm">
      <p>Concept website created by {previewSettings.studioName}. This is an unofficial preview and is not the business&apos;s live website.</p>
    </aside>
  );
}
