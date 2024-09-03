<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <div class="header-wrapper">
          <span>Interfaces status</span>
          <el-button class="reset-btn" size="small" @click="onAdd">
            ADD NEW INTERFACE
          </el-button>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          :selection="false"
          :table-data="tableData"
          :columns="columns"
          default-slot-width="350"
          default-slot-label="Actions"
        >
          <!-- <template v-slot:status="{ scope }">
            <div class="item-status">
              <div style="display: flex; flex-direction: column;align-items: flex-start">
                <span>Uptime: {{ scope.row.status.uptime }}</span>
                <span>MAC-Address: {{ scope.row.status.mac_address }}</span>
                <span>RX: {{ scope.row.status.rx_bytes }} B ({{ scope.row.status.rx_packets }} Pkts.)</span>
                <span>TX: {{ scope.row.status.tx_bytes }} B ({{ scope.row.status.tx_packets }} Pkts.)</span>
              </div>
            </div>
          </template> -->

          <template v-slot:default="{ scope }">
            <div class="item-actions">
              <el-button type="primary" @click="onConnect(scope.row)">CONNECT</el-button>
              <el-button type="danger" @click="onStop(scope.row)">STOP</el-button>
              <el-button type="primary" @click="onEdit(scope.row)">EDIT</el-button>
              <el-button type="danger" @click="onDelete(scope.row)">DELETE</el-button>
            </div>
          </template>
        </NXHTableExtends>
      </div>
    </el-card>
    <br>
    <br>
    <!--<el-card shadow="never">
      <div slot="header">
        <span>Global network options</span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'ipv6_prefix'}">
          <div class="field-key">
            <span class="field-key-text">IPv6 ULA-Prefix</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="globalSettings.ipv6_prefix" sizi="small" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>-->
  </div>
</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { getInterfaces, actInterfaces, delInterfaces } from '@/api/interface'
import { secondsToDhms } from '@/utils'
import { get_info } from '@/api/system'
import { get_runtimes } from '@/api/wan'

export default {
  name: 'OverviewTab',
  components: {
    NXHTableExtends
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      intervalIds: [],
      randomKey: Math.random(),
      tableData: [],
      columns: [
        { label: 'Network', prop: 'network', fixed: true },
        { label: 'ifname', prop: 'ifname', custom: false },
        { label: 'Uptime', prop: 'uptime', custom: false },
        { label: 'MAC', prop: 'mac', custom: false },
        { label: 'Rx', prop: 'rx', custom: false },
        { label: 'Tx', prop: 'tx', custom: false },
        { label: 'ipv4-address', prop: 'ipv4', custom: false },
        { label: 'ipv6-address', prop: 'ipv6', custom: false }
        // { label: 'Status', prop: 'status', custom: true, fixedWidth: '400' }
      ],
      globalSettings: {
        ipv6_prefix: 'fd16:1529:85c5::/48'
      },
      hash: ''
    }
  },
  created() {
    this.getTableData()
    this.intervalIds.push(setInterval(() => {
      this.getTableData()
    }, 15000))
  },
  beforeDestroy() {
    this.intervalIds.forEach(id => {
      clearInterval(id)
    })
  },
  methods: {
    getTableData() {
      this.tableData = []
      getInterfaces({}).then(res => {
        // this.tableData = res.interfaces
        for (const interfacesKey in res.interfaces) {
          // console.log(res.interfaces[interfacesKey])
          var rv = {}

          rv['network'] = res.interfaces[interfacesKey].name
          if (res.interfaces[interfacesKey].status) {
            rv['ifname'] = res.interfaces[interfacesKey].status.ifname
            rv['uptime'] = secondsToDhms(res.interfaces[interfacesKey].status.uptime),
            rv['mac'] = res.interfaces[interfacesKey].status.macaddr, // TODO
            rv['rx'] = res.interfaces[interfacesKey].status.rx_bytes + ' B' + ' (' + res.interfaces[interfacesKey].status.rx_packets + ' Pkts.)', // TODO
            rv['tx'] = res.interfaces[interfacesKey].status.tx_bytes + ' B' + ' (' + res.interfaces[interfacesKey].status.tx_packets + ' Pkts.)', // TODO
            rv['rx_bytes'] = res.interfaces[interfacesKey].status.rx_bytes, // TODO
            rv['tx_bytes'] = res.interfaces[interfacesKey].status.tx_bytes, // TODO
            rv['rx_packets'] = res.interfaces[interfacesKey].status.rx_packets, // TODO
            rv['tx_packets'] = res.interfaces[interfacesKey].status.tx_packets // TODO
            if (Array.isArray(res.interfaces[interfacesKey].status.ipaddrs)) {
              rv['ipv4'] = res.interfaces[interfacesKey].status.ipaddrs[0].addr + '/' + res.interfaces[interfacesKey].status.ipaddrs[0].prefix
            }
            if (Array.isArray(res.interfaces[interfacesKey].status.ip6addrs)) {
              rv['ipv6'] = res.interfaces[interfacesKey].status.ip6addrs[0].addr + '/' + res.interfaces[interfacesKey].status.ip6addrs[0].prefix
            }
          }
          this.tableData.push(rv)
        }
      })
    },
    onConnect(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      var params = {}
      params['action'] = 'connect'
      params['name'] = row.network
      actInterfaces(params).then(res => {
        loading.close()
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onStop(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      var params = {}
      params['action'] = 'stop'
      params['name'] = row.network
      actInterfaces(params).then(res => {
        loading.close()
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onEdit(row) {
      this.$emit('onEditClick', row.network)
    },
    onDelete(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      var params = {}
      params['name'] = row.network
      delInterfaces(params).then(res => {
        loading.close()
        this.$EventBus.$emit('RefreshInterfaceTab', { activeName: 'OverviewTab' })
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onAdd() {
      this.$router.push({
        name: 'iface_add'
      })
    }
  }
}
</script>

<style scoped lang="scss">
span {
  font-size: 12px;
}

.el-button--mini {
  color: #FFFFFF !important;
}

.reset-btn {
  background-color: #4a90e2;
  color: #ffffff;
}

::v-deep .el-icon-circle-plus {
  color: #FFFFFF;
  //font-size: 14px;
}

.item-actions {
  justify-content: center;
  display: flex;
}

.item-status {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.header-wrapper {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
</style>
