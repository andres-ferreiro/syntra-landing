import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getContactDictionary } from "@/content/get-contact-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/patterns/ContactForm";
import { DirectContactLinks } from "@/components/patterns/DirectContactLinks";

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
    <section className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {dict.hero.headline}
        </h1>
        <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
          {dict.hero.intro}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {dict.booking.prompt}{" "}
          <Link href={`/${locale}/schedule`} className="font-medium text-accent-strong hover:underline">
            {dict.booking.linkLabel}
          </Link>
        </p>

        <div className="mt-6">
          <DirectContactLinks
            heading={dict.directContact.heading}
            emailLabel={dict.directContact.emailLabel}
            phoneLabel={dict.directContact.phoneLabel}
            whatsappLabel={dict.directContact.whatsappLabel}
            whatsappMessage={dict.directContact.whatsappMessage}
          />
        </div>

        <div className="mt-12">
          <ContactForm dict={dict} locale={locale} />
        </div>
      </Container>
    </section>
  );
}
