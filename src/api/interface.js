import request from '@/utils/request'

export function getInterfaces(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
      module: 'interface',
      api: 'get'
    }
  })
}

export function getAllInterfaces(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
      module: 'interface',
      api: 'get_all'
    }
  })
}

export function getInterfaceByName(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
      module: 'interface',
      api: 'get_by_name',
      param: params
    }
  })
}

export function actInterfaces(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
    	param: params,
      module: 'interface',
      api: 'action'
    }
  })
}

export function delInterfaces(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'interface',
      api: 'del'
    }
  })
}

export function addInterfaces(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'interface',
      api: 'add'
    }
  })
}

export function setInterfaces(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/interface' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'interface',
      api: 'set'
    }
  })
}
