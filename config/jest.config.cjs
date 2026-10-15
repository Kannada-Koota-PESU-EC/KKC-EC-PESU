module.exports = {
  rootDir: '..',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  moduleNameMapper: {
    // CSS first, so "@/...css" imports are stubbed too
    '\\.css$': '<rootDir>/src/tests/styleStub.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/config/tsconfig/tsconfig.test.json',
      },
    ],
  },
};
