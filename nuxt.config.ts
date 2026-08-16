// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const isProduction = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	// Opt out of the Nuxt 4 `app/` srcDir: @poidet/svg-sprite resolves its input
	// against rootDir but its generated import against srcDir, so the two only
	// agree while srcDir is the project root. `app/router.options.ts` still works
	// because `dir.app` keeps pointing at `app/`.
	srcDir: '.',
	dir: {
		app: 'app'
	},
	devtools: { enabled: true },
	css: ['~/assets/style/index.scss', ...(isProduction ? ['~/assets/style/production.scss'] : [])],
	components: false,
	imports: {
		autoImport: false
	},
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/google-fonts',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxt/image',
		'@nuxtjs/color-mode',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'nuxt-yandex-metrika',
		'@nuxt/content',
		'@poidet/svg-sprite'
	],
	eslint: {
		config: {
			// The Vue/import/stylistic presets come from @poidet/eslint-config;
			// this module only contributes the Nuxt-specific rules on top.
			standalone: false,
			stylistic: false
		}
	},
	svgSprite: {
		pageIcons: false
	},
	googleFonts: {
		display: 'swap',
		families: {
			Manrope: [400, 500, 600, 700, 800]
		}
	},
	colorMode: {
		// v4 changed the default to '' (`.dark` / `.light`); the theme variables in
		// assets/style/variables.scss are written against `.light-mode` / `.dark-mode`.
		classSuffix: '-mode'
	},
	robots: {
		credits: false
	},
	yandexMetrika: {
		id: process.env.VITE_YANDEX_METRICA,
		delay: 3000,
		verification: process.env.VITE_YANDEX_VERIFICATION,
		options: {
			clickmap: true,
			trackLinks: true,
			accurateTrackBounce: true,
			webvisor: true
		}
	},
	sitemap: {
		credits: false,
		exclude: ['/fallback']
	},
	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL
	},
	routeRules: {
		'/fallback': { robots: false }
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// Allows bare `@use 'assets/style/…'` specifiers inside SFC style blocks.
					loadPaths: [fileURLToPath(new URL('.', import.meta.url))]
				}
			}
		}
	},
	postcss: isProduction
		? {
				plugins: {
					'postcss-preset-env': {
						autoprefixer: {}
					}
				}
			}
		: {}
});
