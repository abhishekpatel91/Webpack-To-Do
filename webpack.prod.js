var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new UglifyJsPlugin()
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