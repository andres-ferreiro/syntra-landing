import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getContactDictionary } from "@/content/get-contact-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { ContactForm } from "@/components/patterns/ContactForm";
import { ContactFlowPreview } from "@/components/patterns/ContactFlowPreview";
import { DirectContactLinks } from "@/components/patterns/DirectContactLinks";
import { DotField } from "@/components/patterns/DotField";
import { localizeHref } from "@/lib/i18n";

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
          <h1 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {dict.hero.headline}
          </h1>
          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-ink-soft">
            {dict.hero.intro}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <CtaButton
              label={dict.booking.linkLabel}
              href={localizeHref(locale, "/schedule")}
              variant="secondary"
            />
            <span className="text-sm text-ink-soft">{dict.booking.prompt}</span>
          </div>

          <div className="mt-8">
            <ContactForm dict={dict} locale={locale} />
          </div>

          <div className="mt-8">
            <DirectContactLinks
              heading={dict.directContact.heading}
              emailLabel={dict.directContact.emailLabel}
              phoneLabel={dict.directContact.phoneLabel}
              whatsappLabel={dict.directContact.whatsappLabel}
              whatsappMessage={dict.directContact.whatsappMessage}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
