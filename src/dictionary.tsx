import { Button } from "./components/ui/button";

export function Dictionary({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background px-3 py-3">
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        <h1>Dictionary</h1>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
