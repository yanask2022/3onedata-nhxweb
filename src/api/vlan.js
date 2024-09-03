import request from '@/utils/request'

export function vlan_get(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/vlan' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'vlan',
      api: 'get'
    }
  })
}

/**
 * @param { ipv4addr: '192.168.102.1', netmask: '255.255.255.0', vid: 100, ifname: 'wlan0', comment: 'test' }
 * @returns {*}
 */
export function vlan_add(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/vlan' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'vlan',
      api: 'add'
    }
  })
}

/**
 *
 *  { wlan: 'wlan0 wlan1',  ipv4addr: '192.168.102.1', netmask: '255.255.255.0', vid: 100, ifname: 'wlan0', comment: 'test' }
 * @param { ipv4addr: '192.168.102.1', netmask: '255.255.255.0', vid: 100, ifname: 'wlan0', comment: 'test' }
 * @returns {*}
 */
export function vlan_set(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/vlan' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'vlan',
      api: 'set'
    }
  })
}

/**
 *
 * @param {name: 'vlan100'}
 * @returns {*}
 */
export function vlan_delete(params) {
  return request({
    url: process.env.NODE_ENV === 'development' ? '/vlan' : '/',
    method: 'post',
    data: {
      param: params,
      module: 'vlan',
      api: 'del'
    }
  })
}
