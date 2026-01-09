import { Button } from "@/components/ui/button";
import { Book, Settings, Home, Languages, MessageSquare } from "lucide-react";
import type { AppViews } from "@/types";
import { cn } from "@/lib/utils";

interface SidePanelMenuProps {
  onNavigate: (view: AppViews) => void;
}

export function SidePanelMenu({ onNavigate }: SidePanelMenuProps) {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header Section with Wave */}
      <div className="relative w-full bg-linear-to-br from-yellow-300 via-orange-200 to-yellow-100 pb-12 pt-8 px-6 rounded-b-[40px] shadow-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner border border-white/30">
            <span className="text-3xl font-bold text-yellow-900">L</span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-yellow-950">Learnly</h1>
            <p className="text-xs font-medium text-yellow-800/80">Premium User • Lv. 3</p>
          </div>
          
          {/* Stats Row (Cosmetic based on inspiration) */}
          <div className="flex w-full justify-between mt-4 px-2">
            <div className="flex flex-col items-center">
              <div className="p-1.5 bg-white/30 rounded-full mb-1">
                 <Languages className="size-3 text-yellow-900" />
              </div>
              <span className="text-[10px] font-bold text-yellow-900">12</span>
              <span className="text-[9px] text-yellow-800/70">Langs</span>
            </div>
            <div className="w-px h-8 bg-yellow-900/10 self-center mx-1"></div>
            <div className="flex flex-col items-center">
              <div className="p-1.5 bg-white/30 rounded-full mb-1">
                 <Book className="size-3 text-yellow-900" />
              </div>
              <span className="text-[10px] font-bold text-yellow-900">4.9</span>
              <span className="text-[9px] text-yellow-800/70">Words</span>
            </div>
            <div className="w-px h-8 bg-yellow-900/10 self-center mx-1"></div>
             <div className="flex flex-col items-center">
              <div className="p-1.5 bg-white/30 rounded-full mb-1">
                 <MessageSquare className="size-3 text-yellow-900" />
              </div>
              <span className="text-[10px] font-bold text-yellow-900">24</span>
              <span className="text-[9px] text-yellow-800/70">Trans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 mt-2">
        <MenuOption 
          icon={<Book className="size-5" />} 
          label="Dictionary" 
          onClick={() => onNavigate("dictionary")} 
          colorClass="text-orange-500 bg-orange-100/50"
        />
        <MenuOption 
          icon={<Settings className="size-5" />} 
          label="Settings" 
          onClick={() => onNavigate("settings")} 
          colorClass="text-amber-600 bg-amber-100/50"
        />
        
        {/* Placeholder for future options to match list length in inspiration */}
        <MenuOption 
          icon={<MessageSquare className="size-5" />} 
          label="History (Coming Soon)" 
          onClick={() => {}} 
          colorClass="text-yellow-700 bg-yellow-50 opacity-60 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

interface MenuOptionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  colorClass: string;
}

function MenuOption({ icon, label, onClick, colorClass }: MenuOptionProps) {
  return (
    <Button
      variant="ghost"
      className="w-full h-14 justify-start px-4 py-2 bg-card border border-border/40 hover:bg-accent/50 rounded-2xl shadow-xs transition-all duration-200 group"
      onClick={onClick}
    >
      <div className={cn("flex items-center justify-center p-2 rounded-xl mr-4 transition-colors", colorClass)}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-foreground group-hover:text-foreground/80">{label}</span>
    </Button>
  );
}
