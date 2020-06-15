const path = require("path");
// const {PUBLICPATH} = require("./hostPath");
const proxy = {
  "/lapi": {
    pathRewrite: {
      "^/lapi": ""
    },
    target: "",
    secure: false,
    changeOrigin: true  
  },
};

const devServer = {
  hot: true,
  contentBase: path.join(__dirname, "../dist"),
 // proxy,
//   disableHostCheck: true,
//   publicPath: "/",
//   allowedHosts: [".dz11.com"],
//   host:"local.audiosocialdev.dz11.com",
//   historyApiFallback: true,
//   https:true,
  port: 9008
};

module.exports = devServer;
