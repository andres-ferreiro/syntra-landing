export function SectionHeader({
  headline,
  subcopy,
  align = "left",
}: {
  headline: string;
  subcopy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {headline}
      </h2>
      {subcopy ? (
        <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-ink-soft">
          {subcopy}
        </p>
      ) : null}
    </div>
  );
}
