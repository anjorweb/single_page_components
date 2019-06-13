import Http from '../http'
// 上传文件测试
export const uploadFile = params => {
    return Http.file('/attachment/upload-file', params)
}
