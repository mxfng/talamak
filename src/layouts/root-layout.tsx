import { ScrollArea } from "@/components/ui/scroll-area";
import { useScrollStore } from "@/hooks/useScrollStore";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  const setScrollPosition = useScrollStore((state) => state.setScrollPosition);

  return (
    <main className="flex flex-col items-center justify-center bg-background text-foreground">
      <ScrollArea
        className="h-dvh w-full overflow-hidden"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onScrollCapture={(event: any) => {
          setScrollPosition(event.target.scrollTop);
        }}
      >
        <div className="mx-auto h-dvh flex flex-col items-between p-6">
          {children}
        </div>
      </ScrollArea>
    </main>
  );
};
