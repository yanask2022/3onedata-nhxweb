import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errCodeObj from '@/utils/errcode'
const hostname = window.location.hostname

function codeToMessage(code) {
  let message = 'Error'
  Object.keys(errCodeObj).forEach((key) => {
    if (code === errCodeObj[key]) {
      message = key
    }
  })
  return message
}

console.log(hostname)
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 开发环境使用：VUE_APP_BASE_API， 测试环境： http://192.168.1.1/api
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : 'http://192.168.1.1/api',
  // baseURL: window.location.hostname, // url = base url + request url
  // baseURL: "http://192.168.1.1/api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.data['version'] = '1.0'
    if (store.getters.token) {
      config.data['sid'] = getToken()
    } else {
      config.data['sid'] = '000000000000000000000000000000'
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // return response.data.result
    const res = response.data

    // if the custom code is not 0, it is judged as an error.
    if (res.errcode !== 0) {
      const errMsg = codeToMessage(res.errcode).replace(/_/g, ' ').toLowerCase()
      Message({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
      })

      // NHX_ERRCODE_AUTH_FAILED
      if (res.errcode === -1006) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //
        // })
      }
      return Promise.reject(new Error(errMsg || 'Error'))
    } else {
      return res.result
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
