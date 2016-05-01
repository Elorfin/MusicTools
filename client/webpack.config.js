/**
 * Webpack Configuration
 * @type {Object}
 */
module.exports = {
    entry: {
        /*"common": "./src/components/common/common",*/
        "app": "./app/browser"
    },
    output: {
        path: __dirname,
        filename: "./public/dist/[name].bundle.js",
        chunkFilename: "./public/dist/[id].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            // TypeScript
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: /node_modules/
            },

            // HTML
            {
                test: /\.html$/,
                loader: 'html'
            },

            // SASS
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    }
};