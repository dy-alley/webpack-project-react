const cssnext = require("postcss-cssnext");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 100, // html节点设的font-size大小，由于chrome最小12px，所以基值要设置大写
      unitPrecision: 5, // 转rem精确到小数点多少位
      propList: ['font', 'font-size', 'line-height', 'width', 'height'], // 指定转换成rem的属性，支持 * ！
      selectorBlackList: [], // str或reg ，指定不转换的选择器，str时包含字段即匹配
      replace: true,
      mediaQuery: false, // 媒体查询内的px是否转换
      minPixelValue: 0 // 小于指定数值的px不转换
    }),
    cssnext({
      features: {
        autoprefixer: {
          browsers: [
            "defaults",
            "last 3 versions",
            "ie >= 9",
            "ff >= 30",
            "chrome >= 34",
            "safari >= 6",
            "opera >= 12"
          ]
        },
      }
    })
  ]
};
