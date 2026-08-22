import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const LOGO_ASPECT_RATIO = 836 / 216;
const LOGO_HEIGHT = 48;

let logoSrcPromise: Promise<string> | null = null;

function getLogoSrc(): Promise<string> {
  if (!logoSrcPromise) {
    logoSrcPromise = readFile(
      join(process.cwd(), "public/images/mandhy-logo.png")
    ).then((data) => `data:image/png;base64,${data.toString("base64")}`);
  }
  return logoSrcPromise;
}

export async function renderOgImage(title: string) {
  const logoSrc = await getLogoSrc();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#faf9f6",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={Math.round(LOGO_HEIGHT * LOGO_ASPECT_RATIO)}
          height={LOGO_HEIGHT}
          alt=""
        />
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          lineHeight: 1.15,
          color: "#13151a",
          maxWidth: 920,
        }}
      >
        {title}
      </div>
    </div>
  );
}
