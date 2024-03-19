const path = require('node:path');

const nodeExternals = require('webpack-node-externals');

const { version } = require('../../package.json');

/**
 * @type { import('webpack').Configuration }
 */
const configuration = (options, webpack) => ({
	...options,
	externals: [
		nodeExternals({
			modulesDir: path.join(__dirname, 'node_modules'),
			importType: (moduleName) => `import ${moduleName}`,
		}),
	],
	plugins: [
		...options.plugins,
		new webpack.DefinePlugin({
			__PACKAGE_VERSION__: JSON.stringify(version),
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
