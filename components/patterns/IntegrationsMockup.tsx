import Image from "next/image";
import { ParticleSphere } from "@/components/ui/particle-sphere";
import { OrbitingCirclesGlobe, type OrbitRing } from "@/components/ui/orbiting-circles-globe";
import { logoDevUrl } from "@/lib/logo-dev";

// Instagram and WhatsApp use the local brand assets in public/images/;
// Facebook and Google Calendar still come from logo.dev since no local
// asset exists for those yet.
function LocalChannelIcon({ name, src }: { name: string; src: string }) {
  return <Image src={src} alt={name} width={22} height={22} className="rounded-sm sm:size-7" />;
}

function ChannelIcon({ name, domain }: { name: string; domain: string }) {
  return (
    <Image src={logoDevUrl(domain, 64)} alt={name} width={18} height={18} className="rounded-sm sm:size-6" />
  );
}

const ORBITS: OrbitRing[] = [
  {
    size: "w-56 h-56 sm:w-72 sm:h-72",
    duration: 28,
    icons: [
      { content: <LocalChannelIcon name="Instagram" src="/images/insta-icon.png" />, angle: -30 },
      { content: <ChannelIcon name="Facebook" domain="facebook.com" />, angle: 30 },
    ],
  },
  {
    size: "w-76 h-76 sm:w-96 sm:h-96",
    duration: 38,
    icons: [
      { content: <LocalChannelIcon name="WhatsApp" src="/images/whatsapp-icon.webp" />, angle: -30 },
      { content: <ChannelIcon name="Google Calendar" domain="calendar.google.com" />, angle: 30 },
    ],
  },
];

export function IntegrationsMockup() {
  return (
    <div className="absolute inset-0">
      <OrbitingCirclesGlobe center={<ParticleSphere />} orbits={ORBITS} />
    </div>
  );
}
