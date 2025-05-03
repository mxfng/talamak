import { useLoaderData, Link } from "react-router-dom";
import { LinkItem } from "@/types";
import { LinkCard } from "@/components/link-card";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ItemPage() {
  const { item } = useLoaderData() as { item: LinkItem };

  return (
    <main className="flex flex-col items-center justify-center bg-background text-foreground">
      <ScrollArea className="h-dvh w-full overflow-hidden">
        <div className="mx-auto h-dvh flex flex-col items-between">
          <div className="p-6 w-full max-w-2xl mx-auto space-y-4">
            <div className="mb-4">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="size-8" />
              </Link>
            </div>
            {item.image && (
              <img
                src={item.image.src}
                alt={item.label}
                className="w-full max-h-[50dvh] object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <h1 className="w-full py-3 text-3xl font-semibold tracking-wide flex items-center gap-2">
              {item.label}
            </h1>
            <div className="space-y-2">
              {item.links.map((link) => (
                <LinkCard key={link.id} item={link} type="link" />
              ))}
            </div>
            <div className="w-full flex">
              <Button className="w-full h-16 text-lg rounded-full" asChild>
                <RouterLink to="/">
                  <ArrowLeft className="size-6" />
                  Return Home
                </RouterLink>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
