import type { ChatMessage } from "@/content/types";

export function AiConversationMockup({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent-strong">
          AI
        </span>
        <span className="text-xs font-medium text-ink-soft">Syntra Assistant</span>
      </div>
      <div className="flex flex-col gap-2.5 p-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              message.from === "ai"
                ? "self-start rounded-tl-sm bg-paper text-ink"
                : "self-end rounded-tr-sm bg-ink text-paper"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}
