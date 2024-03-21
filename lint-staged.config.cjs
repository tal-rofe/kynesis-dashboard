module.exports = {
	'apps/frontend/**/*.{ts,tsx,cjs}': 'pnpm --filter frontend exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'apps/pixel-api/**/*.{ts,js,cjs}': 'pnpm --filter pixel-api exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'!(apps)**/*.{ts,js,cjs}': 'eslint -c ./.eslintrc.cjs --fix',
	'**/*.{ts,js,cjs,json,yaml}': 'prettier --write',
	'**/*': 'inflint -c ./inflint.config.cjs',
};
