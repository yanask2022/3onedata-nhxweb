import request from '@/utils/request'

export function set(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/set' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'admin',
      api: 'set'
    }
  })
}
