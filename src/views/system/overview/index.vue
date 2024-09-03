<template>
  <div class="root">
    <span class="title">System Status</span>
    <el-card>
      <div slot="header">
        <span>Device Info</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Hardware Version</div>
          <div class="field-value">{{ systemInfo.name }}</div>
        </div>
        <div class="field-row">
          <div class="field-key">Firmware Version</div>
          <div class="field-value">{{ systemInfo.soft_version }}</div>
        </div>
      </div>
    </el-card>
    <br>
    <el-card>
      <div slot="header">
        <span>System Time</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">System Time</div>
          <div class="field-value">{{ systemInfo.time + ' ' + systemInfo.timezone }}</div>
        </div>
        <div class="field-row">
          <div class="field-key">Running Time</div>
          <div class="field-value">{{ systemInfo.uptime }}</div>
        </div>
      </div>
    </el-card>
    <br>
    <el-card>
      <div slot="header">
        <span>WAN IPv4</span>
      </div>
      <div>
        <NXH-Table :table-data="wanIpv4TableData" :columns="wanIpv4Columns" />
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
  </div>
</template>
<script>
import NXHTable from '@/components/NXHTable'
import NXHProgressBar from '@/components/NXHProgressBar'
import { get } from '@/api/ac'
import { get_info } from '@/api/system'
import { secondsToDhms } from '@/utils'
import { get_runtimes } from '@/api/wan'

export default {
  name: 'OverviewIndex',
  components: {
    NXHTable,
    NXHProgressBar
  },
  data() {
    return {
      intervalIds: [],
      // IAC status info
      info: {
        status: '',
        version: ''
      },
      systemInfo: {
        time: 0,
        uptime: 0,
        timezone: ''
      },
      cpu_per: 0,
      mem_per: 0,
      wanIpv4Columns: [
        { label: 'Interface Name', prop: 'interface_name' },
        { label: 'Connect Type', prop: 'proto' },
        { label: 'Connect Status', prop: 'connection_status' },
        { label: 'IP Address', prop: 'ip_address' },
        { label: 'Subnet Mask', prop: 'subnet_mask' },
        { label: 'Default Gateway', prop: 'default_gateway' },
        { label: 'Primary DNS', prop: 'primary_dns' },
        { label: 'Second DNS', prop: 'sec_dns' }
      ],
      wanIpv4TableData: []
    }
  },
  mounted() {
    get({}).then(res => {
      this.info = res
    })

    get_info({}).then(res => {
      this.systemInfo = res
      this.systemInfo.uptime = secondsToDhms(res.uptime)
      this.cpu_per = parseInt(this.systemInfo.cpu_percent)
      this.mem_per = parseInt(this.systemInfo.mem_percent)
    })

    get_runtimes({}).then(res => {
      this.wanIpv4TableData = res
    })

    this.intervalIds.push(setInterval(() => {
      get_info({}).then(res => {
        this.systemInfo = res
        this.systemInfo.uptime = secondsToDhms(res.uptime)
        this.cpu_per = parseInt(res.cpu_percent)
        this.mem_per = parseInt(res.mem_percent)
      })
      get_runtimes({}).then(res => {
        this.wanIpv4TableData = res
      })
    }, 5000))
  },
  beforeDestroy() {
    this.intervalIds.forEach(id => {
      clearInterval(id)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
