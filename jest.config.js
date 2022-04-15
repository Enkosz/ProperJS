module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(tests|spec)?\\.(ts)$',
    moduleFileExtensions: ['ts', 'js', 'node']
};
