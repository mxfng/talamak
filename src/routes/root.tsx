import { SearchBar } from "@/components/search-bar";
import { MasonryLayout } from "@/components/masonry/masonry-layout";
import { ProfileHeader } from "@/components/profile-header";
import { RootLayout } from "@/layouts/root-layout";
import { Config } from "@/types";
import { MasonryItem } from "@/components/masonry/masonry-item";
import { useLoaderData } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import Fuse from "fuse.js";

export default function RootPage() {
  const { config } = useLoaderData() as { config: Config };
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    console.log(scrollPosition);
    scrollContainerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  // Setup fuzzy search with Fuse.js
  const fuse = useMemo(
    () =>
      new Fuse(config?.items || [], {
        keys: ["label", "url"],
        threshold: 0.2,
        includeScore: true,
      }),
    [config?.items],
  );

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim() || !config?.items) {
      return config?.items || [];
    }

    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [fuse, searchQuery, config?.items]);

  if (!config) return <p>Loading...</p>;

  return (
    <RootLayout scrollContainerRef={scrollContainerRef}>
      {/* Sticky header */}
      <div className="absolute w-full top-0 z-10">
        <ProfileHeader
          avatar={config.avatar}
          name={config.name}
          bio={config.bio}
          scrollPosition={scrollPosition}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 pt-56">
        <div className="w-full flex items-center justify-center">
          <MasonryLayout
            items={filteredItems}
            renderItem={(item) => <MasonryItem item={item} />}
            emptyMessage={
              searchQuery ? "No matching items found" : "No items found."
            }
            useInternalScrollArea={false}
            className="max-w-lg px-6"
          />
        </div>
      </div>

      {/* Fixed search bar at bottom with gradient background */}
      <div className="sticky bottom-0 z-50 pointer-events-none">
        <div className="h-20 bg-gradient-to-t from-background via-background/60 to-transparent w-full"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-4 px-6 pointer-events-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search items..."
            className="max-w-lg"
          />
        </div>
      </div>
    </RootLayout>
  );
}
