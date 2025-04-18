/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
	},
	images: {
		domains: ['localhost:5000'],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '**',
			},
		],
	},
}

module.exports = nextConfig
