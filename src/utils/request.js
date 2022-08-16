import axios from "axios";

// 创建实例
const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0/',
    timeout: 5000
})



// 配置拦截器，添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前能做什么
        return config
    },
    function (error) {
        // 对请求错误能做什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对相应数据做点什么
        return response.data
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

export default instance