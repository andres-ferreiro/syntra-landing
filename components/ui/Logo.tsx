import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/images/syntra-logo.png"
      alt="Syntra"
      width={size}
      height={size}
      className="flex-shrink-0"
      priority
    />
  );
}
