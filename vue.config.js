const configs = require('./config')
// 用于做相应merge处理
const merge = require('webpack-merge')
// 根据环境判断使用哪份配置
const cfg =
    process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env
const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const isPro = process.env.NODE_ENV === 'production'
module.exports = {
    // 判断baseUrl
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 正式环境生成sourceMap
    productionSourceMap: false,
    lintOnSave: 'error',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_view', resolve('src/views'))
            .set('_api', resolve('src/api/list'))
            .set('_config', resolve('src/config'))
            .set('_libs', resolve('src/libs'))
            .set('_utils', resolve('src/utils'))
            .set('_img', resolve('src/assets/images'))
            .set('_assets', resolve('src/assets'))
            .set('_components', resolve('src/views/components'))
        config.plugin('define').tap(args => {
            const name = 'process.env'
            // 使用 merge 保证原始值不变
            args[0][name] = merge(args[0][name], cfg)
            return args
        })
        config.plugin('html').tap(args => {
            args[0].minify = true
            return args
        })
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'analyze') {
            return {
                plugins: [
                    // 使用包分析工具
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },
    devServer: {
        port: 4001,
        open: true,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API, // 目标地址
                changeOrigin: true, // 是否改变源地址
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}
