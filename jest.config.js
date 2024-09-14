module.exports = {
    moduleDirectories: ['node_modules', 'routes'], // Add 'src' if your routes are inside 'src'
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
};



// module.exports = {
//     moduleDirectories: ['node_modules', 'routes'],
//     // Other configuration options as needed
// };
