var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'app', 'js', 'main.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app', 'dist')
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    plugins: [
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