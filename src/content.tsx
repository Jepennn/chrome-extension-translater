// Now import and initialize React (this happens after listener is set up)
import React from "react";
import { createRoot } from "react-dom/client";
import { TooltipTranslation } from "./tooltipTranslation";

const container = document.createElement("div");
container.id = "translation-overlay-root";
document.body.appendChild(container);

createRoot(container).render(
  <React.StrictMode>
    <TooltipTranslation />
  </React.StrictMode>
);
