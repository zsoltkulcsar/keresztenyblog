import { useEffect, type ReactNode } from "react";

const fontHref =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&family=Lora:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap";

function ensureHeadLink(id: string, href: string, rel: string, crossOrigin?: string) {
  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.href = href;
  link.rel = rel;

  if (crossOrigin) {
    link.crossOrigin = crossOrigin;
  }

  document.head.appendChild(link);
}

export function RootShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "hu";
    ensureHeadLink("font-preconnect-google", "https://fonts.googleapis.com", "preconnect");
    ensureHeadLink(
      "font-preconnect-gstatic",
      "https://fonts.gstatic.com",
      "preconnect",
      "anonymous",
    );
    ensureHeadLink("font-keskeny-ut", fontHref, "stylesheet");
  }, []);

  return <>{children}</>;
}
