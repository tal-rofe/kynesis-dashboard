import esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

await esbuild.build({
	entryPoints: ['./src/index.ts'],
	// * https://github.com/serverless/dashboard-plugin/issues/564
	outfile: './build/index.cjs',
	bundle: true,
	minify: true,
	platform: 'node',
	target: 'esnext',
	treeShaking: true,
	plugins: [
		esbuildPluginTsc({
			force: true,
			tsconfigPath: './tsconfig.build.json',
			tsx: false,
		}),
	],
});
