import { Footer } from "@/components/footer";
import { Header } from "@/components/chrome";
import { Hero, Problem, Services, Process, Lab, About, Faq, Contact } from "@/components/sections";

import { site } from "@/lib/site";
import { pageMetadata, organizationSchema } from "@/lib/seo";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata = pageMetadata("AcquisiFlow | Custom Software Development for Growing Businesses", site.description, "/");

export default function Home() {
  return (
    <>
      <Header />
      <StructuredData data={organizationSchema} />
      <main id="main-content" tabIndex={-1}>
        <Hero /><Problem /><Services /><Process /><Lab /><About /><Faq /><Contact />
      </main>
      <Footer />
    </>
  );
}
