module.exports = {
      env: {
            browser: true,
            es2021: true,
      },
      extends: [
            "plugin:react/recommended",
            "standard-with-typescript",
            "prettier",
      ],
      overrides: [],
      parserOptions: {
            project: "**/tsconfig.json",
            ecmaVersion: "latest",
            sourceType: "module",
      },
      plugins: ["react"],
      rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/strict-boolean-expressions": "off",
            "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/triple-slash-reference": "off",
            "@typescript-eslint/consistent-type-imports": "off",
            "@typescript-eslint/no-floating-promises": "off",
            "spaced-comment": "off",
            "object-shorthand": "off",
            "import/no-duplicates": "off",
            "@typescript-eslint/restrict-plus-operands": "off",
            "react/jsx-key": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/prefer-nullish-coalescing": "off",
      },
};
