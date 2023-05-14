// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['assets/style/index.scss'],
	components: false,
	imports: {
		autoImport: false
	},
	modules: [
		'@nuxtjs/google-fonts',
	],
	googleFonts: {
		display: 'swap',
		families: {
			Manrope: [400, 500, 600, 700]
		}
	},
});
