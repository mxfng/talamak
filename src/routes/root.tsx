import { MasonryLayout } from "@/components/masonry/masonry-layout";
import { RootLayout } from "@/layouts/root-layout";
import { Config } from "@/types";
import { MasonryItem } from "@/components/masonry/masonry-item";
import { useLoaderData } from "react-router-dom";
import { ProfileHeader } from "@/components/profile-header";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/toolbar";
import { useSearchStore } from "@/hooks/useSearchStore";
import { useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Footer } from "@/components/footer";
import { useScrollStore } from "@/hooks/useScrollStore";

export default function RootPage() {
  const { config } = useLoaderData() as { config: Config };
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setScrollPosition = useScrollStore((state) => state.setScrollPosition);

  const fuse = useMemo(
    () =>
      new Fuse(config?.items || [], {
        keys: ["label", "url"],
        threshold: 0.2,
        includeScore: true,
      }),
    [config?.items],
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim() || !config?.items) {
      return config?.items || [];
    }

    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [fuse, searchQuery, config?.items]);

  useEffect(() => {
    setScrollPosition(0);
  }, [config]);

  if (!config) return <p>No config found</p>;

  return (
    <RootLayout>
      {/* Main content */}
      <div className="flex-1 w-full max-w-2xl mx-auto">
        <div className="md:absolute md:top-0 z-10 bg-background py-4 flex flex-col gap-6 w-full max-w-2xl">
          <ProfileHeader
            avatar={config.avatar}
            name={config.name}
            bio={config.bio}
            animated={false}
            className="md:hidden"
          />
          <ProfileHeader
            avatar={config.avatar}
            name={config.name}
            bio={config.bio}
            animated={true}
            className="hidden md:block"
          />
          {/* Desktop SearchBar (hidden on mobile) */}
          {config.toolbar && (
            <div className="hidden md:block">
              <Toolbar />
            </div>
          )}
        </div>

        <div
          className={cn(
            "w-full flex flex-col items-center justify-center pt-6 md:pt-[128px]",
            config.toolbar && "md:pt-[220px]",
            config.toolbar && searchQuery.length == 0 && "mb-20 md:mb-0",
          )}
        >
          <MasonryLayout
            items={filteredItems}
            renderItem={(item) => <MasonryItem item={item} />}
            emptyMessage={
              searchQuery ? "No matching items found" : "No items found."
            }
          />
          {searchQuery.length == 0 && <Footer />}
        </div>
      </div>

      {/* Mobile SearchBar (fixed + animated) */}
      {config.toolbar && (
        <div className="md:hidden">
          <motion.div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
          >
            <Toolbar />
          </motion.div>
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      )}
    </RootLayout>
  );
}
