module.exports = {
    env: {
        node: true,
        browser: true,
        amd: true,
        jest: true
    },
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['react', 'react-hooks', 'import', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['webpack.config.js', 'global.d.ts', 'postcss.config.js', 'src/assets/**'],
    rules: {
        'quotes': [1, 'single', { 'avoidEscape': true }],
        'semi': [2, 'always'],
        'no-console': ['error'],
        'eol-last': ['error', 'always'],
        'prefer-const': ['error'],
        'default-case': ['error'],
        'arrow-parens': [2, 'as-needed', { 'requireForBlockBody': true }],
        // Переносы строк для разработки на windows
        'linebreak-style': ['off'],
        // 4 пробела
        indent: ['error', 4, { SwitchCase: 1 }],
        // Разрешить нижние подчеркивания
        'no-underscore-dangle': [0],
        // Разрешить пропуск строк в коде
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        // Не ставить запятые в после последнего элемента структуры
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        // Статические методы в большинстве случаев являются антипаттерном
        'class-methods-use-this': ['off'],
        'prefer-destructuring': ['off'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': ['off'],
        // setState внутри componentDidUpdate вызывать можно, только в условной конструкции
        'react/require-default-props': ['off'],
        // setState внутри componentDidUpdate вызывать можно, только в условной конструкции
        'react/no-did-update-set-state': ['warn'],
        'import/no-named-as-default-member': ['off'],
        // Правила для корректного использования хуков
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/sort-comp': [1],
        'import/no-default-export': ['error'],
        'import/order': ['error', {
            groups: ['builtin', 'external', 'parent', 'sibling', 'internal', 'type'],
            'newlines-between': 'always-and-inside-groups'
        }],
        'global-require': ['off'],
        'object-curly-spacing': ['error', 'always'],
        'object-curly-newline': ['error', {
            ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
            ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
            ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
            ExportDeclaration: { minProperties: 4, multiline: true, consistent: true }
        }],
        '@typescript-eslint/explicit-member-accessibility': ['error',  { overrides: { constructors: 'no-public' } }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error']
    }
};
