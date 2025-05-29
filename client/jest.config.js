module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)?(x)'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['html'],
};