// 公共变量
const com = {
    IP: JSON.stringify('10.64.123.24')
}
module.exports = {
    // 开发环境变量
    dev: {
        env: {
            TYPE: JSON.stringify('dev'),
            cssExtract: false,
            ...com
        }
    },
    // 生产环境变量
    build: {
        env: {
            TYPE: JSON.stringify('prod'),
            cssExtract: true,
            ...com
        }
    }
}
