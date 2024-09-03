import request from '@/utils/request'

export function login(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? 'login' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'login',
      api: 'login'
    }
  })
}

export function getInfo(token) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/user/info' : '/',
    method: 'post',
    data: {
      module: 'user',
      api: 'info',
      param: {
        token: token
      }
    }
  })
}

export function setMode(mode) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/user/mode' : '/',
    method: 'post',
    data: {
      module: 'user',
      api: 'set',
      param: {
        mode: mode
      }
    }
  })
}

export function logout(token) {
  return request({
    url: '/',
    method: 'post',
    data: {
      param: {
        token: token
      },
      module: 'login',
      api: 'logout'
    }
  })
}

export function mockError(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? 'mockError' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'login',
      api: 'login'
    }
  })
}
