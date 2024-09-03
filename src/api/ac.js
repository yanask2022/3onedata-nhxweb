import request from '@/utils/request'

export function get(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'get'
    }
  })
}

export function get_assoclist(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'get_assoclist'
    }
  })
}

export function group_add(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_add'
    }
  })
}

export function group_modify(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/group-modify' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_modify'
    }
  })
}

export function get_aplist(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get-aplist' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'get_aplist'
    }
  })
}
export function get_group(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get-group' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_get'
    }
  })
}

export function del_group(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/del-group' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_del'
    }
  })
}

export function group_get_config(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/group-get-config' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_get_config'
    }
  })
}

export function group_set_config(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/group-set-config' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_set_config'
    }
  })
}
export function group_add_device(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/group_add_device' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'ac',
      api: 'group_add_device'
    }
  })
}
