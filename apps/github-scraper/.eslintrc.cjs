module.exports = {
	root: true,
	extends: ['../../.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 'latest',
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['./**/*.d.ts'],
			rules: {
				'@typescript-eslint/consistent-type-definitions': 'off',
			},
		},
		{
			files: ['./src/index.ts'],
			rules: {
				'no-constant-condition': 'off',
			},
		},
		{
			files: ['./src/helpers/health-compose.ts'],
			rules: {
				'no-promise-executor-return': 'off',
			},
		},
	],
};
