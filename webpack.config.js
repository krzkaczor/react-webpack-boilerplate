var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


var join = require('path').join;

var app = join(__dirname, 'app');
var build = join(__dirname, 'build');

module.exports = {
    entry: join(app, "app.js"),
    output: {
        path: build,
        filename: "[name].js"
    },
    devtool: 'source-map',
    resolve: {
        root: [join(app, "bower_components")]
    },
    module: {
        loaders: [
            //babel
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets : ['stage-0', 'es2015', 'react'],
                    plugins : ['babel-plugin-transform-decorators-legacy']
                }
            },

            //styles
            {
                test: /\.less$/,
                loader: "style!css!less?strictMath&noIeCompat"
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {test: /\.css$/, loader: "style!css"},
            //assets
            {test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: join(app, 'index.html')
        }),
        new webpack.OldWatchingPlugin(), //fix for failing watch for all files - needs investigating
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ],
    devServer: {
        contentBase: build,
        historyApiFallback: true
    },
    eslint: {
        configFile: '.eslintrc'
    }
};
