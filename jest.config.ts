import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // testEnvironment dinámico según archivo
  testEnvironment: 'jsdom', // para componentes React
};

export default createJestConfig(customJestConfig);