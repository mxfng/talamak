import { ReactNode, useRef } from "react";
import { MasonryGrid } from "@/components/masonry/masonry-grid";
import { LinkItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

interface MasonryLayoutProps {
  items: LinkItem[];
  renderItem: (item: LinkItem) => ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function MasonryLayout({
  items,
  renderItem,
  emptyMessage = "No items found.",
}: MasonryLayoutProps) {
  const masonryRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {items.length > 0 ? (
        <div ref={masonryRef} className="w-full">
          <MasonryGrid columns={1}>
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 0.6,
                  }}
                >
                  {renderItem(item)}
                </motion.div>
              ))}
            </AnimatePresence>
          </MasonryGrid>
        </div>
      ) : (
        <motion.p
          key="empty"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-center text-muted-foreground"
        >
          {emptyMessage}
        </motion.p>
      )}
    </>
  );
}
