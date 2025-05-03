import { LinkItem } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Icon } from "@/components/icon";

interface LinkFillCardProps {
  item: LinkItem;
  className?: string;
  style?: React.CSSProperties;
}

export function LinkFillCard({ item, className, style }: LinkFillCardProps) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  // Check if this item has exactly one link
  const hasSingleLink = item.links.length === 1;
  // Get the icon from the single link if it exists
  const singleLinkIcon = hasSingleLink ? item.links[0].icon : undefined;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasSingleLink) {
      window.open(item.links[0].url, "_blank");
    } else {
      navigate(`/links/${item.id}`);
    }
  };

  if (!item.image?.src || item.image.type !== "fill" || imgError) return null;

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer block w-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl overflow-hidden"
    >
      <div
        className={cn(
          "relative group w-full border border-muted/30 shadow-sm bg-secondary/50 hover:bg-secondary/70 transition-colors -mx-0.5 -my-0.5",
          className,
        )}
        style={{ ...style, boxSizing: "border-box" }}
      >
        <div className="absolute top-2 right-2 rounded-lg bg-background/30 backdrop-blur-sm shadow-sm p-2">
          {singleLinkIcon ? (
            <Icon name={singleLinkIcon} className="size-6 text-foreground/90" />
          ) : (
            <ExternalLink className="size-6 text-foreground/90" />
          )}
        </div>
        <img
          src={item.image.src}
          alt={item.label}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-2">
          <div className="w-full flex items-center justify-start p-4">
            <span className="w-2xl text-start text-primary font-medium tracking-wide text-2xl truncate">
              {item.label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
