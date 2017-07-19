var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['jquery', 'lodash'],
        main: path.join(__dirname, 'app', 'js', 'main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'app', 'dist')
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, 'app')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }]
    }
}