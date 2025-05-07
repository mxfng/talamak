import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { loadConfig } from "@/lib/load-config";
import Fallback from "./components/typography/fallback";

const RootPage = lazy(() => import("./routes/root"));
const ItemPage = lazy(() => import("./routes/[item-id]"));

export const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const config = await loadConfig();
      return { config };
    },
    element: (
      <Suspense fallback={<Fallback />}>
        <RootPage />
      </Suspense>
    ),
  },
  {
    path: "/links/:id",
    loader: async ({ params }) => {
      const config = await loadConfig();

      const itemIndex = parseInt(params.id?.split("-")[0] || "0", 10);
      const item = config.items[itemIndex];

      if (!item) {
        throw new Response("Not Found", { status: 404 });
      }

      return { item, config };
    },
    element: (
      <Suspense fallback={<Fallback />}>
        <ItemPage />
      </Suspense>
    ),
  },
]);
