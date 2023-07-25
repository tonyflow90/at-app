import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vitest/config';

export default defineConfig({
	server: {
		https: true,
		proxy: {}
	},
	plugins: [
		mkcert(),
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			scope: '/',
			base: '/',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				short_name: '▅▀▅ ▀█▀',
				name: '▅▀▅ ▀█▀ Activity Tracker',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: "#ffffff",
				background_color: "#ffffff",
				icons: [
					{
						src: "logo.svg",
						sizes: "48x48 72x72 96x96 128x128 256x256 512x512 1080x1080",
						type: "image/svg+xml",
						purpose: "any"
					}
				],
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
				type: 'module',
				navigateFallback: '/',
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		})
	]
});
