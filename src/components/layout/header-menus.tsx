import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import {
  allFeaturesHref,
  featureHref,
  featureKeys,
  solutionHref,
  solutionKeys,
} from "@/lib/site-nav";
import { localizedHref } from "@/lib/cn";

type MenuProps = {
  lang: string;
  dict: Pick<Dictionary, "features" | "solutions" | "header">;
  onNavigate: () => void;
};

const panel =
  "absolute top-[calc(100%+0.5rem)] left-0 z-10 rounded-lg border border-line bg-surface p-4 shadow-lg";

const item =
  "block rounded-md px-3 py-2.5 transition-colors hover:bg-heading/10 motion-reduce:transition-none";

export function FeaturesMenu({ lang, dict, onNavigate }: MenuProps) {
  return (
    <div id="menu-features" className={`${panel} w-[43.25rem]`}>
      <ul className="grid grid-cols-2 gap-x-4">
        {featureKeys.map((key) => (
          <li key={key}>
            <Link
              href={localizedHref(lang, featureHref[key])}
              onClick={onNavigate}
              className={item}
            >
              <span className="type-small block font-semibold text-heading">
                {dict.features[key].title}
              </span>
              <span className="type-caption block text-muted">
                {dict.features[key].description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={localizedHref(lang, allFeaturesHref)}
        onClick={onNavigate}
        className="type-small mt-2 inline-flex items-center gap-2 px-3 py-2 font-medium text-link hover:underline"
      >
        {dict.header.allFeatures}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}

export function SolutionsMenu({ lang, dict, onNavigate }: MenuProps) {
  return (
    <ul id="menu-solutions" className={`${panel} w-[22.5rem]`}>
      {solutionKeys.map((key) => (
        <li key={key}>
          <Link
            href={localizedHref(lang, solutionHref[key])}
            onClick={onNavigate}
            className={item}
          >
            <span className="type-small block font-semibold text-heading">
              {dict.solutions[key].title}
            </span>
            <span className="type-caption block text-muted">
              {dict.solutions[key].description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
