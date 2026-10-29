import { Hero } from "@/components/site/hero";
import { Process } from "@/components/site/process";
import { Projects } from "@/components/site/projects";
import { QuoteSection } from "@/components/site/quote-section";
import { Services } from "@/components/site/services";
import { TrustStrip } from "@/components/site/trust-strip";
import { WhyUs } from "@/components/site/why-us";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <TrustStrip />
      <Services />
      <Projects />
      <WhyUs />
      <Process />
      <QuoteSection />
    </main>
  );
}
