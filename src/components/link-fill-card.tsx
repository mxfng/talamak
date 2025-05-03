import { LinkItem } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LinkFillCardProps {
  item: LinkItem;
  className?: string;
  style?: React.CSSProperties;
}

export function LinkFillCard({ item, className, style }: LinkFillCardProps) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.links.length === 1) {
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
        <img
          src={item.image.src}
          alt={item.label}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-2">
          <div className="w-full flex items-center justify-start p-4">
            <span className="w-2xl text-start text-primary font-medium tracking-wide text-lg truncate">
              {item.label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
