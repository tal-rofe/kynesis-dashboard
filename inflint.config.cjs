const inflintConfig = {
	aliases: {
		'[UIComponent]': `UI([A-Z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?`,
	},
	rules: {
		'apps/frontend/src/lib/{data,providers,types,utils}/**/*': [2, 'kebab-case'],
		'apps/frontend/src/lib/hooks/*': [2, 'camelCase'],
		'apps/frontend/src/components/{layouts,wrappers}/*': [2, 'PascalCase.Point'],
		'apps/frontend/src/components/ui/*': [2, '[UIComponent]'],

		'packages/common/lib/{types}/**/*': [2, 'kebab-case'],
	},
};

module.exports = inflintConfig;
