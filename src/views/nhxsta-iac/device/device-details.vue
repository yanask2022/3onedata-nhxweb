<template>
  <div class="root">
    <span class="title">Device Status</span>
    <el-card>
      <div slot="header">
        <span>Device info</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Group</div>
          <div class="field-value">{{ details.group }}</div>
        </div>
        <div class="field-row">
          <div class="field-key">ID</div>
          <div class="field-value">{{ details.id }}</div>
        </div>
        <div class="field-row">
          <div class="field-key">IP</div>
          <div class="field-value">{{ details.ip }}</div>
        </div>
        <div class="field-row">
          <div class="field-key">Version</div>
          <div class="field-value">{{ details.version }}</div>
        </div>
      </div>
    </el-card>

    <br>
    <el-card>
      <div slot="header">
        <span>Resource Utilization</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Memory</div>
          <div class="field-value">
            <n-x-h-progress-bar :progress="mem_per" />
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">CPU</div>
          <div class="field-value">
            <n-x-h-progress-bar :progress="cpu_per" />
          </div>
        </div>
      </div>
    </el-card>
    <br>
    <el-card>
      <div slot="header">
        <span>Interface status</span>
      </div>
      <div>
        <NXH-Table :table-data="statusTableData" :columns="statusColumns" />
      </div>
    </el-card>
    <br>
    <br>
    <el-card>
      <div slot="header">
        <span>Radio status</span>
      </div>
      <div>
        <NXH-Table :table-data="radioTableData" :columns="radioColumns" />
      </div>
    </el-card>
    <br>

  </div>
</template>

<script>
import NXHProgressBar from '@/components/NXHProgressBar'
import NXHTable from '@/components/NXHTable'

export default {
  name: 'DeviceDetails',
  components: {
    NXHTable,
    NXHProgressBar
  },
  data() {
    return {
      statusTableData: [],
      radioTableData: [],
      statusColumns: [
        { label: 'Network name', prop: 'interface_name' },
        { label: 'ifname', prop: 'interface_name' },
        { label: 'Uptime', prop: 'interface_name' },
        { label: 'Mac', prop: 'interface_name' },
        { label: 'Rx', prop: 'interface_name' },
        { label: 'Tx', prop: 'interface_name' },
        { label: 'ipv4 address', prop: 'interface_name' }
      ],
      radioColumns: [
        { label: 'wifi-iface', prop: 'name', fixed: 'left' },
        { label: 'ifname', prop: 'ifname' },
        { label: 'Network', prop: 'network' },
        { label: 'hwmode', prop: 'hwmode' },
        { label: 'ssid', prop: 'ssid' },
        { label: 'Mode', prop: 'mode' },
        { label: 'Frequency', prop: 'frequency' },
        { label: 'macaddr', prop: 'macaddr' },
        { label: 'Bit Rate', prop: 'bitrate' },
        { label: 'Tx-Power', prop: 'txpower' },
        { label: 'Link Quality', prop: 'quality' },
        { label: 'Noise level', prop: 'noise' }
      ],
      mem_per: 50,
      cpu_per: 50,
      details: {
        group: ''
      }
    }
  },
  mounted() {
    let aplist = {}
    const id = this.$route.params.id
    aplist = this.$route.params.data
    for (let i = 0; i < aplist.length; i++) {
      if (aplist[i].id === id) {
        this.details.id = aplist[i].id
        this.details.group = aplist[i].group
        this.details.version = aplist[i].version
        this.details.ip = aplist[i].ip
        this.mem_per = aplist[i].info.mem_per
        this.cpu_per = aplist[i].info.cpu_per
        this.radioTableData = aplist[i].info.wifi
        break
      }
    }
  }
}
</script>

<style scoped>

</style>
