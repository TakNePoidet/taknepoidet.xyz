// https://nuxt.com/docs/api/configuration/nuxt-config
const isProduction = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
	css: ['assets/style/index.scss', ...(isProduction ? ['assets/style/production.scss'] : [])],
	components: false,
	imports: {
		autoImport: false
	},
	// @ts-ignore
	modules: [
		'@nuxtjs/google-fonts',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxt/image',
		'@nuxtjs/color-mode',
		'nuxt-simple-sitemap',
		'nuxt-simple-robots',
		'nuxt-yandex-metrika',
		'@pinia/nuxt'
	],
	googleFonts: {
		display: 'swap',
		families: {
			Manrope: [400, 500, 600, 700]
		}
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
		credits: false
	},
	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL
	}
});
