module.exports = {
	extends: ['@taknepoidet-config/stylelint'],
	rules: {
		'declaration-property-value-no-unknown': null,
		'media-query-no-invalid': null,
		'scss/double-slash-comment-whitespace-inside': null,
		'custom-property-pattern': null,
		'import-notation': null,
		'max-nesting-depth': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['deep']
			}
		],
		'order/order': [['dollar-variables', 'custom-properties', 'declarations', 'rules'], { severity: 'warning' }]
	}
};
