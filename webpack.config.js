const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
module.exports = env => {
    const devMode = env.production === true
    return {
        entry: path.resolve(__dirname, 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "js/index.js"
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".tsx", ".ts", ".js", ".jsx"],
            alias: {
                _components: path.resolve(__dirname, 'components'),
            }
        },
        optimization: {
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
                    test: /\.js$/,
                    use: 'HappyPack/loader?id=js',
                    include: path.resolve(__dirname, "../src"),
                    // exclude: /node_modules/
                },
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
                id: 'js',
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { "targets": {"ie": "9","esmodules": true }, "useBuiltIns": "usage","corejs": 3 }], "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                favicon: path.resolve(__dirname, 'favicon.ico'),
                filename: 'index.html',
                inject: 'body',
                minify: true,
            }),
            new MiniCssExtractPlugin({
                filename: './css/[name].[chunkhash:8].css',
                chunkFilename: '[id].css'
            }),
            new webpack.DllReferencePlugin({
                manifest: path.resolve( __dirname, 'dist', 'manifest.json')
            })
        ],
        watch: true,
        watchOptions: {
            poll: 1000, // 每秒1000次
            aggregateTimeout: 500,
            ignored: /node_modules/
        },
    }
}