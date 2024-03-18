const path = require('node:path');

const nodeExternals = require('webpack-node-externals');

/**
 * @type { import('webpack').Configuration }
 */
const configuration = (options) => ({
	...options,
	externals: [
		nodeExternals({
			modulesDir: path.join(__dirname, 'node_modules'),
			importType: (moduleName) => `import ${moduleName}`,
		}),
	],
	experiments: { outputModule: true },
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		library: { type: 'module' },
		chunkFormat: 'module',
	},
});

module.exports = configuration;
