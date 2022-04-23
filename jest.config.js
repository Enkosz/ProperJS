module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(tests|spec)?\\.(ts)$',
    moduleFileExtensions: ['ts', 'js', 'node'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
};
