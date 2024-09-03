import { wifi } from '@/api/wifi'
import { group_get_config } from '@/api/ac'
import * as _ from 'lodash'
import Vue from 'vue'
import { getInterfaceByName } from '@/api/interface'
import { vlan_get } from '@/api/vlan'
import { getPForwards, getZone, getRedirect, getDefaults } from '@/api/network'

const state = {
  wifi: '',
  originalWifi: '',
  group: {},
  originalGroup: {},
  interfaces: {},
  originalInterfaces: {},
  vlan: '',
  originVlan: '',
  portForwards: [],
  originPortForwards: [],
  zone: '',
  originalZone: '',
  redirect: [],
  originalRedirect: [],
  defaults: '',
  originalDefaults: ''
}
const mutations = {

  REST_ALL_CONFIG_TO_ORIGIN: (state, payload) => {
    state.wifi = _.cloneDeep(state.originalWifi)
    state.group = _.cloneDeep(state.originalGroup)
    state.interfaces = _.cloneDeep(state.originalInterfaces)
    state.vlan = _.cloneDeep(state.originVlan)
    state.portForwards = _.cloneDeep(state.originPortForwards)
    state.zone = _.cloneDeep(state.originalZone)
    state.defaults = _.cloneDeep(state.originalDefaults)
  },

  SET_VLAN: (state, vlan) => {
    const tempVlan = {}
    Object.keys(vlan).forEach(key => {
      const currentVlan = vlan[key]
      const tempObj = {}
      tempObj.name = currentVlan.name
      tempObj.vid = currentVlan.vid
      tempObj.type = currentVlan.type
      tempObj.comment = currentVlan.comment
      tempObj.wlan = currentVlan.wlan
      tempObj.ifname = currentVlan.status.ifname
      if (Array.isArray(currentVlan.status.ipaddrs)) {
        tempObj.ipv4addr = currentVlan.status.ipaddrs[0].addr
        tempObj.netmask = currentVlan.status.ipaddrs[0].netmask
      } else {
        tempObj.ipv4addr = ''
        tempObj.netmask = ''
      }

      tempVlan[key] = tempObj
    })
    state.vlan = tempVlan
  },
  SET_ORIGINAL_VLAN: (state, original) => {
    const tempVlan = {}
    Object.keys(original).forEach(key => {
      const currentVlan = original[key]
      const tempObj = {}
      tempObj.name = currentVlan.name
      tempObj.vid = currentVlan.vid
      tempObj.type = currentVlan.type
      tempObj.comment = currentVlan.comment
      tempObj.wlan = currentVlan.wlan
      tempObj.ifname = currentVlan.status.ifname
      if (Array.isArray(currentVlan.status.ipaddrs)) {
        tempObj.ipv4addr = currentVlan.status.ipaddrs[0].addr
        tempObj.netmask = currentVlan.status.ipaddrs[0].netmask
      } else {
        tempObj.ipv4addr = ''
        tempObj.netmask = ''
      }

      tempVlan[key] = tempObj
    })
    state.originVlan = tempVlan
  },

  SET_VLAN_CONFIG: (state, [vlanName, vlanConfig]) => {
    Vue.set(state.vlan, vlanName, vlanConfig)
  },

  SET_INTERFACE: (state, [interfaceName, interfaceConfig]) => {
    Vue.set(state.interfaces, interfaceName, interfaceConfig)
  },

  SET_ORIGINAL_INTERFACES: (state, [interfaceName, interfaceConfig]) => {
    Vue.set(state.originalInterfaces, interfaceName, interfaceConfig)
  },

  // 设置 interface 单项配置
  SET_INTERFACE_CONFIG: (state, [interfaceName, key, value]) => {
    Vue.set(state.interfaces[interfaceName], key, value)
  },

  // wifi配置单项
  SET_WIFI_CONFIG: (state, [key, config]) => {
    Vue.set(state.wifi, key, config)
    // state.wifi[key] = config
  },
  SET_PORTFORWARD_CONFIG: (state, [index, settings]) => {
    Vue.set(state.portForwards, index, settings)
  },
  SET_WIFI: (state, wifi) => {
    state.wifi = wifi
  },
  SET_ORIGINAL_WIFI: (state, original) => {
    state.originalWifi = original
  },
  SET_GROUP: (state, [group, config]) => {
    Vue.set(state.group, group, config)
  },
  SET_GROUP_CONFIG: (state, [group, pkey, config]) => {
    Vue.set(state.group[group], pkey, config)
  },
  SET_ORIGINAL_GROUP: (state, [group, config]) => {
    Vue.set(state.originalGroup, group, config)
  },
  SET_PORT_FORWARDS: (state, portFowards) => {
    state.portForwards = portFowards
  },
  SET_ORIGIN_PORT_FORWARDS: (state, originPortForwards) => {
    state.originPortForwards = originPortForwards
  },
  SET_ZONE: (state, zone) => {
    state.zone = zone
  },
  SET_ORIGINAL_ZONE: (state, originalZone) => {
    state.originalZone = originalZone
  },
  SET_REDIRECT: (state, redirect) => {
    state.redirect = redirect
  },
  SET_ORIGINAL_REDIRECT: (state, originalRedirect) => {
    state.originalRedirect = originalRedirect
  },
  SET_DEFAULTS: (state, defaults) => {
    state.defaults = defaults
  },
  SET_ORIGINAL_DEFAULTS: (state, defaults) => {
    state.originalDefaults = defaults
  }
}

