import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

const config = (phase) => {
	const shouldAdjustToProduction = phase !== PHASE_DEVELOPMENT_SERVER && process.env.AUTOMATION !== 'true';

	return {
		reactStrictMode: false,
		typescript: {
			tsconfigPath: './tsconfig.build.json',
		},
		eslint: {
			dirs: ['./src'],
			ignoreDuringBuilds: true,
		},
		compiler: {
			removeConsole: shouldAdjustToProduction,
			reactRemoveProperties: shouldAdjustToProduction,
		},
	};
};

export default config;
