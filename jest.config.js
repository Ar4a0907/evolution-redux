module.exports = {
  moduleNameMapper: {
    "(.+)\\.js": "$1"
  },
  preset: 'ts-jest',
  testPathIgnorePatterns: ['cypress'],
  testEnvironment: 'node',
};