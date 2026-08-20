import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/patterns/ServiceCard";
import type { HomeDictionary } from "@/content/types";

export function CoreServicesSection({
  coreServices,
}: {
  coreServices: HomeDictionary["coreServices"];
}) {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={coreServices.headline} />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.services.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <ServiceCard title={service.title} description={service.description} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
