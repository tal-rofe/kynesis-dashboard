import type { Config } from '@exlint.io/inflint';

const inflintConfig: Config = {
	aliases: {
		'[UIComponent]': `UI([A-Z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?`,
	},
	rules: {
		'**/*.yml': 2,
		'./{assets,scripts,docker/scripts}/**/*': [2, 'kebab-case'],

		'./apps/pixel-api-function/src/**/*': [2, 'kebab-case'],

		'./apps/slack-webhook-register-function/src/**/*': [2, 'kebab-case'],

		'./apps/pixel-enrichment-function/src/**/*': [2, 'kebab-case.point'],

		'./packages/common-functions-types/src/**/*': [2, 'kebab-case'],

		'./packages/lambda-logger/src/**/*': [2, 'kebab-case'],
	},
};

export default inflintConfig;
