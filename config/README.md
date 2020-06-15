# cross-env
> windows不支持NODE_ENV=development的这样的设置方式，所以需要引入cross-env库实现兼容

# @babel/plugin-transform-runtime @babel/runtime
> 解决在项目中使用async await出现 "ReferenceError: regeneratorRuntime is not defined"

# copy-webpack-plugin
> 拷贝public中的静态资源到dist文件夹中去

# mini-css-extract-plugin
> 开发过程中我们的css是存在于js中的，此插件用户抽离JS中的css

# add-asset-html-webpack-plugin
> 将动态链接库自动的存放到 dist 文件夹，同时自动在 html 文件中引入动态链接库脚本。

# postcss-cssnext
> css4还没有各浏览器支持，但可以使用cssnext来把css4的语法翻译成css3,同时自动帮我们给css3的属性加浏览器前缀

# postcss-pxtorem
> 将px转换为rem
```javascript
    {
        rootValue: 100, // html节点设的font-size大小，由于chrome最小12px，所以基值要设置大写
        unitPrecision: 5, // 转rem精确到小数点多少位
        propList: ['font', 'font-size', 'line-height', 'letter-spacing'], // 指定转换成rem的属性，支持 * ！
        selectorBlackList: [], // str或reg ，指定不转换的选择器，str时包含字段即匹配
        replace: true,
        mediaQuery: false, // 媒体查询内的px是否转换
        minPixelValue: 0 // 小于指定数值的px不转换
    }
```

# happypack
> 由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以Webpack 需要处理的事情需要一件一件的做，不能多件事一起做。
我们需要Webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力，HappyPack 就能让 Webpack 做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

# uglifyjs-webpack-plugin
> UglifyJS Webpack Plugin插件用来缩小（压缩优化）js文件

# @babel/plugin-proposal-class-properties
> @babel/preset-env 基本上就可以满足我们的需求。但是，官方文档也说了，该预设并不支持 stage-x 相关的 plugin。也就是说，如果我们在项目中使用了TC39制定的提案阶段的语法，该预设并不能帮我们转换。`It is important to note that @babel/preset-env does not support stage-x plugins.`
```javascript
    // 比如，我们使用了stage-3阶段的类的静态属性提案语法
    class Person {
    static Version = 1.0
    }
```

# webpack-bundle-analyzer
>我们希望根据打包的命令参数，在打包时自动生成或不生成分析报告。

# optimize-css-assets-webpack-plugin
>我们发现打包好的文件中并没有css，但是css却可以正常工作，这是因为webpack并没有把样式从js中剥离出来。为了方便管理静态资源，充分利用缓存，我们需要将css单独打包。
```javascript
// webpack.prod.js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// ...webpack configs
optimization: {
  minimizer: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: true ? { map: { inline: false }} : {}
    })
  ]
}
```

# 处理图片等资源
```javascript
   module:{
       rules:[
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024, // 小于这个大小的图片，会自动base64编码后插入到代码中
                    name: 'img/[name].[hash:8].[ext]',
                    outputPath: config.assetsDirectory,
                    publicPath: config.assetsRoot
                }
            },
       ]
   }
```

# 提取公共模块，拆分代码
```javascript
    // webpack.prod.js
    entry: {
        app: './src/index.tsx',
        vendor: ['react', 'react-dom'] // 不变的代码分包
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: 5,
            cacheGroups: {
            // 提取公共模块
                commons: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'common'
                }
            }
        }
    }
```

# 压缩代码
> `npm i -D uglifyjs-webpack-plugin mini-css-extract-plugin compression-webpack-plugin`
```javascript
// webpack.prod.js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

{
  test: /\.(less|css)$/,
  use: [
    MiniCssExtractPlugin.loader, // 注意书写的顺序
    {
      loader: 'css-loader',
    },
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      }
    }
  ]
},
// ...configs
plugins: [
  new HtmlWebpackPlugin({
    template: config.indexPath,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeOptionalTags: false,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeAttributeQuotes: true,
      removeCommentsFromCDATA: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css'
    // chunkFilename: '[name].[contenthash:8].chunk.css'
  }),
  // gzip压缩
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 10240, // 大于这个大小的文件才会被压缩
    minRatio: 0.8
  }),
],
optimization: {
  minimizer: [
    new UglifyjsWebpackPlugin({
      sourceMap: config.productionJsSourceMap
    })
  ]
}
```

