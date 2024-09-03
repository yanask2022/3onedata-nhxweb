<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

import { getInterfaces } from '@/api/interface'
import { get_aplist, get_assoclist } from '@/api/ac'
import { secondsToDhms } from '@/utils'
import * as _ from 'lodash'
import { get_runtime } from '@/api/wifi'

export default {
  mixins: [resize],
  props: {
    depth: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '700px'
    }
  },
  data() {
    return {
      chart: null,
      title: 'Title'
    }
  },
  watch: {
    depth(value) {
      this.chart.setOption({
        series: [
          {
            initialTreeDepth: value
          }
        ]
      })
    }
  },
  created() {
    //  get ac info
    const LAN_Promise = new Promise((resolve, reject) => {
      getInterfaces({}).then(res => {
        const rv = {}
        const lan = res.interfaces['lan']
        rv['network'] = lan.name
        if (lan.status) {
          rv['ifname'] = lan.status.ifname
          rv['uptime'] = secondsToDhms(lan.status.uptime)
          rv['mac'] = lan.status.macaddr
          rv['rx'] = lan.status.rx_bytes + ' B' + ' (' + lan.status.rx_packets + ' Pkts.)'
          rv['tx'] = lan.status.tx_bytes + ' B' + ' (' + lan.status.tx_packets + ' Pkts.)'
          rv['rx_bytes'] = lan.status.rx_bytes
          rv['tx_bytes'] = lan.status.tx_bytes
          rv['rx_packets'] = lan.status.rx_packets
          rv['tx_packets'] = lan.status.tx_packets
          if (Array.isArray(lan.status.ipaddrs)) {
            rv['ipv4'] = lan.status.ipaddrs[0].addr
          }
          if (Array.isArray(lan.status.ip6addrs)) {
            rv['ipv6'] = lan.status.ip6addrs[0].addr
          }
        }
        resolve({
          name: 'IAC',
          payload: rv
        })
      }).catch(() => {
        reject()
      })
    })

    //  get ap info
    const AP_Promise = new Promise((resolve, reject) => {
      get_aplist({}).then(res => {
        resolve({
          name: 'AP',
          payload: res.aplist
        })
      })
    }).catch(() => {
      // reject()
    })

    //  get VAP info
    const VAP_Promise = new Promise((resolve, reject) => {
      get_assoclist({}).then(res => {
        resolve({ name: 'VAP', payload: res.assoclist })
      }).catch(() => {
        reject()
      })
    })

    const Radio_Promise = new Promise((resolve, reject) => {
      get_runtime({}).then(res => {
        resolve({ name: 'RADIO', payload: res })
      }).catch(() => {
        reject()
      })
    })

    Promise.all([LAN_Promise, AP_Promise, VAP_Promise, Radio_Promise]).then((values) => {
      const params = {}
      values.forEach(value => {
        if (value.name === 'IAC') {
          params.ac = value
        } else if (value.name === 'AP') {
          params.ap = value
        } else if (value.name === 'VAP') {
          params.vap = value
        } else if (value.name === 'RADIO') {
          params.radio = value
        }
      })
      this.combineChartData(params.ac, params.ap, params.vap, params.radio)
    })
  },
  mounted() {

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    combineChartData(ac_p, ap_p, vap_p, radio) {
      // ac
      const ac = _.cloneDeep(ac_p.payload)
      ac.name = ac_p.name
      ac.children = []

      if (ap_p.payload && Array.isArray(ap_p.payload)) {
        ap_p.payload.forEach(apItem => {
          // ap
          const ap = _.cloneDeep(apItem)
          ap.children = []
          ap.name = ap_p.name
          if (vap_p.payload.length > 0) {
            vap_p.payload.forEach((vapItem) => {
              if (!vapItem.assoclist) return

              const vap = _.cloneDeep(vapItem)
              vap.origin_name = vapItem.name
              vap.name = vap_p.name
              vap.children = []

              const clientAssocListKeys = Object.keys(vapItem.assoclist)

              if (clientAssocListKeys.length > 0) {
                clientAssocListKeys.forEach(childKey => {
                  const child = vapItem.assoclist[childKey]

                  // Client
                  const client = {}
                  // for chart data
                  client.name = 'Client'

                  client['id'] = vapItem.id
                  client['ifname'] = vapItem.ifname
                  client['origin_name'] = vapItem.name
                  client['network'] = vapItem.network
                  client['channel'] = vapItem.channel
                  client['client_macaddr'] = childKey
                  client['tx_rate'] = child.tx_rate
                  client['rx_rate'] = child.rx_rate
                  client['signal'] = child.signal
                  client['noise'] = child.noise
                  client['ipaddrs'] = child.ipaddrs + ''
                  client['ip6addrs'] = child.ip6addrs + ''
                  client.lineStyle = { color: '#228B22', opacity: 1, width: 0.5 }
                  vap.children.push(client)
                })
              }
              if (vap.id === ap.id) {
                ap.children.push(vap)
              }
            })
          }
          ac.children.push(ap)
        })
      }

      // 如果 radio中 以wlan开头的数据项有macaddr属性
      // 增加一个AP节点
      let haveFixedAP = false
      const radioKeys = Object.keys(radio.payload)
      for (let i = 0; i < radioKeys.length; i++) {
        const currentRadio = radio.payload[radioKeys[i]]
        if (radioKeys[i].startsWith('wlan')) {
          haveFixedAP = !!currentRadio.macaddr
          if (haveFixedAP) {
            break
          }
        } else {
          haveFixedAP = false
        }
      }

      if (haveFixedAP) {
        const fixedAP = {
          name: 'AP',
          ip: ac.ipv4,
          id: 'AC',
          online: '',
          children: []
        }

        if (vap_p.payload.length > 0) {
          vap_p.payload.forEach((vapItem2) => {
            if (!vapItem2.assoclist) return

            const vap2 = _.cloneDeep(vapItem2)
            vap2.origin_name = vapItem2.name
            vap2.name = vap_p.name
            vap2.children = []

            const clientAssocListKeys2 = Object.keys(vapItem2.assoclist)
            // vap 的id是 ‘AC’
            if (vap2.id === 'AC' && !!vap2.vap_macaddr) {
              // 当前vap下有client
              if (clientAssocListKeys2.length > 0) {
                clientAssocListKeys2.forEach(childKey2 => {
                  const child2 = vapItem2.assoclist[childKey2]
                  // Client
                  const client = {}
                  client.name = 'Client'
                  client['id'] = vapItem2.id
                  client['ifname'] = vapItem2.ifname
                  client['origin_name'] = vapItem2.name
                  client['network'] = vapItem2.network
                  client['channel'] = vapItem2.channel
                  client['client_macaddr'] = childKey2
                  client['tx_rate'] = child2.tx_rate
                  client['rx_rate'] = child2.rx_rate
                  client['signal'] = child2.signal
                  client['noise'] = child2.noise
                  client['ipaddrs'] = child2.ipaddrs + ''
                  client['ip6addrs'] = child2.ip6addrs + ''
                  client.lineStyle = { color: '#228B22', opacity: 1, width: 0.5 }
                  vap2.children.push(client)
                })
              }
              fixedAP.children.push(vap2)
            }
          })
        }
        ac.children.push(fixedAP)
      }
      this.initChart(ac)
    },
    labelFormatter(params) {
      if (params.data.name === 'IAC') {
        let iac_vap_number = 0
        let iac_client_number = 0

        params.data.children.forEach(ap => {
          if (ap.children.length > 0) {
            iac_vap_number += ap.children.length
            ap.children.forEach(vap => {
              if (vap.children.length > 0) {
                iac_client_number += vap.children.length
              }
            })
          }
        })
        return params.data.name + '#' + params.data.ipv4 + '\n' + '#' + params.data.children.length + '#' + iac_vap_number + '#' + iac_client_number
      } else if (params.data.name === 'AP') {
        let ap_client_number = 0
        if (params.data.children.length > 0) {
          params.data.children.forEach(vap => {
            if (vap.children.length > 0) {
              ap_client_number += vap.children.length
            }
          })
        }
        return params.data.name + '#' + params.data.ip + '#' + params.data.children.length + '#' + ap_client_number
      } else if (params.data.name === 'VAP') {
        return params.data.name + '#' + params.data.ifname + '#' + params.data.children.length
      } else if (params.data.name === 'Client') {
        // return params.data.mac_address.split('').join('\n')
        return params.data.name + '#' + params.data.client_macaddr
      }
    },

    toolTipFormatter(params) {
      const paramsData = params.data
      if (paramsData.name === 'IAC') {
        let iac_vap_number = 0
        let iac_client_number = 0

        params.data.children.forEach(ap => {
          if (ap.children.length > 0) {
            iac_vap_number += ap.children.length
            ap.children.forEach(vap => {
              if (vap.children.length > 0) {
                iac_client_number += vap.children.length
              }
            })
          }
        })

        return this.createToolTipElement({
          iac_ip: paramsData.ipv4,
          iac_uptime: paramsData.uptime,
          iac_ap_quantity: params.data.children.length,
          iac_vap_quantity: iac_vap_number,
          iac_client_quantity: iac_client_number
        })
      } else if (paramsData.name === 'AP') {
        let ap_client_number = 0
        if (params.data.children.length > 0) {
          params.data.children.forEach(vap => {
            if (vap.children.length > 0) {
              ap_client_number += vap.children.length
            }
          })
        }
        return this.createToolTipElement({
          ap_id: paramsData.id,
          ap_ip: paramsData.ip,
          ap_uptime: paramsData.online,
          ap_vap_quantity: paramsData.children.length,
          ap_client_quantity: ap_client_number
        })
      } else if (paramsData.name === 'VAP') {
        return this.createToolTipElement({
          vap_ifname: paramsData.ifname,
          vap_macaddr: paramsData.vap_macaddr,
          vap_client_quantity: paramsData.children.length
        })
      } else if (paramsData.name === 'Client') {
        // return params.data.mac_address.split('').join('\n')
        return this.createToolTipElement({
          AP_ID: paramsData.id,
          vap_name: paramsData.ifname,
          wifi_iface: paramsData.origin_name,
          network: paramsData.network,
          client_macaddr: paramsData.client_macaddr,
          channel: paramsData.channel,
          tx_rate: paramsData.tx_rate,
          rx_rate: paramsData.rx_rate,
          signal: paramsData.signal,
          noise: paramsData.noise,
          ipaddrs: paramsData.ipaddrs ? '' : paramsData.ipaddrs,
          ip6addrs: paramsData.ip6addrs ? '' : paramsData.ip6addrs
        })
      }
    },

    createToolTipElement(content) {
      const newDiv = document.createElement('div')
      Object.keys(content).forEach(key => {
        const newContent = document.createElement('div')
        newContent.innerText = key + ': ' + content[key]
        newDiv.appendChild(newContent)
      })
      return newDiv
    },
    initChart(ac) {
      this.chart = echarts.init(document.getElementById(this.id))

      const option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: this.toolTipFormatter
        },
        series: [
          {
            type: 'tree',
            initialTreeDepth: 2,
            edgeShape: 'curve',
            zoom: 0.8,
            orient: 'LR',
            data: [ac],
            top: '0%',
            left: '0%',
            bottom: '0%',
            right: '0%',
            symbolSize: 10,
            symbol: 'rect',
            itemStyle: {
              color: 'black',
              borderColor: '#000000',
              borderWidth: 1
            },
            lineStyle: {
              color: 'black'
            },
            roam: true,
            // label: {
            //   position: 'bottom',
            //   // verticalAlign: 'top',
            //   // align: 'center',
            //   formatter: this.labelFormatter
            // },
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9,
              formatter: this.labelFormatter,
              width: 10
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'relative'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
