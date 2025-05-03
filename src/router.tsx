import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { loadConfig } from "@/lib/load-config";
import Fallback from "./components/typography/fallback";

const Root = lazy(() => import("./routes/root"));

export const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      // Preload the YAML config before serving the route
      const config = await loadConfig();
      return { config };
    },
    element: (
      <Suspense fallback={<Fallback />}>
        <Root />
      </Suspense>
    ),
  },
]);
