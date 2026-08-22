// logo.dev image API — publishable key, safe to expose client-side (same
// trust model as a Stripe publishable key). Used to pull real brand marks
// for the Integrations tile instead of hand-drawing icons for every channel.
const LOGO_DEV_PUBLISHABLE_KEY = "pk_CtoMTUelTKubCwJ8RxrV-Q";

export function logoDevUrl(domain: string, size = 64) {
  const params = new URLSearchParams({
    token: LOGO_DEV_PUBLISHABLE_KEY,
    size: String(size),
    format: "png",
  });
  return `https://img.logo.dev/${domain}?${params.toString()}`;
}
