import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getContactDictionary } from "@/content/get-contact-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { ContactSection } from "@/components/patterns/ContactSection";
import { ContactFlowPreview } from "@/components/patterns/ContactFlowPreview";
import { DotField } from "@/components/patterns/DotField";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getContactDictionary(locale);

  return buildPageMetadata(locale, {
    title: dict.meta.title,
    description: dict.meta.description,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getContactDictionary(locale);

  return (
    <section className="lg:flex lg:items-stretch">
      {/* A live demonstration of mandhy's core loop, not decoration — hidden
          below lg since the panel itself is a desktop-only layout choice. */}
      <div className="relative hidden overflow-hidden border-r border-border bg-surface lg:block lg:w-[42%]">
        <DotField className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <ContactFlowPreview
            chat={dict.workflowPreview.chat}
            actionsSummary={dict.workflowPreview.actionsSummary}
            actions={dict.workflowPreview.actions}
          />
        </div>
      </div>

      <div className="lg:flex lg:w-[58%] lg:min-h-[calc(100vh-5rem)] lg:items-center">
        <Container className="max-w-xl py-10 sm:py-12">
          <ContactSection dict={dict} locale={locale} />
        </Container>
      </div>
    </section>
  );
}
