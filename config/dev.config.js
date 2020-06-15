const webpackMerge = require("webpack-merge")
const baseConfig = require("./base.config");
const devServer = require("./webpackDevServer")
const webpack = require('webpack');

const config = webpackMerge(baseConfig, {
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader",options: {
                        modules: false // 如果要启用css modules，改为true即可
                      }},
                    {loader:"postcss-loader"},
                    {loader:"sass-loader"}
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer,
})

module.exports = config;