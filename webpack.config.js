const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
module.exports = env => {
    const devMode = env.production === true
    return {
        entry: path.resolve(__dirname, 'index'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "js/index.js"
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".tsx", ".ts", ".js", ".jsx"],
            alias: {
                "_src": path.resolve(__dirname, 'src'),
            }
        },
        optimization: {
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                })
            ],
            splitChunks: {
                chunks: "initial",
                minSize: 30000,
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
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ['babel-loader', 'ts-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.js?$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(le|c)ss?$/,
                    use: [
                        devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'px-to-rem-loader',
                            options: {
                                dpr: 2,
                                rem: 75,
                                exclude: ['background-size']
                            }
                        },
                        'less-loader',
                    ]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html',
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash:8].css',
                chunkFilename: '[id].css'
            })
        ]
    }
}