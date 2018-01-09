const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    devServer: {
        historyApiFallback: true
    },
    entry: {
        javascript: path.join(__dirname, 'src', 'index.jsx')
    },
    output: {
        path: path.join(__dirname, 'run'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader/webpack', 'babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'app', 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, 'app'),
                from: path.join('styles', '*.css'),
                to: path.join(__dirname, 'run')
            },
            {
                from: path.join(__dirname, 'app', 'mock.json'),
                to: path.join(__dirname, 'run', 'mock.json')
            }
        ])
    ]
};
