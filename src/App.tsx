import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dictionary } from "./dictionary";
import { NoAccessToAi } from "./noAccesToAi";
import { ProfileSettings } from "./profileSettings";

//Importing custom types
import type { IntroductionStep, AppViews } from "./types";

const steps: IntroductionStep[] = [
  {
    title: "Highlight & translate instantly",
    description:
      "Select any text on the page and get an instant translation without leaving what you’re doing.",
    badge: "Step 1",
  },
  {
    title: "Save words and phrases to your dictionary",
    description:
      "Save words and phrases to your dictionary so you can learn them and reuse them later.",
    badge: "Step 2",
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAccessAI] = useState("Translator" in window);
  const [appView, setAppView] = useState<AppViews>("settings");

  const activeStep = steps[activeIndex];
  const goTo = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    setActiveIndex(index);
  };
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const openView = (view: AppViews) => {
    setAppView(view);
  };

  // If the user doesnt have access to chrome local AI, show requirements
  if (!hasAccessAI) {
    return <NoAccessToAi />;
  }

  if (appView === "settings" && hasAccessAI) {
    return <ProfileSettings onClose={() => openView("introduction")} />;
  }

  if (appView === "dictionary") {
    return <Dictionary onClose={() => openView("introduction")} />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-background px-3 py-3">
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 text-foreground">
            <h1 className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-base font-semibold leading-tight text-transparent">
              Your AI translation sidekick
            </h1>
            <p className="text-xs text-muted-foreground">
              Translate and expand your vocabulary with help of local AI.
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-[10px] bg-muted text-foreground hover:bg-muted/80"
              >
                ☰ Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 border-border p-1">
              <DropdownMenuLabel className="text-[10px] px-2 py-1">Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-[10px] cursor-pointer py-1.5 px-2"
                onClick={() => openView("introduction")}
              >
                🏠 Home
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-[10px] cursor-pointer py-1.5 px-2"
                onClick={() => openView("dictionary")}
              >
                📚 Dictionary
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-[10px] cursor-pointer py-1.5 px-2"
                onClick={() => openView("settings")}
              >
                ⚙️ Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Carousel card */}
        <div className="relative flex flex-1 flex-col rounded-xl border border-border bg-card px-4 py-4">
          {/* Header with badge and dots */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary ring-2 ring-primary/40" />
              {activeStep.badge}
            </span>

            <div className="flex items-center gap-1.5">
              {steps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  className={[
                    "h-1.5 rounded-full transition-all",
                    index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted hover:bg-muted/80",
                  ].join(" ")}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 text-foreground">
            <h2 className="text-base font-semibold leading-tight">{activeStep.title}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {activeStep.description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4">
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-3 text-[10px] text-muted-foreground hover:bg-muted"
                onClick={goPrev}
                disabled={activeIndex === 0}
              >
                Back
              </Button>
              <Button
                size="sm"
                className="h-7 px-3 text-[10px] font-semibold"
                onClick={goNext}
                disabled={activeIndex === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
