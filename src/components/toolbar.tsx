import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";
import { useSearchStore } from "@/hooks/useSearchStore";
import { Button } from "./ui/button";
import { Bell, Share } from "lucide-react";

interface ToolbarProps {
  className?: string;
}

// TODO: Add mailing list modal (there's some integration required for this to work)
// TODO: Add share modal, not really sure how to do this yet

export function Toolbar({ className }: ToolbarProps) {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <Button variant="secondary" className="h-14 w-14 rounded-2xl">
        <Bell className="size-6" />
      </Button>
      <Button variant="secondary" className="h-14 w-14 rounded-2xl">
        <Share className="size-6" />
      </Button>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
    </div>
  );
}
