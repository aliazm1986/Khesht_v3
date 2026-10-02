import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];
const projectConfig = [
  {
    ignores: [".next/**", "node_modules/**", "public/**/*.png"],
  },
  ...eslintConfig,
];

export default projectConfig;
