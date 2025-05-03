import { useLoaderData } from "react-router-dom";
import { LinkItem } from "@/types";
import { LinkCard } from "@/components/link-card";

export default function ItemPage() {
  const { item } = useLoaderData() as { item: LinkItem };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      {item.image && (
        <img
          src={item.image.src}
          alt={item.label}
          className="w-full rounded-lg shadow-md"
        />
      )}
      <h1 className="text-xl font-semibold tracking-wide flex items-center gap-2">
        {item.label}
      </h1>
      <div className="space-y-2">
        {item.links.map((link) => (
          <LinkCard key={link.id} item={link} type="link" />
        ))}
      </div>
    </div>
  );
}
