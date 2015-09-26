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
    devtool: 'source-map',
    resolve: {
        root: [join(app, "bower_components")]
    },
    module: {
        preLoaders: [
            {
                test: /(\.js$|\.jsx$)/,
                exclude: /(node_modules|bower_components)/,
                loader: "eslint-loader"
            }
        ],
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
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {test: /\.css$/, loader: "style!css"},

            //assets
            {test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000'},
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
    },
    eslint: {
        configFile: '.eslintrc'
    },
};
