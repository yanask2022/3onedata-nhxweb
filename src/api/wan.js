import request from '@/utils/request'

export function get_runtimes(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_runtimes' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wan',
      api: 'get_runtimes'
    }
  })
}

export function get_runtime(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_runtimes' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wan',
      api: 'get_runtime'
    }
  })
}

export function get(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_runtimes' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wan',
      api: 'get'
    }
  })
}

export function setWan(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/set' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wan',
      api: 'set'
    }
  })
}

export function connect(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/connect' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wan',
      api: 'connect'
    }
  })
}

export function disconnect(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/disconnect' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wan',
      api: 'disconnect'
    }
  })
}
