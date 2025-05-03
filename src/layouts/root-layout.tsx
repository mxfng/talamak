import { ScrollArea } from "@/components/ui/scroll-area";
import { RefObject } from "react";

interface RootLayoutProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export const RootLayout = ({
  scrollContainerRef,
  children,
}: RootLayoutProps) => (
  <main className="flex flex-col items-center justify-center bg-background text-foreground">
    <ScrollArea className="h-dvh w-full overflow-hidden">
      <div ref={scrollContainerRef as RefObject<HTMLDivElement>}>
        <div className="mx-auto h-dvh flex flex-col items-between">
          {children}
        </div>
      </div>
    </ScrollArea>
  </main>
);
