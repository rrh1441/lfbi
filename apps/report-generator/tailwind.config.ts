import type { Config } from "tailwindcss";
import baseConfig from "@dealbrief/ui/tailwind.config.js";

const config: Config = {
  ...baseConfig,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}"
  ],
};

export default config;