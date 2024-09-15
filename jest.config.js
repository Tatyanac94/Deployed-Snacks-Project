module.exports = {
    // The root directory for Jest to look for tests and modules
    rootDir: './',
  
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
  
    // The pattern Jest uses to detect test files
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js'
    ],
  
    // Transform files using Babel
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
  
    // Module file extensions for resolving
    moduleFileExtensions: ['js', 'json'],
  
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // Display individual test results with the test suite hierarchy
    verbose: true,
  
    // A map from regular expressions to paths to transformers
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  
    // Setup files that are executed before each test suite
    setupFiles: ['dotenv/config'],
  };
  