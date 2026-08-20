export function IndustryCard({ name }: { name: string }) {
  return (
    <span className="rounded-pill border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink">
      {name}
    </span>
  );
}