const actions = {

  getVLan({ commit, state }, force) {
    return new Promise((resolve, reject) => {
      if (force === true || !state.vlan) {
        vlan_get().then(response => {
          commit('SET_VLAN', response.vlan)
          commit('SET_ORIGINAL_VLAN', _.cloneDeep(response.vlan))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.vlan)
      }
    })
  },
  getInterfaceConfigByName({ commit, state }, [interfaceName, force]) {
    return new Promise((resolve, reject) => {
      if (force === true || state.interfaces.length < 1) {
        getInterfaceByName({ interface: interfaceName }).then(res => {
          commit('SET_INTERFACE', [interfaceName, res])
          commit('SET_ORIGINAL_INTERFACES', [interfaceName, _.cloneDeep(res)])
          resolve(res)
        })
      } else {
        resolve(state.interfaces[interfaceName])
      }
    })
  },

  getWifi({ commit, state }, force) {
    return new Promise((resolve, reject) => {
      if (force === true || !state.wifi) {
        wifi({}).then(response => {
          commit('SET_WIFI', response)
          commit('SET_ORIGINAL_WIFI', _.cloneDeep(response))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.wifi)
      }
    })
  },
  getGroup({ commit, state }, [group, force]) {
    return new Promise((resolve, reject) => {
      if (force === true || !state.group[group]) {
        group_get_config({ group: group }).then(response => {
          commit('SET_GROUP', [group, response])
          commit('SET_ORIGINAL_GROUP', [group, _.cloneDeep(response)])
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.group[group])
      }
    })
  },
  getPortForwards({ commit, state }, force) {
    return new Promise((resolve, reject) => {
      if (force || state.portForwards.length < 1) {
        getPForwards().then((res) => {
          commit('SET_PORT_FORWARDS', Array.isArray(res.pforward) ? res.pforward : [])
          commit('SET_ORIGIN_PORT_FORWARDS', Array.isArray(res.pforward) ? _.cloneDeep(res.pforward) : [])
          resolve(res.pforward)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.portForwards)
      }
    })
  },
  getZone({ commit, state }, force) {
    return new Promise((resolve, reject) => {
      if (force || !state.zone) {
        getZone().then((res) => {
          Object.keys(res).map(key => {
            res[key]['key'] = key
          })
          commit('SET_ZONE', res)
          commit('SET_ORIGINAL_ZONE', _.cloneDeep(res))
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.zone)
      }
    })
  },
  getRedirects({ commit, state }, force) {
    return new Promise((resolve, reject) => {
      if (force || state.redirect.length < 1) {
        getRedirect().then((res) => {
          commit('SET_REDIRECT', Array.isArray(res.redirect) ? res.redirect : [])
          commit('SET_ORIGINAL_REDIRECT', Array.isArray(res.redirect) ? _.cloneDeep(res.redirect) : [])
          resolve(res.redirect)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.redirect)
      }
    })
  },
  getDefaults({ commit, state }, force) {
    return new Promise((resolve, reject) => {
      if (force || state.redirect.length < 1) {
        getDefaults().then((res) => {
          commit('SET_DEFAULTS', res)
          commit('SET_ORIGINAL_DEFAULTS', _.cloneDeep(res))
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.defaults)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

