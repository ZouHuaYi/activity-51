
export default {
  // treeShaking: true,
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
        format:'{parent}{separator}{current}',
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
      .test( /\.css(\?.*)?$/)
      .use('postcss-loader')
      .loader('px2rem-loader')
      .before('postcss-loader')
      .options({
        "rootValue": 75,                      // 换算的基数
        "selectorBlackList": ["antd-mobile"], // 忽略转换正则匹配项
        "minPixelValue": 2,
        "propList": ["*"]
      })
  },
  autoprefixer:{ // 配置css兼容问题
    // browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%'],
    // flexbox: true
  },
  extraPostCSSPlugins:[],
  extraBabelPlugins:[ // 提前加载 css文件
    ["import",
      { "libraryName": "antd-mobile", "style": "css" }
    ],
    [
      "transform-remove-console",{
      "exclude":["error","warn"]
      }
    ]
  ],
  base:'/activity',
  publicPath:'./',
  outputPath:'./activity',
  cssPublicPath:'./',
  history: 'hash',
  proxy: {
    '/api': {
      target: 'https://admin.topmei3mei.com/',
      // target: 'http://192.168.2.236:8080/msm/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
}
