function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 flex-shrink-0 text-accent-strong"
    >
      <path d="M3.5 9.5 7 13l7.5-8" />
    </svg>
  );
}

export function PainPointList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-ink">
          <CheckIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}
