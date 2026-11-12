import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ButtonLink,
  Button,
  Card,
  CodeStrip,
  Container,
  Logo,
  LogoMark,
  Overline,
  Section,
  StatusBadge,
} from "@/components/ui";
import { hasLocale } from "@/lib/i18n";

// Internal reference page for the foundations and base components. Labels are
// developer-facing, so they are not part of the translated dictionaries.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const ramps: { name: string; steps: string[] }[] = [
  { name: "neutral", steps: [...steps, "1000"] },
  { name: "blue", steps },
  { name: "mint", steps },
  { name: "slate", steps: ["0", ...steps.filter((s) => s !== "")] },
  { name: "red", steps: ["50", "300", "600", "950"] },
  { name: "amber", steps: ["50", "300", "600", "950"] },
  { name: "green", steps: ["50", "300", "600", "950"] },
];

const semantic: { token: string; cssVar: string; use: string }[] = [
  { token: "bg/page", cssVar: "--bg-page", use: "Default page background" },
  { token: "bg/subtle", cssVar: "--bg-subtle", use: "Alternating blocks" },
  { token: "bg/surface", cssVar: "--bg-surface", use: "Cards, tables" },
  { token: "bg/code", cssVar: "--bg-code", use: "Equivalent-command strip" },
  { token: "bg/terminal", cssVar: "--bg-terminal", use: "Terminal block, always dark" },
  { token: "text/heading", cssVar: "--text-heading", use: "H1 to H4" },
  { token: "text/body", cssVar: "--text-body", use: "Paragraphs" },
  { token: "text/muted", cssVar: "--text-muted", use: "Captions, hints" },
  { token: "text/accent", cssVar: "--text-accent", use: "Overline" },
  { token: "text/link", cssVar: "--text-link", use: "Inline links" },
  { token: "text/on-action", cssVar: "--text-on-action", use: "Text on primary button" },
  { token: "action/primary", cssVar: "--action-primary", use: "Beta CTA" },
  { token: "action/primary-hover", cssVar: "--action-primary-hover", use: "CTA hover" },
  { token: "action/focus", cssVar: "--action-focus", use: "Keyboard focus ring" },
  { token: "border/default", cssVar: "--border-default", use: "Dividers, card borders" },
  { token: "border/strong", cssVar: "--border-strong", use: "Inputs, secondary buttons" },
  { token: "accent/signal", cssVar: "--accent-signal", use: "Dots, accents, never text" },
  { token: "status/success", cssVar: "--status-success", use: "Running, safe" },
  { token: "status/warning", cssVar: "--status-warning", use: "Needs confirmation" },
  { token: "status/danger", cssVar: "--status-danger", use: "Danger, error" },
];

const typeScale: { cls: string; name: string; sample: string; spec: string }[] = [
  { cls: "type-display", name: "Display", sample: "Một chiếc Mac, mọi VPS", spec: "64/72 · 700 · mobile 40/48" },
  { cls: "type-h1", name: "H1", sample: "Sửa config có diff và khôi phục", spec: "48/58 · 700 · mobile 34/42" },
  { cls: "type-h2", name: "H2", sample: "Lệnh thật, không cần phải nhớ", spec: "36/46 · 700 · mobile 28/36" },
  { cls: "type-h3", name: "H3", sample: "Docker, PM2, systemd trong một danh sách", spec: "24/32 · 600 · mobile 22/30" },
  { cls: "type-h4", name: "H4", sample: "Tự sao lưu trước mỗi lần lưu", spec: "20/28 · 600 · mobile 18/26" },
  { cls: "type-body-l", name: "Body L", sample: "Chỉ cần SSH, không cài agent lên VPS.", spec: "18/30 · 400 · mobile 17/28" },
  { cls: "type-body", name: "Body", sample: "Mọi nút bấm đều hiện lệnh shell thật kèm nút copy.", spec: "16/26 · 400" },
  { cls: "type-small", name: "Small", sample: "macOS 15+ · Ưu tiên Apple Silicon", spec: "14/22 · 400" },
  { cls: "type-caption", name: "Caption", sample: "Ngày đối chiếu: 05/10/2026", spec: "12/18 · 400" },
  { cls: "type-overline", name: "Overline", sample: "Lệnh tương đương", spec: "12/16 · 600 · +1.4 · uppercase" },
  { cls: "type-button", name: "Button", sample: "Đăng ký beta", spec: "15/20 · 600" },
  { cls: "type-mono", name: "Mono", sample: "cd /opt/demo-api && docker compose restart", spec: "14/22 · JetBrains Mono" },
  { cls: "type-mono-s", name: "Mono S", sample: "~/.ssh/config", spec: "12/18 · JetBrains Mono" },
];

