module.exports = {
	'apps/frontend/**/*.{ts,tsx,cjs}': 'pnpm --filter @kynesis/frontend exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',

	// 'apps/frontend/src/**/*.scss': 'pnpm stylelint --config ./apps/frontend/stylelint.config.cjs --fix',

	'packages/common/**/*.ts': 'pnpm --filter @kynesis/common" exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',

	'!({apps,packages})**/*.{ts,js,cjs}': 'eslint -c ./.eslintrc.cjs --fix',
	'**/*.{ts,js,cjs,json,yaml}': 'prettier --write',
	'**/*': 'inflint -c ./inflint.config.cjs',
};
