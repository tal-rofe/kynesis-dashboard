module.exports = {
	root: true,
	extends: ['../../.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 'latest',
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['node'],
	rules: {
		'no-process-env': 'error',
	},
	overrides: [
		{
			files: ['./@types/global/index.d.ts'],
			rules: {
				'@typescript-eslint/consistent-type-definitions': 'off',
			},
		},
		{
			files: ['./src/main.ts', './src/config/configuration.ts'],
			rules: {
				'no-process-env': 'off',
			},
		},
	],
};
