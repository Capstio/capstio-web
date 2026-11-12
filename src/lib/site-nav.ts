// Navigation structure shared by the header and the footer. Labels live in the
// dictionaries under the same keys.

export const featureKeys = [
  "apps",
  "docker",
  "safeConfig",
  "terminal",
  "recipes",
  "alerts",
  "sshSecurity",
  "tunnels",
  "ai",
  "teams",
] as const;
export type FeatureKey = (typeof featureKeys)[number];

export const featureHref: Record<FeatureKey, string> = {
  apps: "/features/apps",
  docker: "/features/docker",
  safeConfig: "/features/safe-config",
  terminal: "/features/terminal",
  recipes: "/features/recipes",
  alerts: "/features/alerts",
  sshSecurity: "/features/ssh-security",
  tunnels: "/features/tunnels",
  ai: "/features/ai",
  teams: "/features/teams",
};

export const solutionKeys = ["agency", "indie", "startupOps"] as const;
export type SolutionKey = (typeof solutionKeys)[number];

export const solutionHref: Record<SolutionKey, string> = {
  agency: "/solutions/agency",
  indie: "/solutions/indie-developer",
  startupOps: "/solutions/startup-ops",
};

export const topLinkHref = {
  compare: "/compare",
  insights: "/insights",
  releaseNotes: "/release-notes",
} as const;

export const ctaHref = {
  beta: "/beta",
  download: "/download",
} as const;

export const allFeaturesHref = "/features";

// Footer columns. Column titles come from `footer.columns.<id>` and link labels
// from `footer.links.<id>` in the dictionaries.
export type FooterColumn = {
  id: "features" | "technology" | "solutions" | "resources" | "company";
  links: { id: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    id: "features",
    links: [
      { id: "allFeatures", href: allFeaturesHref },
      ...featureKeys.map((key) => ({ id: key, href: featureHref[key] })),
    ],
  },
  {
    id: "technology",
    links: [
      { id: "dockerManager", href: "/technology/docker-manager" },
      { id: "pm2Gui", href: "/technology/pm2-gui" },
      { id: "systemdGui", href: "/technology/systemd-gui" },
      { id: "sshClient", href: "/technology/ssh-client-for-mac" },
    ],
  },
  {
    id: "solutions",
    links: solutionKeys.map((key) => ({ id: key, href: solutionHref[key] })),
  },
  {
    id: "resources",
    links: [
      { id: "insights", href: topLinkHref.insights },
      { id: "releaseNotes", href: topLinkHref.releaseNotes },
      { id: "compare", href: topLinkHref.compare },
      { id: "faq", href: "/faq" },
      { id: "rss", href: "/rss.xml" },
    ],
  },
  {
    id: "company",
    links: [
      { id: "about", href: "/about" },
      { id: "brand", href: "/brand" },
      { id: "security", href: "/security" },
      { id: "privacy", href: "/privacy" },
      { id: "terms", href: "/terms" },
    ],
  },
];
