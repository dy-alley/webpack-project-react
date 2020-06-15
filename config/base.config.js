const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopeWebpackPlugin = require("copy-webpack-plugin")
const APP_PATH = path.resolve(__dirname, '../src');
// 配置入口文件 出口文件路径
const PATH = {
    app:path.join(__dirname, '../src/main.tsx'),
    build:path.join(__dirname, '../dist')
}

const config = {
    // 入口配置
    entry: {
        app:PATH.app,
    },
    // 出口配置
    output: {
        path: PATH.build,
        filename: process.env.NODE_ENV === "development" ? "js/[name].[hash:8].js" : "js/[name].[contenthash:8].js" // // contenthash：只有模块的内容改变，才会改变hash值
    },
    // 简写默认配置
    resolve:{
        // 默认解析的后缀文件
        extensions: [".tsx", ".ts" ,".js"],
        // 别名配置
        alias: {
            '@': path.resolve(__dirname, '../src/')
        }
    },
    plugins:[
        // 模板文件配置
        new HtmlWebpackPlugin({
            template:"./public/index.html",
            filename:"index.html"
        }),
        // 拷贝静态资源文件
        new CopeWebpackPlugin([
            {
                context: path.join(__dirname, "../public/"),
                from: '**/*',
                to: path.join(__dirname, "../dist"),
                ignore: ['index.html'],
            }
        ])
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                include:[APP_PATH],
                loader: 'eslint-loader',
                options: {
                  emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                  emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                  fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
                }
            },
            // tsx文件配置
            {
                test: /\.(tsx|ts)$/,
                include: APP_PATH,
                loader: "ts-loader",
                exclude: path.join(__dirname, "../node_modules/")
            },
            // js文件配置
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                include: APP_PATH,
                exclude: path.join(__dirname, "../node_modules/")
            },
            // 图片配置
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit:2048,
                        name:"image/[name].[ext]",
                    }
                },
                exclude: path.join(__dirname, "../node_modules/")
            },
            // 字体配置
            {
                test: /\.(woff|svg|woff2|eot|ttf)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        name:"iconfont/[name].[ext]"
                    }
                },
                exclude: path.join(__dirname, "../node_modules/")
            }
        ]
    }
}

module.exports = config;