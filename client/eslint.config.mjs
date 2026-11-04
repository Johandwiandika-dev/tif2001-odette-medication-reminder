import js from "@eslint/js";
import globals from "globals";
import html from "eslint-plugin-html";

const browserGlobals = { ...globals.browser };
delete browserGlobals.history;

export default [
  {
    files: ["index.html"],
    plugins: { html },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: browserGlobals,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          args: "after-used",
          caughtErrors: "none",
          vars: "local",
        },
      ],
    },
  },
];