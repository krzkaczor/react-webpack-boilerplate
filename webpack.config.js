var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BowerWebpackPlugin = require("bower-webpack-plugin");

var join = require('path').join;

var app = join(__dirname, 'app');
var tmp = join(__dirname, 'tmp');
var bowerComponents = join(app, 'bower_components');

module.exports = {
    entry: join(app, "app.js"),
    output: {
        path: tmp,
        filename: "[name].js"
    },
    resolve: {
        root: [join(app, "bower_components")]
    },
    module: {
        loaders: [
            //babel
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            //styles
            {
                test: /\.less$/,
                loader: "style!css!less?strictMath&noIeCompat"
            },
            {test: /\.css$/, loader: "style!css"},
            //assets
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
        ]
    },
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: [bowerComponents],
            searchResolveModulesDirectories: false
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: join(app, 'index.html')
        }),
        new webpack.OldWatchingPlugin() //fix for failing watch for all files - needs investigating
    ],
    devServer: {
        contentBase: tmp,
        historyApiFallback: true
    }
};
