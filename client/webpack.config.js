/**
 * Webpack Configuration
 * @type {Object}
 */
module.exports = {
    entry: {
        "app": "./app/browser"
    },
    output: {
        path: __dirname,
        filename: "./public/dist/[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    }
};