let path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false, // 取消格式化
    devServer: {
        proxy: {
            // 匹配以所有/api开头的请求路径，名字随意
            '/api': {
                //   target: 'http://118.114.172.18:26168/', // 请求地址
                //     target: 'http://118.114.172.18:47090/', //测试环境
                //  target: 'https://hqzx.csin.net.cn/api', //正式环境
                ws: true, // 用于支持websocket 默认true

                changeOrigin: true // 默认true
                // 设置为true时，后端服务器收到的是host名为：houduanserver:5000
                // 设置为true时，后端服务器收到的是host名为：houduanserver:8080

                //  pathRewrite: { '^/api': 'http://localhost:26168' }
                // 当后端服务器中没有以/api开头的路径时，以空字符代替
            },
            /*     '/apli': {
                    target: 'http://pv.sohu.com', //这里是域名，不是完整地址
                    changeOrigin: true, //是否跨域
                    pathRewrite: {
                        '^/apli': ''
                    }
                }
            }, */

            headers: { 'Access-Control-Allow-Origin': '*' }
        },
        chainWebpack: (config) => {
            config.resolve.alias.set('@', resolve('src'));
        }
    }
};
