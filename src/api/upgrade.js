import request from '@/utils/request'

export function upgrade(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/get' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'upgrade',
      api: 'upgrade'
    }
  })
}

