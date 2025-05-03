import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";
import Masonry from "react-masonry-css";
import "./mosaic-grid.css";

interface MosaicGridProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

export function MosaicGrid({
  children,
  columns = 2,
  gap = 4,
  className,
}: MosaicGridProps) {
  // Responsive breakpoints for the masonry layout
  const breakpointColumnsObj = {
    default: columns,
    1024: columns > 2 ? 2 : columns,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={cn("masonry-grid", className)}
      columnClassName="masonry-grid_column"
    >
      {children}
    </Masonry>
  );
}

interface MosaicItemProps {
  children: ReactNode;
  className?: string;
  href?: string;
  style?: CSSProperties;
}

export function MosaicItem({
  children,
  className,
  href,
  style,
}: MosaicItemProps) {
  const content = (
    <div
      className={cn(
        "mosaic-item",
        "bg-secondary/50 backdrop-blur-sm p-4 hover:bg-secondary/70 transition-colors",
        "flex items-center justify-center text-center",
        "border border-muted/30 shadow-sm",
        "min-h-[80px] w-full",
        className,
      )}
      style={{
        ...style,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {content}
      </a>
    );
  }

  return <div className="w-full">{content}</div>;
}
