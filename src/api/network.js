import request from '@/utils/request'

export function getPForwards(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/getPForwards' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'pforward_get'
    }
  })
}

export function addPForward(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/addPForward' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'pforward_add'
    }
  })
}

export function delPForward(index) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/deleteForward' : '/',
    method: 'post',
    data: {
      param: {
        pforward: [
          { index: index }
        ]
      },
      module: 'firewall',
      api: 'pforward_delete'
    }
  })
}


export function modifyForward(forward) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/modifyForward' : '/',
    method: 'post',
    data: {
      param: {
        pforward: forward
      },
      module: 'firewall',
      api: 'pforward_modify'
    }
  })
}

export function getZone(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/getZone' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'zone_get'
    }
  })
}
export function setZone(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/setZone' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'zone_set'
    }
  })
}

export function getRedirect(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/getRedirect' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'redirect_get'
    }
  })
}


export function setRedirect(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/setRedirect' : '/',
    method: 'post',
    data: {
      param: {
        redirect: params
      },
      module: 'firewall',
      api: 'redirect_modify'
    }
  })
}

export function addRedirect(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/addRedirect' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'redirect_add'
    }
  })
}


export function delRedirect(index) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/delRedirect' : '/',
    method: 'post',
    data: {
      param: {
        redirect: [
          { index: index }
        ]
      },
      module: 'firewall',
      api: 'redirect_delete'
    }
  })
}
export function getDefaults(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/getDefaults' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'get'
    }
  })
}
export function setDefaults(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/setDefaults' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'firewall',
      api: 'set'
    }
  })
}
