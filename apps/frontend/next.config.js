/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	webpack: (config) => {
		config.resolve.alias['canvas'] = false;

		return config;
	},
};

module.exports = nextConfig;
