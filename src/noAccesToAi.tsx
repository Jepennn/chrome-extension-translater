import { Button } from "@/components/ui/button";

export function NoAccessToAi() {
  const handleLearnMore = () => {
    // Open a new tab with detailed requirements information
    window.open("https://developer.chrome.com/docs/ai/built-in", "_blank");
  };

  return (
    <div className="flex h-full w-full items-start justify-start bg-background px-3 py-3">
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        {/* Header */}
        <div className="space-y-1 text-foreground">
          <div className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-medium text-destructive">
            <span className="size-1.5 rounded-full bg-destructive" />
            Chrome Local AI Not Available
          </div>
          <h1 className="text-base font-semibold leading-tight text-foreground mt-4">
            Translation API Not Found
          </h1>
          <p className="text-xs text-muted-foreground">
            This extension requires Chrome's built-in AI features to work. Your environment does not
            for fulfill all the requirements at the moment. Often it's just a small change that
            needs to be made to your environment to get it to work. Check out our get started guide
            to learn more.
          </p>
        </div>

        {/* CTA Button */}
        <Button onClick={handleLearnMore} className="w-full h-9 text-[11px] font-semibold">
          Get Started Guide
        </Button>
      </div>
    </div>
  );
}
