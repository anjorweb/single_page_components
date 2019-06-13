// import { uploadFile } from '_api/media'
import Cookie from 'js-cookie'
import axios from 'axios'
import { Loading, Message } from 'element-ui'
const options = {
    lock: true,
    background: 'rgba(255, 255, 255, 0.5)'
}
let loadingInstance
const upload = ({ url, file, param }) => {
    return new Promise((resolve, reject) => {
        const userForm = new FormData()
        for (const key in param) {
            userForm.append(key, param[key])
        }
        userForm.append('name', file.file.name)
        userForm.append('file', file.file, file.file.name)
        // uploadFile(userForm).then(res => {
        //     console.dir(res)
        // })
        loadingInstance = Loading.service(options)
        axios({
            method: 'post',
            url: `/api${url}`,
            // url: '/api/attachment/upload-file',
            data: userForm,
            headers: {
                'token': Cookie.get('User-Token')
            }
        }).then(res => {
            const data = res.data
            if (Number(data.code) !== 0) {
                Message.error(data.msg)
                loadingInstance.close()
                reject(data)
                return null
            }
            resolve(data)
            loadingInstance.close()
        }).catch((error) => {
            loadingInstance.close()
            reject(error)
        })
    })
}
export default upload
