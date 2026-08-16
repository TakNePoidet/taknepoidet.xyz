export default {
	plugins: ['stylelint-prettier'],
	extends: [
		'stylelint-config-html',
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-html/vue',
		'stylelint-order',
		'stylelint-config-hudochenkov/order'
	],
	rules: {
		'prettier/prettier': true,
		'custom-property-pattern': null,
		'no-descending-specificity': null,
		'media-query-no-invalid': null,
		'selector-class-pattern': null,
		'no-invalid-position-at-import-rule': null,
		'scss/double-slash-comment-whitespace-inside': null,
		'order/order': [['dollar-variables', 'custom-properties', 'declarations', 'rules'], { severity: 'warning' }]
	},
	overrides: [
		{
			files: ['**/*.vue'],
			rules: {
				'selector-pseudo-class-no-unknown': [
					true,
					{
						ignorePseudoClasses: ['deep']
					}
				]
			}
		}
	]
};
