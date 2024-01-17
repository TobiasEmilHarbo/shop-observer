module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'google',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json', 'tsconfig.dev.json'],
        sourceType: 'module',
    },
    ignorePatterns: [
        '/lib/**/*', // Ignore built files.
    ],
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    rules: {
        'quotes': ['error', 'single'],
        'indent': 0,
        'import/no-unresolved': 0,
        'objectsInObjects': 0,
        'require-jsdoc': 0,
		'no-tabs': 0,
		'object-curly-spacing': 0,
		'new-cap': 0,
		'operator-linebreak': [
			'error',
			'after',
			{
				'overrides': {
					'?': 'before',
					':': 'before',
				},
			},
		],
		'max-len': [2, { code: 80, ignorePattern: '^import .*' }],
    },
};
