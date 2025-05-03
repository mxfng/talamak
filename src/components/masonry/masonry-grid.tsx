import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Masonry from "react-masonry-css";
import "./masonry-grid.css";

interface MasonryGridProps {
  children: ReactNode;
  columns?: number;
  className?: string;
}

export function MasonryGrid({
  children,
  columns,
  className,
}: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={columns}
      className={cn("masonry-grid", className)}
      columnClassName="masonry-grid_column"
    >
      {children}
    </Masonry>
  );
}