const spacing = [
  ["space/1", "4", "p-1"], ["space/2", "8", "p-2"], ["space/3", "12", "p-3"],
  ["space/4", "16", "p-4"], ["space/6", "24", "p-6"], ["space/8", "32", "p-8"],
  ["space/12", "48", "p-12"], ["space/16", "64", "p-16"], ["space/24", "96", "p-24"],
  ["space/32", "128", "p-32"],
];

const logoSizes = [[64, "size-16"], [40, "size-10"], [24, "size-6"], [16, "size-4"]] as const;

const radii = [
  ["radius/sm", "6", "rounded-sm", "Chip, small command strip"],
  ["radius/md", "10", "rounded-md", "Buttons, inputs"],
  ["radius/lg", "16", "rounded-lg", "Feature cards"],
  ["radius/xl", "24", "rounded-xl", "App screenshot frame"],
  ["radius/full", "999", "rounded-full", "Status badge"],
];

const shadows = [
  ["shadow/sm", "0 1 2 · 8%", "shadow-sm", "Resting card"],
  ["shadow/md", "0 4 12 · 10%", "shadow-md", "Hover, menu"],
  ["shadow/lg", "0 16 40 · 14%", "shadow-lg", "Dropdown menu"],
  ["shadow/window", "0 24 64 · 22%", "shadow-window", "App window screenshot"],
];

