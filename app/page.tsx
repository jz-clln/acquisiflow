import { Header, Footer } from "@/components/chrome";
import { Hero, Problem, Services, Process, Lab, About, Faq, Contact } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero /><Problem /><Services /><Process /><Lab /><About /><Faq /><Contact />
      </main>
      <Footer />
    </>
  );
}
