import freeRequest from '@/utils/free-request.js'

export function jsonRequest() {
  return freeRequest({
    url: process.env.NODE_ENV === 'development' ? '/nhxconfig.json' : '/',
    method: 'get',
    data: {}
  })
}

