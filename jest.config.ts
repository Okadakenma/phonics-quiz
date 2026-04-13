import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};

export default config;
