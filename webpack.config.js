const path                    = require('path')
const webpack                 = require('webpack')
const TerserPlugin            = require('terser-webpack-plugin')
const MiniCssExtractPlugin    = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')

module.exports = {
    entry: {
        app:         './client/index/index.js',
        'admin/app': './client/admin/index.js',
        preload:     './client/common/styles/preload.styl'
    },
    output: {
        filename:      '[name].js',
        chunkFilename: '[chunkhash].module.js',
        path:          path.resolve(__dirname, 'dist'),
        publicPath:    '/dist/'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new WebpackBundleSizeAnalyzerPlugin('./report.txt'),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep']
        }),
        new MiniCssExtractPlugin({
            filename:      '[name].css',
            chunkFilename: '[chunkhash].module.css',
            ignoreOrder:   false
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
    stats: {
        children: false
    }
}
