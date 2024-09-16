module.exports = {
    rootDir: './',
  
    coverageDirectory: 'coverage',
  
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js'
    ],
  
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
  
    moduleFileExtensions: ['js', 'json'],
  
    clearMocks: true,
  
    verbose: true,
  
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  
    setupFiles: ['dotenv/config'],
  };
  