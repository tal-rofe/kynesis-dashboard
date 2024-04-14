module.exports = {
	'apps/frontend/**/*.{ts,tsx,cjs}': 'pnpm --filter frontend exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'apps/pixel-enrichment-function/**/*.{ts,js,cjs}':
		'pnpm --filter pixel-enrichment-function exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'apps/atdata-pixel-collector-function/**/*.{ts,js,cjs}':
		'pnpm --filter atdata-pixel-collector-function exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'apps/bigbdm-pixel-collector-function/**/*.{ts,js,cjs}':
		'pnpm --filter bigbdm-pixel-collector-function exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'packages/pixel-enrichment-sqs/**/*.ts': 'pnpm --filter pixel-enrichment-sqs exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'packages/lambda-logger/**/*.ts': 'pnpm --filter lambda-logger exec eslint -c ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
	'!({apps,packages})**/*.{ts,js,cjs}': 'eslint -c ./.eslintrc.cjs --fix',
	'**/*.{ts,js,cjs,json,yaml}': 'prettier --write',
	'**/*': 'inflint -c ./inflint.config.ts',
	'**/*.tf': ['terraform fmt', (filesnames) => filesnames.map((filename) => `tflint --filter ${filename}`).join(';')],
};
