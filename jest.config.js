module.exports = {
  preset: 'ts-jest',
  roots: ["<rootDir>/src"],
  clearMocks: true,
  coverageDirectory: "coverage",
  modulePathIgnorePatterns: [
    '.next',
    '__stories__',
    'node_modules',
  ],
  coverageReporters: ['text', 'lcov', 'cobertura'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
};