module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"no-restricted-syntax": [
			"error",
			{
				selector: "TSEnumDeclaration",
				message: "Use const assertion or a string union type instead.",
			},
		],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "variable",
				types: ["boolean"],
				format: ["PascalCase"],
				prefix: ["is", "should", "has", "can", "did", "will"],
			},
		],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				// Generic type parameter must start with letter T, followed by any uppercase letter.
				selector: "typeParameter",
				format: ["PascalCase"],
				custom: { regex: "^T[A-Z]", match: true },
			},
		],
		/*
		"jest/valid-title": [
			"error",
			{
				mustMatch: { it: [/should.*when/u.source, "Test title must include 'should' and 'when'"] },
			},
		],
		*/
	},
	overrides: [
		{
			files: ["src/pages/**/*"],
			rules: { "import/no-default-export": "off" },
		},
	],
};
