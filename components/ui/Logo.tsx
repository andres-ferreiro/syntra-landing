import Image from "next/image";

const LOGO_ASPECT_RATIO = 836 / 216;

export function Logo({ height = 28, className = "" }: { height?: number; className?: string }) {
  return (
    <Image
      src="/images/mandhy-logo.png"
      alt="mandhy"
      width={Math.round(height * LOGO_ASPECT_RATIO)}
      height={height}
      className={`flex-shrink-0 ${className}`}
      priority
    />
  );
}
