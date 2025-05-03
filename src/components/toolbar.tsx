import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";
import { useSearchStore } from "@/hooks/useSearchStore";

interface ToolbarProps {
  className?: string;
}

export function Toolbar({ className }: ToolbarProps) {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
    </div>
  );
}
