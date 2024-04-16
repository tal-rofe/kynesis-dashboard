import type { Config } from '@exlint.io/inflint';

const inflintConfig: Config = {
	aliases: {
		'[UIComponent]': `UI([A-Z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?`,
	},
	rules: {
		'**/*.yml': 2,
		'./{assets,scripts,docker/scripts}/**/*': [2, 'kebab-case'],

		'apps/frontend-dashboard/src/lib/{data,types,utils}/**/*': [2, 'kebab-case'],
		'apps/frontend-dashboard/src/lib/hooks/*': [2, 'camelCase'],
		'apps/frontend-dashboard/src/components/{layouts,wrappers}/*': [2, 'PascalCase.Point'],
		'apps/frontend-dashboard/src/components/ui/*': [2, '[UIComponent]'],

		'apps/backend-dashboard/src/components/ui/*': [2, 'kebab-case.point'],

		'./apps/pixel-enrichment-function/src/**/*': [2, 'kebab-case.point'],

		'./apps/atdata-pixel-collector-function/src/**/*': [2, 'kebab-case.point'],

		'./apps/bigbdm-pixel-collector-function/src/**/*': [2, 'kebab-case.point'],

		'./packages/pixel-enrichment-sqs/src/**/*': [2, 'kebab-case'],

		'./packages/lambda-logger/src/**/*': [2, 'kebab-case'],

		'./terraform/**/*.tf': [2, 'kebab-case'],
	},
};

export default inflintConfig;
