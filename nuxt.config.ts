// https://nuxt.com/docs/api/configuration/nuxt-config
const isProduction = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
	css: ['assets/style/index.scss', ...(isProduction ? ['assets/style/production.scss'] : [])],
	components: false,
	imports: {
		autoImport: false
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxt/image-edge',
		'@nuxtjs/color-mode',
		'nuxt-simple-robots'
	],
	googleFonts: {
		display: 'swap',
		families: {
			Manrope: [400, 500, 600, 700]
		}
	},
	robots: {
		credits: false
	}
});
