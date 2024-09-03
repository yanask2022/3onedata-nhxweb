import request from '@/utils/request'

export function get_info(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_info' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'get_info'
    }
  })
}

export function get_dmesg(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_info' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'get_dmesg'
    }
  })
}

export function get_log(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_info' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'get_log'
    }
  })
}

export function sbackup(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/sbackup' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'backup'
    }
  })
}

export function srestore(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/srestore' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'restore'
    }
  })
}

export function factory(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/factory' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'factory'
    }
  })
}

export function reboot(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/reboot' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'reboot'
    }
  })
}

export function backup(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/reboot' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'system',
      api: 'reboot'
    }
  })
}