# terser-webpack-plugin
> 由于uglify-es已经停止维护，所以改用目前比较流行的terser来压缩js代码。我们仅需做几处简单的修改。`npm i -D terser-webpack-plugin`
```javascript
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

optimization: {
  minimizer: [
    // new UglifyjsWebpackPlugin({
    //   sourceMap: config.productionJsSourceMap
    // })
    new TerserPlugin({
      sourceMap: config.productionJsSourceMap
    })
  ]
}
```

# portfinder
>如果8080端口已经被占用，则webpack开发服务器会报错退出，无法启动，我们可以利用portfinder来自动搜索空闲的端口。`npm i -D portfinder`
```javascript
// webpack.dev.js
const portfinder = require('portfinder'); // 增加依赖

/* 将module.exports = merge.smart()修改为如下形式 */
const devWebpackConfig = merge.smart(/* ... */);

/* 寻找可用端口，并返回一个promise类型的配置，webpack可以接收promise作为配置 */
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port;
    }
    resolve(devWebpackConfig)
  })
});
```

# 配置按需加载
> 配置按需加载，可以将每个页面或组件拆成独立的包，减小首页加载内容的体积，是很好的优化策略 `npm i -D @babel/plugin-syntax-dynamic-import`

```javascript
    {
        test: /\.(j|t)sx?$/,
        include: APP_PATH,
        use: [
            {
            loader: 'babel-loader',
            options: {
                plugins: [
                '@babel/plugin-syntax-dynamic-import', // 这是新加入的项
                ['@babel/plugin-proposal-class-properties', { 'loose': true }]
                ],
                cacheDirectory: true
            }
            }
        ]
    }
```

# eslint
>我们通常使用lint工具来检查代码不规范的地方，以下是将 eslint、typescript 和 webpack 结合使用的例子。
```javascript
    cnpm i -D eslint babel-eslint eslint-loader eslint-plugin-jsx-control-statements
    cnpm i -D eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin 
```

**然后在根目录新建eslint配置文件.eslintrc.js**
```javascript
    module.exports = {
        "root": true,
        "env": {
            "browser": true,
            "node": true,
            "es6": true,
            // "jquery": true
            "jest": true,
            "jsx-control-statements/jsx-control-statements": true // 能够在jsx中使用if，需要配合另外的babel插件使用
        },
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "sourceType": 'module',
            "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
            }
        },
        "globals": {
            // "wx": "readonly",
        },
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:jsx-control-statements/recommended", // 需要另外配合babel插件使用
        ],
        "settings": {
            "react": {
            "version": "detect" // 自动读取已安装的react版本
            }
        },
        "plugins": ["@typescript-eslint", "react", "jsx-control-statements"],
        "rules": {
            "no-extra-semi": 0, // 禁止不必要的分号
            "quotes": ['error', 'single'], // 强制使用单引号
            "no-unused-vars": 0 // 不允许未定义的变量
            // ...你自己的配置
        }
    };
```

**新建.eslintignore 检查或不检查某些特定的文件**
```javascript
    **/*.js
    !src/**/*.js
```

**还需要配置webpack，才能在开发时启用eslint：**
```javascript
    // webpack.base.js
    module: {
        rules: [
            // 把这个配置放在所有loader之前
            {
            enforce: 'pre',
            test: /\.tsx?$/,
            exclude: /node_modules/,
            include: [APP_PATH],
            loader: 'eslint-loader',
            options: {
                emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
            }
            }
        ]
    }
```

# ts别名配置
**1、webpack中进行配置别名**
**2、找到tsconfig.json进行别名配置**
```javascript
    "baseUrl": ".",
		"paths": {
			"@/*": ["src/*"],
		},
```