import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootShell } from "@/routes/__root";
import { Index } from "@/routes/index";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootShell>
      <Index />
    </RootShell>
  </StrictMode>,
);
