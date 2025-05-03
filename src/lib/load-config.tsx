import yaml from "js-yaml";
import type { LinktreeConfig } from "@/types";

declare global {
  interface Window {
    __PRELOADED_CONFIG__?: LinktreeConfig;
  }
}

export async function loadConfig(): Promise<LinktreeConfig> {
  // Check if we have preloaded data from SSG
  if (typeof window !== "undefined" && window.__PRELOADED_CONFIG__) {
    return window.__PRELOADED_CONFIG__;
  }

  // Fallback to fetch if not preloaded
  const res = await fetch("/config/linktree.yaml");
  const text = await res.text();
  const parsed = yaml.load(text) as LinktreeConfig;
  return parsed;
}
