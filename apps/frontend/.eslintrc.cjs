module.exports = {
	root: true,
	extends: ['../../.eslintrc.cjs', 'plugin:storybook/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},

	rules: {
		'import/exports-last': ['off'],
	},

	overrides: [
		{
			files: ['**/*.{cjs,js}'],
			rules: {
				'import/no-commonjs': 'off',
				'unicorn/no-empty-file': 'off',
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: ['./@types/**/*.d.ts'],
			rules: {
				'@typescript-eslint/consistent-type-definitions': 'off',
			},
		},
	],

	settings: {
		react: {
			version: 'detect',
		},
	},
};
