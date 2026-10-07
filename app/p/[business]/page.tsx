import { notFound } from "next/navigation";
import PreviewNotice from "../_components/PreviewNotice";
import AcquisiFlowOwnerCTA from "../_components/AcquisiFlowOwnerCTA";
import { getBusiness } from "../_lib/get-business";
import { createPreviewMetadata } from "../_lib/metadata";

type Props = { params: Promise<{ business: string }> };

export async function generateMetadata({ params }: Props) {
  const { business: slug } = await params;
  const entry = getBusiness(slug);
  if (!entry) notFound();
  return createPreviewMetadata(entry.business);
}

export default async function BusinessPreviewPage({ params }: Props) {
  const { business: slug } = await params;
  const entry = getBusiness(slug);
  if (!entry) notFound();
  const { business, Website } = entry;

  return (
    <div id="main-content" tabIndex={-1}>
      <PreviewNotice />
      <Website business={business} />
      <AcquisiFlowOwnerCTA businessName={business.name} />
    </div>
  );
}
