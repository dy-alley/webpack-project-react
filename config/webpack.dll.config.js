const Webpack = require("webpack");
const path = require("path");
module.exports = {
    entry:{
        react:['react', 'react-dom'],
        utils:['axios', 'dayjs', 'immer', 'lodash']
    },
    output:{
        /*
            # 存放动态链接库的全局变量名称，例如对应 lodash 来说就是 lodash_dll_lib
            # 这个名称需要与 DllPlugin 插件中的 name 属性值对应起来
        */
        filename: "dll.[name].js", //打包文件的名字
        library: "_dll_[name]",  //可选 暴露出的全局变量名
        // 生成文件存放的位置
        path: path.join(__dirname,"../public/js"),
    },
    plugins:[
        new Webpack.DllPlugin({
            name: "_dll_[name]",
            path: path.join(__dirname,"../public/manifest", "[name].manifest.json"),
        })
    ]
}