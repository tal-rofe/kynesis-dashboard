import type { Config } from '@exlint.io/inflint';

const inflintConfig: Config = {
	aliases: {
		'[UIComponent]': `UI([A-Z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?`,
	},
	rules: {
		'**/*.yml': 2,
		'./{assets,scripts,docker/scripts}/**/*': [2, 'kebab-case'],

		'apps/frontend/src/lib/{data,types,utils}/**/*': [2, 'kebab-case'],
		'apps/frontend/src/lib/hooks/*': [2, 'camelCase'],
		'apps/frontend/src/components/{layouts,wrappers}/*': [2, 'PascalCase.Point'],
		'apps/frontend/src/components/ui/*': [2, '[UIComponent]'],

		'./apps/pixel-api-function/src/**/*': [2, 'kebab-case'],

		'./apps/slack-webhook-register-function/src/**/*': [2, 'kebab-case'],

		'./apps/pixel-enrichment-function/src/**/*': [2, 'kebab-case.point'],

		'./packages/common-functions-types/src/**/*': [2, 'kebab-case'],

		'./packages/lambda-logger/src/**/*': [2, 'kebab-case'],
	},
};

export default inflintConfig;
