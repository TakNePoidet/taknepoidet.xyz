module.exports = {
	extends: ['@nuxtjs/eslint-config-typescript', '@taknepoidet-config/eslint-config'],
	rules: {
		'vue/no-v-model-argument': 0,
		'vue/multi-word-component-names': 0,
		'vue/no-v-for-template-key': 0,
		'import/no-cycle': 0,
		'import/extensions': [
			'error',
			'always',
			{
				jsx: 'never',
				js: 'never',
				ts: 'never',
				tsx: 'never'
			}
		],
		'no-tabs': 0,
		'max-len': 0,
		'vue/max-len': 0
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.scss', '.sass', '.ts', '.js', '.tsx', '.jsx']
			},
			typescript: {
				project: ['tsconfig.json']
			}
		}
	}
};
