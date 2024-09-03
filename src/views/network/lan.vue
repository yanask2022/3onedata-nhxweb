<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Lan" name="lan">
        <div class="content-container">
          <el-row :gutter="40">
            <el-col :span="24">
              <h1 class="panel-title">
                Lan
              </h1>
              <el-row>
                <el-col :span="15">
                  <div class="three-grid-container">

                    <!--Primary DNS::-->
                    <div class="grid-cell"><span>IP Address:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="ipv4addr" size="mini" />
                    </div>
                    <div class="grid-cell" />

                    <!--Secondary DNS:::-->
                    <div class="grid-cell"><span>Subnet Mask:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="ipv4mask" size="mini" />
                    </div>
                    <div class="grid-cell" />

                    <!--Vlan-->
                    <!--<div class="grid-cell"><span>Management Vlan:</span></div>
                    <div class="grid-cell">
                      <el-select v-model="vlanType" size="mini" placeholder="" style="width: 100%">
                        <el-option
                          v-for="item in vlanTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div class="grid-cell" />-->

                    <!--GetIP-->
                    <!--<div class="grid-cell"><span /></div>
                    <div class="grid-cell">
                      <el-checkbox v-model="checkedUsingDHCP">Get IP using Unicast DHCP</el-checkbox>
                    </div>
                    <div class="grid-cell" />-->
                  </div>
                </el-col>
              </el-row>
              <!--   底部按钮-->
              <el-col :span="24">
                <el-button size="mini" @click="set_lan">Save</el-button>
                <!--<el-button size="mini">Connect</el-button>-->
                <!--<el-button size="mini">Disconnect</el-button>-->
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DHCP Server" name="dhcp">
        <div class="content-container">
          <el-row :gutter="40">
            <el-col :span="24">
              <div class="title">
                <h1 class="panel-title">
                  DHCP Settings
                </h1>
              </div>

              <el-row>
                <el-col :span="15">
                  <div class="three-grid-container">

                    <div class="grid-cell"><span>Starting IP Address::</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.startip" size="mini" />
                    </div>
                    <div class="grid-cell" />

                    <div class="grid-cell"><span>Ending IP Address:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.endip" size="mini" />
                    </div>
                    <div class="grid-cell" />

                    <div class="grid-cell"><span>Lease Time:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.leasetime" size="mini" />
                    </div>
                    <div class="grid-cell">minutes (1-2880. The default value is 120)</div>

                    <!--<div class="grid-cell"><span>Default Gateway:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.efaultGateway" size="mini" />
                    </div>
                    <div class="grid-cell">(Optional)</div>

                    <div class="grid-cell"><span>Primary DNS:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.primaryDNS" size="mini" />
                    </div>
                    <div class="grid-cell">(Optional)</div>

                    <div class="grid-cell"><span>Secondary DNS:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.secondaryDNS" size="mini" />
                    </div>
                    <div class="grid-cell">(Optional)</div>

                    <div class="grid-cell"><span>Option60:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.option60" size="mini" />
                    </div>
                    <div class="grid-cell">(Optional)</div>

                    <div class="grid-cell"><span>Option138:</span></div>
                    <div class="grid-cell">
                      <el-input v-model="dhcpServerConfig.option138" size="mini" />
                    </div>
                    <div class="grid-cell">(Optional)</div>-->

                    <div class="grid-cell"><span>Status:</span></div>
                    <div class="grid-cell">
                      <el-checkbox v-model="dhcpServerConfig.enable">Enable</el-checkbox>
                    </div>
                    <div class="grid-cell">(Optional)</div>

                  </div>

                </el-col>
              </el-row>

              <!--   底部按钮-->
              <el-col :span="24">
                <el-button size="mini" @click="set_dhcps">Save</el-button>
                <!--<el-button size="mini">Connect</el-button>-->
                <!--<el-button size="mini">Disconnect</el-button>-->
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DHCP Client List" name="dhcpClientList">
        <div class="content-container">
          <el-row :gutter="40">
            <el-col :span="24">
              <div class="title">
                <h1 class="panel-title">
                  Statistics List
                </h1>
              </div>

              <div class="dhcp-client-list-table-container">
                <div class="dhcp-client-list-table-header">
                  <span>Total Clients:1</span>

                  <div class="opt-wrapper">
                    <div class="opt-item" @click="get_dhcps_leases">
                      <i class="el-icon-refresh icon-holder" />
                      <span class="icon-text">Refresh</span>
                    </div>
                  </div>
                </div>
                <div class="dhcp-client-list-table">
                  <el-table
                    :data="dhcpClientList.tableData"
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    border
                  >
                    <!--<el-table-column
                      prop="id"
                      header-align="center"
                      align="center"
                      width="50"
                      label="ID"
                    />-->
                    <el-table-column
                      prop="hostname"
                      header-align="center"
                      align="center"
                      label="Client Name"
                    />
                    <el-table-column
                      prop="macaddr"
                      header-align="center"
                      align="center"
                      label="MAC Address"
                    />
                    <el-table-column
                      prop="ipaddr"
                      header-align="center"
                      align="center"
                      label="Assigned IP Address"
                    />
                    <el-table-column
                      prop="expires"
                      header-align="center"
                      align="center"
                      label="Lease Time"
                    />
                    <!--<el-table-column
                      header-align="center"
                      align="center"
                      label="Operation"
                    >-->
                    <template>
                      <span class="font-size-16 primary-color"><svg-icon icon-class="save" /></span>
                    </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get, set } from '@/api/lan'
