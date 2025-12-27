import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dictionary } from "./dictionary";

type Step = {
  title: string;
  description: string;
  badge: string;
};

const steps: Step[] = [
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

  const [showDictionary, setShowDictionary] = useState(false);

  const activeStep = steps[activeIndex];

  const goTo = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    setActiveIndex(index);
  };
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const openDictionary = () => {
    setShowDictionary(true);
  };

  const closeDictionary = () => {
    setShowDictionary(false);
  };

  return (
    <>
      {showDictionary ? (
        <Dictionary onClose={closeDictionary} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-background px-3 py-3">
          <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 text-foreground">
                <div className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Live in your browser
                </div>
                <h1 className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-base font-semibold leading-tight text-transparent">
                  Your AI translation sidekick
                </h1>
                <p className="text-xs text-muted-foreground">
                  Translate and expand your vocabulary with help of local AI.
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 text-right">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Preview
                </span>
                <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-foreground">
                  {activeIndex + 1} / {steps.length}
                </span>
              </div>
            </div>

            {/* Carousel card */}
            <div className="relative flex flex-1 flex-col justify-between rounded-xl border border-border bg-card px-3 py-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-primary">
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
                        index === activeIndex
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-muted hover:bg-muted/80",
                      ].join(" ")}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 text-foreground">
                <h2 className="text-sm font-semibold">{activeStep.title}</h2>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {activeStep.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="size-1 rounded-full bg-primary" />
                  Works on any page you have open
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[11px] text-muted-foreground hover:bg-muted"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                  >
                    Back
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-[11px] font-semibold"
                    onClick={goNext}
                    disabled={activeIndex === steps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer / Dictionary CTA */}
            <Button onClick={openDictionary} className="w-full h-9 text-[11px] font-semibold">
              View Dictionary
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
