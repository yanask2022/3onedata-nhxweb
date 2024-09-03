import request from '@/utils/request'

export function wifi(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/wifi' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'get'
    }
  })
}

export function get_runtime(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/wifi' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'get_runtime'
    }
  })
}

export function setWifi(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/wifi' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'set'
    }
  })
}

export function applyWifi(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/wifi' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'apply'
    }
  })
}

export function setSta(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/wifi' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'set'
    }
  })
}

export function scan(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/scan' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'scan'
    }
  })
}


export function get_stalist(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'wifi',
      api: 'get_stalist'
    }
  })
}
