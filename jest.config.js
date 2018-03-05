module.exports = {
    bail: true,
    cacheDirectory: './node_modules/.cache',
    testEnvironment: 'jsdom',
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    coveragePathIgnorePatterns: [
        'build'
        // '<rootDir>/'
    ],
    testRegex: 'test/.*\\\\.jsx?$'
}