import { cn } from "@/lib/cn";

// Equivalent-command strip: shows the real shell command in mono type.
export function CodeStrip({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "type-mono block overflow-x-auto rounded-md border border-line bg-code px-4 py-3 whitespace-nowrap text-body in-data-[surface=dark]:text-accent dark:text-accent",
        className,
      )}
    >
      {children}
    </code>
  );
}
