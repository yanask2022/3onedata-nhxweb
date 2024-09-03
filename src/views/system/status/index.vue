<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Status" name="status">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Device Info
              </h1>
              <div class="row-content">
                <div style="flex:4;">
                  <span>Hardware Version:</span>
                  <span class="margin-left-10">{{ info.name }}</span>
                </div>
                <div style="flex:6;">
                  <span>Firmware Version:</span>
                  <span class="margin-left-10">{{ info.soft_version }}</span>
                </div>
              </div>

              <h1 class="panel-title">
                System Time
              </h1>
              <div class="row-content">
                <div style="flex:4;">
                  <span>System Time:</span>
                  <span class="margin-left-10">{{ info.time  + ' ' + info.timezone }}</span>
                </div>
                <div style="flex:6;">
                  <span>Running Time:</span>
                  <span class="margin-left-10">{{ info.uptime }}</span>
                </div>
              </div>

              <h1 class="panel-title">
                WAN IPv4
              </h1>
              <div class="row-content">
                <div style="flex:1;">
                  <el-table
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    :data="wanIpv4TableData"
                    border
                  >
                    <el-table-column
                      prop="interface_name"
                      label="Interface Name"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="proto"
                      label="Connect Type"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connection_status"
                      label="Connection Status"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="ip_address"
                      label="IP Address"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="subnet_mask"
                      label="Subnet Mask"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="default_gateway"
                      label="Default Gateway"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="primary_dns"
                      label="Primary DNS"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="sec_dns"
                      label="Second DNS"
                      header-align="center"
                      align="center"
                    />
                  </el-table>
                </div>
              </div>
              <!--<h1 class="panel-title">
                WAN IPV6
              </h1>
              <div class="row-content">
                <div style="flex:1;">
                  <el-table
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    :data="wanIpv6TableData"
                    border
                  >
                    <el-table-column
                      prop="interface_name"
                      label="Interface Name"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connect_type"
                      label="Connect Type"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connection_status"
                      label="Connection Status"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      width="280"
                      prop="ip_address"
                      label="IP Address"
                      header-align="center"
                      align="center"
                    />

                    <el-table-column
                      width="280"
                      prop="default_gateway"
                      label="Default Gateway"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="primary_dns"
                      label="Primary DNS"
                      header-align="center"
                      align="center"
                    />
                  </el-table>
                </div>
              </div>-->

              <h1 class="panel-title">
                Resource Utilization
              </h1>
              <div class="useage-container">
                <div style="flex:3;display: flex">
                  <!--memory usage-->
                  <div class="usage-item">
                    <span style="text-align:center">{{ mem_per }}%</span>
                    <div class="bar-wrapper">
                      <div
                        class="bar"
                      />
                    </div>
                    <span style="text-align:center">Memory</span>
                  </div>
                  <!--CPU usage-->
                  <div class="usage-item">
                    <span style="text-align:center">{{ cpu_per }}%</span>
                    <div class="bar-wrapper">
                      <div class="bar" />
                    </div>
                    <span style="text-align:center">CPU</span>
                  </div>

                </div>
                <!--<div style="flex:7">
                  <two-line-chart height="15.88541vw" />
                </div>-->
                <div />
              </div>

            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TwoLineChart from '../components/TwoLineChart'
import { get_info } from '@/api/system'
import { get_runtimes } from '@/api/wan'
import { secondsToDhms } from '@/utils/index'

export default {
  name: 'SystemStatusIndex',
  components: {
    TwoLineChart
  },
  data() {
    return {
      intervalIds: [],
      activeName: 'status',
      info: {
        time: 0,
        uptime: 0,
        timezone: ''
      },
      cpu_per: 0,
      mem_per: 0,
      wanIpv4TableData: [
        {
          interface_name: 'WAN1',
          proto: 'dhcp',
          connection_status: 'Link Up',
          ip_address: '192.168.10.254',
          subnet_mask: '255.255.255.0',
          mac_address: '00-0A-EB-61-20-12',
          default_gateway: '192.168.10.100',
          primary_dns: '212.109.32.5',
          sec_dns: '212.109.32.5'
        }
      ],
      wanIpv6TableData: [
        {
          interface_name: 'WAN1',
          connect_type: 'Dynamic IP',
          connection_status: 'Link Up',
          ip_address: '::',
          subnet_mask: '255.255.255.0',
          mac_address: '00-0A-EB-61-20-12',
          default_gateway: '::',
          primary_dns: '::'
        },
        {
          interface_name: 'WAN2',
          connect_type: 'PPPoE',
          connection_status: 'Link Up',
          ip_address: '2001:c456:4444:0:423f:3c5d:8f35:4fec/6',
          subnet_mask: '255.255.255.0',
          mac_address: '00-0A-EB-61-20-12',
          default_gateway: 'fe80::3184:7289:4fdc:bae4',
          primary_dns: '2000::c55'
        }
      ]
    }
  },
  mounted() {
    get_info({}).then(res => {
      this.info = res
      this.info.uptime = secondsToDhms(res.uptime)
      this.cpu_per = parseInt(this.info.cpu_percent)
      this.mem_per = parseInt(this.info.mem_percent)
    })
    get_runtimes({}).then(res => {
      this.wanIpv4TableData = res
    })
    this.intervalIds.push(setInterval(() => {
      get_info({}).then(res => {
        this.info = res
        this.info.uptime = secondsToDhms(res.uptime)
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
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.row-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 10px
}

.chart-wrapper {
  background: #fff;
  height: 305px;
  width: 400px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
}

.table-wrapper {
  background: #fff;
  height: 305px;
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e5e5;
}

.title-bar {
  padding-left: 10px;
  width: 100%;
  background: #eee;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 40px;
  color: #212121;
  font-weight: bold;
  justify-content: space-between;
}

.tab-btn {
  padding: 0 6px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 30px;
  background: #ffffff;
  color: #7d7e80;
  font-size: 14px;
  cursor: pointer
}

.tab-btn-selected {
  border-color: #4acbd6;
  background: #4acbd6;
  color: #ffffff;
}

::v-deep .el-progress__text {
  font-size: 12px !important;
}

.useage-container {
  display: flex;
  align-items: center;
  justify-content:space-between;
  width: 100%;
  padding: 20px 10px;

  .usage-item {
    width: 75px;
    display: flex;
    flex-direction: column;
    .bar-wrapper{
      position: relative;
      background: #E5E5E6;
      margin: 12px auto;
      height: 100px;
      width: 22px;

      .bar {
        position: absolute;left: 0;bottom: 0;background: rgb(0, 85, 100);;width: 100%;height: 21.8px
      }
    }

  }
}
</style>
