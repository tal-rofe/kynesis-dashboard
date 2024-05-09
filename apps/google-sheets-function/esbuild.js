import esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

await esbuild.build({
	entryPoints: ['./src/index.ts'],
	outfile: './build/index.js',
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
