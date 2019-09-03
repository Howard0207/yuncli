const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, 'index'),
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: "index.js?"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
            "@srcpage": path.resolve(__dirname, 'src-page'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: "initial",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    minSize: 0,
                    minChunks: 1,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'home/index.html'),
            filename: 'hello.html'
        })
    ]
}