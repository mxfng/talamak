import { useState } from "react";
import { Link, LinkItem } from "@/types";
import { Icon } from "@/components/icon";
import { useNavigate } from "react-router-dom";

type LinkCardProps =
  | { item: LinkItem; type: "group" }
  | { item: Link; type: "link" };

export function LinkCard({ item, type }: LinkCardProps) {
  const navigate = useNavigate();
  const isGroup = type === "group";
  const [imgError, setImgError] = useState(false);

  const label = item.label;

  const hasSingleLink = isGroup && (item as LinkItem).links.length === 1;

  const icon = hasSingleLink
    ? (item as LinkItem).links[0].icon
    : !isGroup
      ? (item as Link).icon
      : undefined;

  const image = isGroup ? (item as LinkItem).image : undefined;
  const showImage = image?.type === "icon" && !imgError;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isGroup) {
      window.open((item as Link).url, "_blank");
    } else {
      const group = item as LinkItem;
      if (group.links.length === 1) {
        window.open(group.links[0].url, "_blank");
      } else {
        navigate(`/links/${group.id}`);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer block w-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
    >
      <div className="relative bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors border border-muted/30 shadow-sm rounded-full w-full px-4 py-3 min-h-16 flex items-center justify-center">
        {showImage ? (
          <img
            src={image.src}
            alt={label}
            onError={() => setImgError(true)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full object-cover"
          />
        ) : icon ? (
          <Icon
            name={icon}
            className="absolute left-5 top-1/2 -translate-y-1/2 size-7 opacity-80"
          />
        ) : null}

        <span className="text-primary text-lg font-medium tracking-wide truncate px-6 text-center">
          {label}
        </span>
      </div>
    </button>
  );
}
