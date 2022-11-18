module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testEnvironment: 'node',
    setupFiles: ["<rootDir>/jest-env.js"],
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    }
};
