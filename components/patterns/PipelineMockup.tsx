const CARDS_PER_STAGE = [2, 2, 1, 1, 1, 2];

const PLACEHOLDER_CONTACTS = [
  { name: "Sarah Chen", company: "Local Service Co." },
  { name: "Marcus Webb", company: "North Clinic Group" },
  { name: "Elena Ruiz", company: "Riverside Realty" },
  { name: "James Patel", company: "Harbor Events" },
  { name: "Priya Nair", company: "Bright Dental" },
  { name: "Tom Ricci", company: "Metro Fitness" },
  { name: "Aisha Bello", company: "Coastal Cafe" },
  { name: "Daniel Kim", company: "Summit Consulting" },
  { name: "Laura Novak", company: "Greenline Auto" },
];

const STAGE_COLORS = [
  { dot: "#64748b", tint: "#f1f5f9", text: "#475569" },
  { dot: "#0ea5e9", tint: "#eaf6fe", text: "#0369a1" },
  { dot: "#8b5cf6", tint: "#f4f0fe", text: "#6d28d9" },
  { dot: "#f59e0b", tint: "#fef6e7", text: "#b45309" },
  { dot: "#fb7185", tint: "#fef1f2", text: "#be123c" },
  { dot: "#22c55e", tint: "#eefdf3", text: "#15803d" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function PipelineMockup({ stages }: { stages: string[] }) {
  let cardIndex = 0;
  const counts = stages.map((_, i) => CARDS_PER_STAGE[i % CARDS_PER_STAGE.length]);
  const total = counts.reduce((sum, n) => sum + n, 0);

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
      </div>

      <div className="flex gap-3 overflow-x-auto p-4">
        {stages.map((stage, stageIdx) => {
          const color = STAGE_COLORS[stageIdx % STAGE_COLORS.length];
          const count = counts[stageIdx];

          return (
            <div key={stage} className="w-44 flex-shrink-0">
              <div className="mb-2.5 flex items-center gap-2 px-1">
                <span
                  className="h-2 w-2 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: color.dot }}
                />
                <span className="flex-1 truncate text-xs font-medium text-ink-soft">
                  {stage}
                </span>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: color.tint, color: color.text }}
                >
                  {count}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: count }).map((_, i) => {
                  const contact =
                    PLACEHOLDER_CONTACTS[cardIndex % PLACEHOLDER_CONTACTS.length];
                  cardIndex += 1;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg bg-paper px-2.5 py-2 transition-colors duration-200 hover:bg-accent-soft"
                    >
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                        style={{ backgroundColor: color.tint, color: color.text }}
                      >
                        {initials(contact.name)}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-xs font-medium text-ink">
                          {contact.name}
                        </span>
                        <span className="truncate text-[10px] text-ink-soft">
                          {contact.company}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border px-4 py-2.5 text-[10px] text-ink-soft">
        {total} open opportunities
      </div>
    </div>
  );
}
