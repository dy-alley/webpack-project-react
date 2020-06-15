const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require("webpack")
const AddAssetHtmlWebpackPLugin = require("add-asset-html-webpack-plugin");
const path = require("path")
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = webpackMerge(baseConfig, {
    mode: "production",
    devtool:'cheap-module-source-map',
    module:{
        rules:[
            {
                test: /\.(css|scss)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:"css-loader",
                        options: {
                            modules: false // 如果要启用css modules，改为true即可
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"css/[name].[hash].css"
        }),
        new Webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "../public/manifest/react.manifest.json")
        }),
        new Webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "../public/manifest/utils.manifest.json")
        }),
        new AddAssetHtmlWebpackPLugin({
            filepath: path.join(__dirname, "../public/js/dll.react.js"),
            outputPath: 'js',
            hash: true,
        }),
        new AddAssetHtmlWebpackPLugin({
            filepath: path.join(__dirname, "../public/js/dll.utils.js"),
            outputPath: 'js',
            hash: true,
        }),
        new CleanWebpackPlugin(),
        new CompressionWebpackPlugin({
            // 新资源名
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            // 处理所有匹配此 {RegExp} 的资源
            test: /\.js/,
            threshold: 10240, // 大于这个大小的文件才会被压缩
            // 只有压缩率比这个值小的资源才会被处理
            minRatio: 0.8
        }),
    ],
    // optimization: {
    //     splitChunks: {
    //       chunks: 'all',
    //       minChunks: 2,
    //       maxInitialRequests: 5,
    //       cacheGroups: {
    //         // 提取公共模块
    //         commons: {
    //           chunks: 'all',
    //           test: /[\\/]node_modules[\\/]/,
    //           minChunks: 2,
    //           maxInitialRequests: 5,
    //           minSize: 0,
    //           name: 'common'
    //         }
    //       }
    //     }
    // }
})


/*
    模块提取
        chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
        minSize: 表示在压缩前的最小模块大小，默认是30kb；
        minChunks: 表示被引用次数，默认为1；
        maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
        maxInitialRequests: 最大的初始化加载次数，默认为1；
        name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成，如果是true，将自动生成基于块和缓存组键的名称。如果是字符串或函数将允许您使用自定义名称。如果名称与入口点名称匹配，则入口点将被删除。
        automaticNameDelimiter:'',名称分隔符，默认是
        cacheGroups: 缓存组。
*/