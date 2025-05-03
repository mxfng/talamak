import { ReactNode, useState, useEffect, useRef } from "react";
import { MosaicGrid } from "@/components/mosaic-grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";

interface MosaicLayoutProps {
  links: LinkType[];
  renderItem: (link: LinkType) => ReactNode;
  emptyMessage?: string;
  maxHeight?: string | number;
  className?: string;
  useInternalScrollArea?: boolean;
}

export function MosaicLayout({
  links,
  renderItem,
  emptyMessage = "No items found.",
  maxHeight = "calc(100vh - 300px)",
  className,
  useInternalScrollArea = false,
}: MosaicLayoutProps) {
  const [columns, setColumns] = useState(2);
  const masonryRef = useRef<HTMLDivElement>(null);

  // Adjust columns based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else {
        setColumns(2);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply special corner radius classes to bottom items
  useEffect(() => {
    const applyCornerClasses = () => {
      if (!masonryRef.current) return;

      const grid = masonryRef.current;
      const columnElements = grid.querySelectorAll(".masonry-grid_column");
      if (columnElements.length === 0) return;

      // Reset any previously added classes
      grid
        .querySelectorAll(
          ".bottom-left-corner, .bottom-right-corner, .partial-row-end",
        )
        .forEach((el) => {
          el.classList.remove(
            "bottom-left-corner",
            "bottom-right-corner",
            "partial-row-end",
          );
        });

      // Get the last visible item in first column (bottom-left corner)
      if (columnElements[0]) {
        const firstColItems = columnElements[0].children;
        if (firstColItems.length > 0) {
          const lastItem = firstColItems[firstColItems.length - 1];
          const mosaicItem = lastItem.querySelector(".mosaic-item");
          if (mosaicItem) mosaicItem.classList.add("bottom-left-corner");
        }
      }

      // Get the last visible item in last column (bottom-right corner)
      if (columnElements[columnElements.length - 1]) {
        const lastColItems = columnElements[columnElements.length - 1].children;
        if (lastColItems.length > 0) {
          const lastItem = lastColItems[lastColItems.length - 1];
          const mosaicItem = lastItem.querySelector(".mosaic-item");
          if (mosaicItem) mosaicItem.classList.add("bottom-right-corner");
        }
      }

      // Handle partial rows (early termination)
      // Get the number of items in each column
      const itemCounts = Array.from(columnElements).map(
        (col) => col.children.length,
      );

      // Find columns that have fewer items than their left neighbor
      // These would create a "gap" in the grid
      for (let i = 1; i < itemCounts.length; i++) {
        if (itemCounts[i] < itemCounts[i - 1]) {
          // The last item in the previous column needs right-rounded corner
          const prevCol = columnElements[i - 1];
          const targetItem = prevCol.children[itemCounts[i]];
          if (targetItem) {
            const mosaicItem = targetItem.querySelector(".mosaic-item");
            if (mosaicItem) mosaicItem.classList.add("partial-row-end");
          }
        }
      }

      // If the last column has fewer items than columns, handle the last item of each column
      const maxItems = Math.max(...itemCounts);
      for (let i = 0; i < columnElements.length; i++) {
        const colItems = columnElements[i].children.length;
        // If this is the last non-empty column in a row
        if (
          colItems < maxItems &&
          (i === columnElements.length - 1 || itemCounts[i + 1] < colItems)
        ) {
          const lastItem = columnElements[i].children[colItems - 1];
          const mosaicItem = lastItem.querySelector(".mosaic-item");
          if (mosaicItem) mosaicItem.classList.add("partial-row-end");
        }
      }
    };

    // Run immediately
    applyCornerClasses();

    // Also run after a small delay to ensure layout is complete
    const timeoutId = setTimeout(applyCornerClasses, 100);

    // And run on window resize
    const handleResize = () => {
      applyCornerClasses();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [links, columns]); // Re-run when links or columns change

  const content = (
    <>
      {links.length > 0 ? (
        <div ref={masonryRef}>
          <MosaicGrid columns={columns} gap={2}>
            {links.map((link) => (
              <div key={link.label}>{renderItem(link)}</div>
            ))}
          </MosaicGrid>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      )}
    </>
  );

  // If useInternalScrollArea is true, wrap in ScrollArea
  if (useInternalScrollArea) {
    return (
      <ScrollArea
        className={cn("w-full max-w-lg rounded-lg", className)}
        style={{ maxHeight }}
      >
        {content}
      </ScrollArea>
    );
  }

  // Otherwise just return the content
  return <div className={cn("w-full max-w-lg", className)}>{content}</div>;
}
