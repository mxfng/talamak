import { ReactNode, useRef } from "react";
import { MasonryGrid } from "@/components/masonry/masonry-grid";
import { LinkItem } from "@/types";
import { cn } from "@/lib/utils";

interface MasonryLayoutProps {
  items: LinkItem[];
  renderItem: (item: LinkItem) => ReactNode;
  emptyMessage?: string;
  maxHeight?: string | number;
  className?: string;
  useInternalScrollArea?: boolean;
}

export function MasonryLayout({
  items,
  renderItem,
  emptyMessage = "No items found.",
  className,
}: MasonryLayoutProps) {
  const masonryRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("w-full max-w-lg", className)}>
      {items.length > 0 ? (
        <div ref={masonryRef}>
          <MasonryGrid columns={1}>
            {items.map((item) => (
              <div key={item.label}>{renderItem(item)}</div>
            ))}
          </MasonryGrid>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      )}
    </div>
  );
}
