module.exports = {
  publicPath: "./",
  assetsDir: "static",
  devServer: {
    proxy: {
      "/poster": {
        target: "https://meeting.xb2.cn",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 0 }));
  },

  productionSourceMap: false,

  css: {
    extract: false,
  },
};
