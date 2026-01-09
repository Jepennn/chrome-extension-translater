import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sidePanel.css";
import { SidePanelApp } from "./SidePanelApp";

createRoot(document.getElementById("root-side-panel")!).render(
  <StrictMode>
    <SidePanelApp />
  </StrictMode>
);
