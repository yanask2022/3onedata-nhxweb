<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <div class="header-wrapper">
          <span>Radio status</span>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          :selection="false"
          :table-data="tableData"
          :columns="columns"
          default-slot-width="150"
          default-slot-label="Actions"
        >
          <template v-slot:default="{ scope }">
            <div class="item-actions">
              <el-button type="primary" @click="onConnect(scope.row)">RELOAD</el-button>
            </div>
          </template>
        </NXHTableExtends>
      </div>
    </el-card>
    <br>
    <br>
  </div>
</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { get_runtime } from '@/api/wifi'
import { secondsToDhms } from '@/utils'
import { actInterfaces } from '@/api/interface'

export default {
  name: 'RadioOverviewTab',
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
      tableData: [
        {
          wifiiface: '1',
          ifname: '1',
          Network: '1',
          hwmode: '1',
          ssid: '1',
          Mode: '1',
          RxByte: '1',
          TxByte: '1',
          RxMulti: '1',
          TxMulti: '1',
          RxUniCast: '1',
          TxUniCast: '1',
          RxBroad: '1',
          TxBroad: '1'
        },
        {
          wifiiface: '1',
          ifname: '1',
          Network: '1',
          hwmode: '1',
          ssid: '1',
          Mode: '1',
          RxByte: '1',
          TxByte: '1',
          RxMulti: '1',
          TxMulti: '1',
          RxUniCast: '1',
          TxUniCast: '1',
          RxBroad: '1',
          TxBroad: '1'
        }

      ],
      columns: [
        { label: 'wifi-iface', prop: 'wifiiface' },
        { label: 'ifname', prop: 'ifname' },
        { label: 'Network', prop: 'Network' },
        { label: 'hwmode', prop: 'hwmode' },
        { label: 'ssid ', prop: 'ssid' },
        { label: 'Mode', prop: 'Mode' },
        { label: 'RxByte', prop: 'RxByte' },
        { label: 'TxByte', prop: 'TxByte' },
        { label: 'RxMulti', prop: 'RxMulti' },
        { label: 'TxMulti', prop: 'TxMulti' },
        { label: 'RxUniCast', prop: 'RxUniCast' },
        { label: 'TxUniCast', prop: 'TxUniCast' },
        { label: 'RxBroad', prop: 'RxBroad' },
        { label: 'TxBroad', prop: 'TxBroad' }
      ],
      hash: ''
    }
  },
  created() {
    // this.getTableData()
    // this.intervalIds.push(setInterval(() => {
    //   this.getTableData()
    // }, 15000))
  },
  beforeDestroy() {
    // this.intervalIds.forEach(id => {
    //   clearInterval(id)
    // })
  },
  methods: {
    getTableData() {
      this.tableData = []
      get_runtime({}).then(res => {
        for (let i = 0; i < 9; i++) {
          const key = 'wlan' + i
          if (res[key]) {
            this.tableData.push({ ...res[key], paramsKey: key, key: '' })
          }
        }

        for (let i = 0; i < 9; i++) {
          const key = 'wlan1' + i
          if (res[key]) {
            this.tableData.push({ ...res[key], paramsKey: key, key: '' })
          }
        }

        for (let i = 0; i < 9; i++) {
          const key = 'wlan2' + i
          if (res[key]) {
            this.tableData.push({ ...res[key], paramsKey: key, key: '' })
          }
        }

        for (let i = 0; i < 9; i++) {
          const key = 'wlan3' + i
          if (res[key]) {
            this.tableData.push({ ...res[key], paramsKey: key, key: '' })
          }
        }

        for (let i = 0; i < 9; i++) {
          const key = 'sta' + i
          if (res[key]) {
            this.tableData.push({ ...res[key], paramsKey: key, key: '' })
          }
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
      params['wifi'] = row.name
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
      if (row.network === 'LAN') {
        this.$emit('onEditClick', 'LanTab')
      } else if (row.network === 'WAN') {
        this.$emit('onEditClick', 'WanTab')
      }
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
