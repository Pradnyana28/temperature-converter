const base = require('./jest-base-config');

module.exports = {
    ...base,
    displayName: {
        name: 'integration',
        color: 'blue'
    },
    testRegex: './tests/.+(test)\\.ts$',
    moduleNameMapper: {}
};
