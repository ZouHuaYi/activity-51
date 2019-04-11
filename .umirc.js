
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  "lessLoaderOptions": {
    "javascriptEnabled": true
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: {
        defaultTitle:'美上美',
        userLocale:false,
        format:'美上美{separator}{parent}{separator}{current}',
      },
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  chainWebpack(config,{ webpack }){
    config.module
      .rule('postcss')
      .test(/\.css$/)
      .use('postcss-loader')
      .loader('px2rem-loader')
      .before('postcss-loader')
      .options({
        "rootValue": 75, // 换算的基数
        "selectorBlackList": ["antd-mobile"], // 忽略转换正则匹配项
        "minPixelValue": 2,
        "propList": ["*"]
      })

  },
  publicPath:'./',
  outputPath:'./ok',
  proxy: {
    '/api': {
      target: 'http://test.topmei3mei.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
}
