export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-border border-t border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
            <span className="text-sm font-medium text-ink sm:text-base">
              {item.question}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="mt-1 flex-shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45"
            >
              <path d="M8 2v12M2 8h12" />
            </svg>
          </summary>
          <p className="mt-2.5 max-w-[65ch] text-sm leading-relaxed text-ink-soft">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
