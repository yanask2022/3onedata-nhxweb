<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <div class="header-wrapper">
          <span>VAP status</span>
          <!-- <el-button class="reset-btn" size="small" @click="onAdd">
            ADD NEW RADIO
          </el-button> -->
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
import { get_runtime } from '@/api/wifi'
import { secondsToDhms } from '@/utils'
import { actInterfaces } from '@/api/interface'

export default {
  name: 'VAPOverviewTab',
  components: {
    NXHTableExtends
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      intervalIds: [],
      randomKey: Math.random(),
      tableData: [],
      columns: [
        { label: 'wifi-iface', prop: 'name', fixed: 'left' },
        { label: 'ifname', prop: 'ifname' },
        { label: 'Network', prop: 'network' },
        { label: 'vid', prop: 'vid' },
        { label: 'hwmode', prop: 'hwmode' },
        { label: 'ssid', prop: 'ssid' },
        { label: 'Mode', prop: 'mode' },
        { label: 'width', prop: 'width' },
        { label: 'Channel', prop: 'channel' },
        { label: 'Frequency', prop: 'frequency' },
        { label: 'macaddr', prop: 'macaddr' },
        { label: 'bitrate', prop: 'bitrate' },
        { label: 'txpower', prop: 'txpower' },
        { label: 'Signal', prop: 'signal' },
        { label: 'quality', prop: 'quality' },
        { label: 'noise', prop: 'noise' },
        { label: 'RxByte', prop: 'rxbyte' },
        { label: 'TxByte', prop: 'txbyte' }
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
      let loading = ''
      if (this.isActive) {
        loading = this.$loading({
          lock: true,
          text: 'Please wait...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }

      get_runtime({}).then(res => {
        this.tableData = []
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
      }).finally(() => {
        if (this.isActive) {
          loading.close()
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
