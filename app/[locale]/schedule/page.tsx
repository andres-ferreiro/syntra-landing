import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getContactDictionary } from "@/content/get-contact-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CalendarEmbed } from "@/components/patterns/CalendarEmbed";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/schedule">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getContactDictionary(locale);

  return buildPageMetadata(locale, {
    title: dict.schedule.meta.title,
    description: dict.schedule.meta.description,
    path: "/schedule",
  });
}

export default async function SchedulePage({ params }: PageProps<"/[locale]/schedule">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getContactDictionary(locale);

  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {dict.schedule.headline}
        </h1>
        <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
          {dict.schedule.intro}
        </p>

        <div className="mt-10">
          <CalendarEmbed unavailableMessage={dict.booking.unavailable} />
        </div>
      </Container>
    </section>
  );
}
