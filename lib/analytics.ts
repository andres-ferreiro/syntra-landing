// TODO(Phase 5): wire to a real analytics vendor and CRM intake webhook.
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics] ${name}`, props ?? {});
  }
}
