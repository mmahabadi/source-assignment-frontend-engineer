import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  testMatch: [
    '<rootDir>/apps/react-assignment/**/__tests__/**/*.spec.(ts|tsx)',
    '<rootDir>/apps/react-assignment/**/?(*.)+(spec|test).(ts|tsx)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/apps/react-assignment-e2e/',
  ],
});
