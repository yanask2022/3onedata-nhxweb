import request from '@/utils/request'

export function ping(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'diag',
      api: 'ping'
    }
  })
}

export function traceroute(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/set' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'diag',
      api: 'traceroute'
    }
  })
}
