import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  return (
    <motion.div
      className="w-full flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "relative w-full h-12 border-0 bg-secondary/80 text-secondary-foreground rounded-2xl flex flex-row items-center gap-2 backdrop-blur-md shadow-lg",
          className,
        )}
      >
        <div className="pl-4 pr-2">
          <Search className="h-5 w-5 stroke-[2.5px] text-muted-foreground" />
        </div>
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "w-full h-full outline-none bg-transparent text-base",
            "focus:ring-0 focus:outline-none",
          )}
        />
      </div>
    </motion.div>
  );
}
