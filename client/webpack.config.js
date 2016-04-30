/**
 * Webpack Configuration
 * @type {Object}
 */
module.exports = {
    entry: {
        "app": "./web/build/main"
    },
    output: {
        path: __dirname,
        filename: "./web/dist/[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: 'source-map'
};