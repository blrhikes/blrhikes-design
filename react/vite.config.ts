import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  server: {
    fs: {
      /* The clone imports the design repo's CSS and mock data by relative
         path, verbatim — they live one level up, outside this Vite root. */
      allow: [".."],
    },
  },
});
