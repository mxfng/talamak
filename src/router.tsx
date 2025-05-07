import { lazy, Suspense } from "react";
import { createBrowserRouter, useMatches, Outlet } from "react-router-dom";
import { loadConfig } from "@/lib/load-config";
import Fallback from "./components/typography/fallback";
import { SEO } from "@/components/seo";
import { Config, LinkItem } from "@/types";

const RootPage = lazy(() => import("./routes/root"));
const ItemPage = lazy(() => import("./routes/[item-id]"));

type RouteData = { config: Config } | { item: LinkItem; config: Config };

// Root layout that includes SEO and renders child routes
function RootLayout() {
  return (
    <>
      <SEOHandler />
      <Outlet />
    </>
  );
}

// Component to handle SEO based on current route
function SEOHandler() {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];
  const handle = lastMatch?.handle as {
    seo: (data: RouteData) => React.ReactNode;
  };
  const data = lastMatch?.data as RouteData;

  if (!handle?.seo || !data) return null;
  return handle.seo(data);
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <Fallback />,
    children: [
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
        handle: {
          seo: (data: { config: Config }) => <SEO config={data.config} />,
        },
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
        handle: {
          seo: (data: { item: LinkItem; config: Config }) => (
            <SEO
              config={data.config}
              title={data.item.label}
              description={`${data.item.label} - ${data.config.name}`}
              image={data.item.image?.src}
            />
          ),
        },
      },
    ],
  },
]);

export { router };
