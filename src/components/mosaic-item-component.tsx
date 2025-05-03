import { MosaicItem } from "@/components/mosaic-grid";
import { LinktreeItem } from "@/types";
import { Icon } from "@/components/icon";

interface MosaicItemComponentProps {
  item: LinktreeItem;
}

export function MosaicItemComponent({ item }: MosaicItemComponentProps) {
  // Render based on item type
  switch (item.type) {
    case "image":
      return (
        <MosaicItem
          href={item.url}
          className="relative block w-full overflow-hidden group p-0"
        >
          <div className="relative">
            <img
              src={item.src}
              alt={item.label}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/70 to-transparent flex items-end p-2">
              <span className="text-primary font-medium tracking-wide text-xs inline-flex items-center gap-0.5">
                <span className="w-full text-start">
                  {item.label} tsdkfaljsa dfsakfslad jfdsakfld
                </span>
              </span>
            </div>
          </div>
        </MosaicItem>
      );

    case "text":
      return (
        <MosaicItem
          href={item.url}
          className="h-full flex flex-col p-5 items-start text-start"
        >
          <h3 className="font-light text-xl mb-3 tracking-tight">
            {item.label}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-light">
            {item.content}
          </p>
        </MosaicItem>
      );

    case "link":
    default:
      return (
        <MosaicItem
          href={item.url}
          className="h-full flex items-center justify-center"
        >
          {item.icon && (
            <span className="mr-2 opacity-80">
              <Icon name={item.icon} />
            </span>
          )}
          <span className="font-light tracking-wide">{item.label}</span>
        </MosaicItem>
      );
  }
}
