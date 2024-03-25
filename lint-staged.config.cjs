module.exports = {
	'apps/frontend/**/*.{ts,tsx,cjs}': 'pnpm --filter frontend exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'apps/pixel-api-function/**/*.{ts,js,cjs}': 'pnpm --filter pixel-api-function exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'apps/pixel-enrichment-function/**/*.{ts,js,cjs}':
		'pnpm --filter pixel-enrichment-function exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'packages/common-functions-types/**/*.ts': 'pnpm --filter common-functions-types exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'!({apps,packages})**/*.{ts,js,cjs}': 'eslint -c ./.eslintrc.cjs --fix',
	'**/*.{ts,js,cjs,json,yaml}': 'prettier --write',
	'**/*': 'inflint -c ./inflint.config.ts',
};
