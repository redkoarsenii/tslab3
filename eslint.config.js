// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        files: ["**/*.ts"],
        ignores: ["node_modules", "dist"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];
