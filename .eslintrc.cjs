module.exports = {
	root: true,
	extends: ['@nuxt/eslint-config', 'plugin:vuejs-accessibility/recommended', 'prettier'],
	plugins: ['vuejs-accessibility', 'prettier'],
	rules: {
		'max-len': 0,
		'prettier/prettier': 'error',
		'vue/no-multiple-template-root': 0
	}
};
