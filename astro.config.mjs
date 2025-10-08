import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mikeleg.github.io/",
  integrations: [sitemap()],
  output: "static",
});