const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = env => {
    const devMode = env.production === "false"
    let config = {
        entry: path.resolve(__dirname, '../routes/main/index'),
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: "js/index.js"
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".tsx", ".ts", ".js", ".jsx"],
            alias: {
                "@less": path.resolve(__dirname, '../less'),
                "@store": path.resolve(__dirname, '../store'),
                "@page": path.resolve(__dirname, '../src'),
                "components": path.resolve(__dirname, '../components')               
            }
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserJSPlugin({
                    cache: true,
                    parallel: true
                }),
                new OptimizeCSSAssetsPlugin()
            ],
            splitChunks: {
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                    vendor: {
                        chunks: 'initial',
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        minSize: 0,
                        minChunks: 1,
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'initial',
                        enforce: true,
                    },
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        { loader: 'happypack/loader?id=babelTS' },
                        'ts-loader'
                    ],
                    // include: path.resolve(__dirname, "../src"),
                    exclude: /node_modules/
                },
                // {
                //     test: /\.tsx?$/,
                //     use: ['babel-loader', 'ts-loader'],
                //     exclude: /node_modules/
                // },
                // {
                //     test: /\.js?$/,
                //     use: 'babel-loader',
                //     exclude: /node_modules/
                // },
                {
                    test: /\.(le|c)ss?$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '/[name].[hash:7].[ext]',
                            outputPath: './img',
                        }
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
            ]
        },

        plugins: [
            new HappyPack({
                id: 'babelTS',
                threadPool: happyThreadPool,
                loaders: ['babel-loader']
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../routes/main/main.html'),
                favicon: path.resolve(__dirname, '../favicon.ico'),
                filename: 'index.html',
                inject: 'body',
                minify: true,
            }),
            new MiniCssExtractPlugin({
                filename: './css/[name].[chunkhash:8].css',
                chunkFilename: '[id].css'
            }),
            new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, '../dist/vendors', 'manifest.json')
            })
        ]
    }
    if (devMode) {
        config = Object.assign(config, {
            watch: true,
            watchOptions: {
                poll: 1000, // 每秒1000次
                aggregateTimeout: 500,
                ignored: /node_modules/
            }
        })
    }
    return config
}