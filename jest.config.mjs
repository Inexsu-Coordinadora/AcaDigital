/** @type {import('jest').Config} */
const config = {
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  
  preset: 'ts-jest', 
  
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
  
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },

  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;