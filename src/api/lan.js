import request from '@/utils/request'

export function get(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'lan',
      api: 'get'
    }
  })
}

export function setLan(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/set' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'lan',
      api: 'set'
    }
  })
}
