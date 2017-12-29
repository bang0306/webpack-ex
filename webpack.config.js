const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
    return {
        context: resolve('src'),
        entry: {
            app: './app.js',
            concat: './concat.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: resolve('dist')
        },
        devServer: {
            contentBase: resolve(__dirname, 'dist'),
            compress: true,
            port: 9000,
            hot: true,
            stats: 'errors-only',
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'index',
                filename: 'index.html',
                excludeChunks: ['concat'],
                minify: {
                    collapseWhiteSpace: true
                },
                hash: true,
                template: './index.ejs'
            }),
            new HtmlWebpackPlugin({
                title: 'concat',
                filename: 'concat.html',
                chunks: ['concat'],
                minify: {
                    collapseWhiteSpace: true
                },
                hash: true,
                template: './concat.ejs'
            }),
            new ExtractTextPlugin("bundle.css"),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}
