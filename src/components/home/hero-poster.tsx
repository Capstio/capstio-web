import Image from "next/image";
import posterDark from "../../../public/hero/poster-dark.jpg";
import posterLight from "../../../public/hero/poster-light.jpg";

// 1100px wide on desktop, the full container width (minus gutters) below it.
const sizes =
  "(min-width: 1164px) 1100px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";

// Still frame of the hero film for the active theme (exported from Figma).
// Only the visible image is downloaded: both are lazy and the other one is
// display: none.
export function HeroPoster({ alt }: { alt: string }) {
  return (
    <>
      <Image
        src={posterLight}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        className="object-cover dark:hidden"
      />
      <Image
        src={posterDark}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        className="hidden object-cover dark:block"
      />
    </>
  );
}
