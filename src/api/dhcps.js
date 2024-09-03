import request from '@/utils/request'

export function dhcps_get(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'dhcps',
      api: 'get'
    }
  })
}

export function dhcps_set(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/set' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'dhcps',
      api: 'set'
    }
  })
}

export function dhcps_get_leases(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get_leases' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'dhcps',
      api: 'get_leases'
    }
  })
}
