import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState, useRef } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search my links",
  value = "",
  onChange,
  className,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "relative w-full h-14 rounded-2xl bg-secondary/80 text-secondary-foreground backdrop-blur-md shadow-lg overflow-hidden",
        "transition-all duration-500 ease-in-out",
        "focus-within:shadow-xl",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center gap-2 px-4 transition-all duration-500 ease-in-out",
          isActive ? "justify-start scale-100" : "justify-center scale-105",
        )}
      >
        <Search
          className={cn(
            "transition-all duration-500 ease-in-out",
            isActive
              ? "h-5 w-5 mr-2 text-muted-foreground"
              : "h-7 w-7 text-foreground",
          )}
        />
        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "bg-transparent outline-none border-0 text-base placeholder:text-muted-foreground transition-all duration-500 ease-in-out",
            isActive
              ? "opacity-100 w-full"
              : "opacity-5 w-1 cursor-pointer text-transparent px-2 -mx-1",
          )}
        />
      </div>
    </div>
  );
}
