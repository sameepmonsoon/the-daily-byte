import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: ["import", "simple-import-sort", "unused-imports"],

    rules: {
      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "error",

      // Sort imports automatically
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Enforce import ordering (optional but recommended)
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },

    // Ensure Prettier formatting is respected
    extends: ["prettier"],
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
