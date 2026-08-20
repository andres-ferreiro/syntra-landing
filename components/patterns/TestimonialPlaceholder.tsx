// Built per the brief's minimum component list, but intentionally NOT
// rendered on the homepage — there is no real client evidence yet
// (PRODUCT.md: never fabricate testimonials/logos/stats). Wire this up
// once real testimonials exist.
export function TestimonialPlaceholder({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="rounded-card border border-border bg-surface p-8">
      <blockquote className="text-lg leading-relaxed text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm text-ink-soft">{attribution}</figcaption>
    </figure>
  );
}
