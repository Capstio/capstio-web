import type { ComponentProps } from "react";
import { AppleIcon } from "./apple-icon";
import { ButtonLink } from "./button";

// The primary call to action of the site: always "Download Capstio" with the Apple logo.
export function DownloadButton({
  children,
  ...props
}: ComponentProps<typeof ButtonLink>) {
  return (
    <ButtonLink {...props}>
      <AppleIcon className="size-4" />
      {children}
    </ButtonLink>
  );
}
