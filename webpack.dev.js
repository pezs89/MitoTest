const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const path = require('path');

const config = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        watchOptions: {
            poll: true
        },
        port: 9000,
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        transpileOnly: true
                    }
                }, 'angular2-template-loader']
            },
            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {
                    system: true
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: "./assets/images/[name].[ext]"
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ],
                    publicPath: '../..'
                })
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            helpers.root('./src'), {}
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        }),
        new extractTextPlugin({
            filename: 'app.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;