function Block({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 first:mt-0">
      <h2 className="type-h3 text-heading">{title}</h2>
      {note && <p className="type-small mt-2 max-w-3xl text-muted">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function DesignSystemPage({
  params,
}: PageProps<"/[lang]/design-system">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <Section surface="light" className="py-12 lg:py-16">
      <Container>
        <Overline>Foundations</Overline>
        <h1 className="type-h1 mt-3 text-heading">Capstio design system</h1>
        <p className="type-body-l mt-4 max-w-3xl text-body">
          Tokens and base components for the marketing website, mirrored from the Figma
          Foundations section. Use the theme button in the header to compare light and dark.
        </p>

        <div className="mt-16 space-y-16">
          <Block
            title="Color primitives"
            note="Raw values. Pages never use these directly, they only feed the semantic tokens."
          >
            <div className="space-y-6">
              {ramps.map((ramp) => (
                <div key={ramp.name}>
                  <p className="type-small mb-2 font-semibold text-heading">{ramp.name}</p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
                    {ramp.steps.map((step) => (
                      <div key={step}>
                        <div
                          className="h-14 rounded-md border border-line"
                          style={{ backgroundColor: `var(--color-${ramp.name}-${step})` }}
                        />
                        <p className="type-mono-s mt-1 text-muted">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block
            title="Semantic tokens"
            note="Resolved for the active theme. Toggle the theme to see the light and dark values."
          >
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="type-small w-full min-w-[40rem] text-left">
                <thead className="bg-subtle text-heading">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Token</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                    <th className="px-4 py-3 font-semibold">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {semantic.map((row) => (
                    <tr key={row.token} className="border-t border-line">
                      <td className="type-mono-s px-4 py-2.5 text-heading">{row.token}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className="inline-block h-6 w-12 rounded-sm border border-line align-middle"
                          style={{ backgroundColor: `var(${row.cssVar})` }}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-muted">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <Block
            title="Color contexts"
            note="One block, one context. Dark keeps dark tokens in both themes."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {(["light", "subtle", "dark"] as const).map((surface) => (
                <div
                  key={surface}
                  data-surface={surface}
                  className="rounded-lg border border-line p-6"
                >
                  <Overline>Sắp ra mắt</Overline>
                  <p className="type-h4 mt-2 text-heading">Quản lý mọi VPS từ một chiếc Mac.</p>
                  <p className="type-small mt-2 text-body">
                    Docker, PM2, systemd, file config và terminal trong một app native.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <ButtonLink href="#" size="md">Đăng ký beta</ButtonLink>
                    <ButtonLink href="#" variant="link">Xem tính năng</ButtonLink>
                  </div>
                  <CodeStrip className="mt-4">docker compose restart</CodeStrip>
                  <div className="mt-3"><StatusBadge>Đang chạy</StatusBadge></div>
                  <p className="type-caption mt-4 font-semibold text-heading">{surface}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Typography" note="Inter for content, JetBrains Mono for commands and paths. Resize the window to see mobile sizes.">
            <div className="divide-y divide-line border-y border-line">
              {typeScale.map((row) => (
                <div key={row.name} className="grid gap-1 py-4 md:grid-cols-[8rem_1fr_16rem] md:items-baseline md:gap-6">
                  <p className="type-small font-semibold text-heading">{row.name}</p>
                  <p className={`${row.cls} text-heading`}>{row.sample}</p>
                  <p className="type-mono-s text-muted">{row.spec}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Spacing" note="4px base scale, identical to Tailwind's default (p-1 = 4px).">
            <div className="flex flex-wrap items-end gap-6">
              {spacing.map(([name, px, cls]) => (
                <div key={name}>
                  <div className="bg-action" style={{ width: `${px}px`, height: "96px", maxWidth: "128px" }} />
                  <p className="type-small mt-2 font-semibold text-heading">{px}</p>
                  <p className="type-mono-s text-muted">{name}</p>
                  <p className="type-mono-s text-muted">{cls}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Radius">
            <div className="flex flex-wrap gap-6">
              {radii.map(([name, px, cls, use]) => (
                <div key={name} className="w-36">
                  <div className={`h-20 border border-action bg-blue-50 ${cls}`} />
                  <p className="type-mono-s mt-2 text-heading">{name} · {px}</p>
                  <p className="type-caption text-muted">{use}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Elevation" note="Neutral black shadows.">
            <div className="grid gap-4 rounded-lg bg-subtle p-6 sm:grid-cols-2 lg:grid-cols-4">
              {shadows.map(([name, spec, cls, use]) => (
                <div key={name}>
                  <div className={`h-20 rounded-md bg-surface ${cls}`} />
                  <p className="type-mono-s mt-3 text-heading">{name} · {spec}</p>
                  <p className="type-caption text-muted">{use}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Logo" note="Spelled Capstio. The mark follows the context: color on light, white ring and mint dot on dark.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div data-surface="light" className="flex h-32 items-center justify-center rounded-lg border border-line"><Logo /></div>
              <div data-surface="subtle" className="flex h-32 items-center justify-center rounded-lg border border-line"><Logo /></div>
              <div data-surface="dark" className="flex h-32 items-center justify-center rounded-lg border border-line"><Logo /></div>
            </div>
            <div className="mt-4 flex items-end gap-6">
              {logoSizes.map(([size, cls]) => (
                <div key={size} className="text-center">
                  <LogoMark className={cls} />
                  <p className="type-mono-s mt-2 text-muted">{size}px</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Components">
            <div className="space-y-8">
              <div>
                <p className="type-small mb-3 font-semibold text-heading">Button</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Đăng ký beta</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="link">Xem tính năng</Button>
                  <Button size="lg">Large</Button>
                  <Button disabled className="opacity-50">Disabled</Button>
                </div>
              </div>
              <div>
                <p className="type-small mb-3 font-semibold text-heading">Status badge</p>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge tone="success">Đang chạy</StatusBadge>
                  <StatusBadge tone="warning">Cần xác nhận</StatusBadge>
                  <StatusBadge tone="danger">Nguy hiểm</StatusBadge>
                </div>
              </div>
              <div>
                <p className="type-small mb-3 font-semibold text-heading">Code strip</p>
                <CodeStrip className="max-w-xl">cd /opt/demo-api &amp;&amp; docker compose restart</CodeStrip>
              </div>
              <div>
                <p className="type-small mb-3 font-semibold text-heading">Card</p>
                <Card className="max-w-sm">
                  <p className="type-h4 text-heading">Apps</p>
                  <p className="type-small mt-2 text-body">Docker Compose, PM2 và systemd trong một danh sách.</p>
                </Card>
              </div>
            </div>
          </Block>
        </div>
      </Container>
    </Section>
  );
}
