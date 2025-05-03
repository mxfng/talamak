import { LinkItem } from "@/types";
import { ReactNode, CSSProperties } from "react";
import { LinkCard } from "../link-card";
import { LinkFillCard } from "../link-fill-card";

interface MasonryItemProps {
  children?: ReactNode;
  className?: string;
  href?: string;
  style?: CSSProperties;
  item?: LinkItem;
}

export function MasonryItem({ className, style, item }: MasonryItemProps) {
  if (item) {
    const hasImage = !!item.image;
    const imageType = item.image?.type;

    if (!hasImage || imageType === "icon") {
      return <LinkCard item={item} type="group" />;
    }

    return <LinkFillCard item={item} className={className} style={style} />;
  }
}
