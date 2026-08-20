import { ServiceIcon } from "@/components/patterns/ServiceIcon";

export function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink">
      <ServiceIcon title={title} />
      <h3 className="mt-4 text-xl font-medium text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}