import { dhcps_get, dhcps_set, dhcps_get_leases } from '@/api/dhcps'
import { secondsToDhms } from '@/utils/index'

export default {
  name: 'WAN',
  data() {
    return {
      activeName: 'lan',
      vlanType: 20,
      vlanTypeOptions: [
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      ipv4addr: '',
      ipv4mask: '',
      dhcpServerConfig: {
        startip: '',
        endip: '',
        leasetime: '',
        enabled: '1',
        defaultDomain: '',
        primaryDNS: '',
        secondaryDNS: '',
        option60: '',
        option138: '',
        enable: false
      },
      dhcpClientList: {
        tableData: [
        ]
      }
    }
  },
  mounted() {
    get({}).then(res => {
      this.ipv4addr = res.ipv4addr
      this.ipv4mask = res.ipv4mask
    })
    dhcps_get({}).then(res => {
      this.dhcpServerConfig = res
      if (res.enabled === '1') {
        this.dhcpServerConfig.enable = true
      } else {
        this.dhcpServerConfig.enable = false
      }
    })
    this.get_dhcps_leases()
  },
  methods: {
    get_dhcps_leases() {
      dhcps_get_leases({}).then(res => {
        this.dhcpClientList.tableData = res
        for(var i = 0; i < this.dhcpClientList.tableData.length; i++) {
          this.dhcpClientList.tableData[i].expires = secondsToDhms(this.dhcpClientList.tableData[i].expires)
        }
      })
    },
    set_lan() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      set({
        ipv4addr: this.ipv4addr,
        ipv4mask: this.ipv4mask
      }).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    set_dhcps() {
      if (this.dhcpServerConfig.enable) {
        this.dhcpServerConfig.enabled = '1'
      } else {
        this.dhcpServerConfig.enabled = '0'
      }

      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      dhcps_set(this.dhcpServerConfig).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.dhcp-client-list-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 10px;

  .dhcp-client-list-table-header {
    width: 100%;
    display: flex;
    padding: 20px 0;
    font-size: 12px;
    align-items: center;
    justify-content: space-between;
  }
}

.two-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 12px;

  .two-grid-cell {
    width: 100%;
    height: 30px;
    padding: 10px 5px;
    display: flex;
    align-items: center;
  }
}

.three-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 12px;

  .grid-cell {
    width: 100%;
    height: 40px;
    padding: 10px 5px;
    display: flex;
    align-items: center;
  }
}

.my-el-radio {
  margin-right: 100px;
}

.my-el-radio:first-child {
  margin-left: 40px;
}

.second-wrapper {

}

.title {
  h3 {
    color: $primary-color;
    font-size: 12px;
    padding: 8px 0 8px 15px;
    background: #F0F0F0;
    font-weight: normal;
  }

  margin-bottom: 8px;
}

.first-wrapper {
  display: flex;
  flex-direction: column;

  .operator {
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .op-line {
      height: 52px;
      width: 100%;
      display: flex;

      &-left {
        height: 100%;
        width: 130px;
        display: flex;
        align-items: center;
      }

      &-right {
        display: flex;
        align-items: center;
        flex: 1;
        height: 100%;
      }
    }
  }

  .note {
    display: flex;
    font-size: 12px;
    flex-direction: column;
  }
}

.network-interface {
  height: 100%;
  width: 640px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  //justify-content: space-around;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 100px;

    &-title {
      font-size: 12px;
      margin-bottom: 5px;
    }

    &-icon {
      height: 15px;
      width: 15px;
    }
  }
}
</style>
