<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="WAN" name="first">
        <div class="content-container">
          <el-row :gutter="40">
            <el-col :span="9">
              <div class="title">
                <h3>Connection Configuration</h3>
              </div>
              <div class="three-grid-container">
                <!--Connection Type-->
                <div class="grid-cell"><span>Connection Type:</span></div>
                <div class="grid-cell">
                  <el-select v-model="ConnectionType" @change="onTypeChange" size="mini" placeholder="" style="width: 100%">
                    <el-option
                      v-for="item in ConnectionTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="grid-cell" />
                <!--Connection Type-->

                <!--Host Name-->
                <!--<div v-if="ConnectionType == 3" class="grid-cell"><span>Host Name:</span></div>
                <div v-if="ConnectionType == 3" class="grid-cell">
                  <el-input v-model="hostname" size="mini"/>
                </div>
                <div v-if="ConnectionType == 3" class="grid-cell">(optional)</div>-->

                <!--Upstream Bandwidth:-->
                <!--<div class="grid-cell"><span>Upstream Bandwidth:</span></div>
                <div class="grid-cell">
                  <el-input v-model="upBandWidth" size="mini"/>
                </div>
                <div class="grid-cell"/>-->

                <!--Downstream Bandwidth:-->
                <!--<div class="grid-cell"><span>Downstream Bandwidth:</span></div>
                <div class="grid-cell">
                  <el-input v-model="downLoadBandWidth" size="mini"/>
                </div>
                <div class="grid-cell"/>-->

                <div v-if="ConnectionType == 1" class="grid-cell"><span>IPv4 addr:</span></div>
                <div v-if="ConnectionType == 1" class="grid-cell">
                  <el-input v-model="ipv4addr" size="mini" />
                </div>
                <div v-if="ConnectionType == 1" class="grid-cell" />

                <div v-if="ConnectionType == 1" class="grid-cell"><span>NetMask:</span></div>
                <div v-if="ConnectionType == 1" class="grid-cell">
                  <el-input v-model="ipv4mask" size="mini" />
                </div>
                <div v-if="ConnectionType == 1" class="grid-cell" />

                <div v-if="ConnectionType == 1" class="grid-cell"><span>Gateway:</span></div>
                <div v-if="ConnectionType == 1" class="grid-cell">
                  <el-input v-model="ipv4gateway" size="mini" />
                </div>
                <div v-if="ConnectionType == 1" class="grid-cell" />

                <div v-if="ConnectionType == 3" class="grid-cell"><span>Username:</span></div>
                <div v-if="ConnectionType == 3" class="grid-cell">
                  <el-input v-model="username" size="mini" />
                </div>
                <div v-if="ConnectionType == 3" class="grid-cell" />

                <div v-if="ConnectionType == 3" class="grid-cell"><span>Password:</span></div>
                <div v-if="ConnectionType == 3" class="grid-cell">
                  <el-input v-model="password" size="mini" />
                </div>
                <div v-if="ConnectionType == 3" class="grid-cell" />

                <!--MTU:-->
                <div class="grid-cell"><span>MTU:</span></div>
                <div class="grid-cell">
                  <el-input v-model="mtu" size="mini" />
                </div>
                <div class="grid-cell flex-start">(576-1500)</div>

                <!--Primary DNS::-->
                <div class="grid-cell"><span>Primary DNS:</span></div>
                <div class="grid-cell">
                  <el-input v-model="primaryDNS" size="mini" />
                </div>
                <div class="grid-cell flex-start">(Optional)</div>

                <!--Secondary DNS:::-->
                <div class="grid-cell"><span>Secondary DNS:</span></div>
                <div class="grid-cell">
                  <el-input v-model="secondaryDNS" size="mini" />
                </div>
                <div class="grid-cell flex-start">(Optional)</div>

                <!--Vlan-->
                <!--<div class="grid-cell"><span>Vlan:</span></div>
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
                <div class="grid-cell"/>-->

                <!--GetIP-->
                <!--<div class="grid-cell"><span/></div>
                <div class="grid-cell">
                  <el-checkbox v-model="checkedUsingDHCP">Get IP using Unicast DHCP</el-checkbox>
                </div>
                <div class="grid-cell"/>-->
              </div>

              <!--   底部按钮-->
              <el-col :span="24" style="margin-top: 40px">
                <el-button size="mini" @click="onSaveClick">Save</el-button>
                <el-button size="mini" @click="onConnect">Connect</el-button>
                <el-button size="mini" @click="onDisConnect">Disconnect</el-button>
              </el-col>
            </el-col>
            <el-col :span="7">
              <div class="title">
                <h3>Connection Status</h3>
                <div class="two-grid-container">
                  <div class="two-grid-cell">Connection Status</div>

                  <div v-if="runtime.up == true" class="two-grid-cell"> Connected </div>
                  <div v-if="runtime.up == false" class="two-grid-cell"> Disconnected </div>

                  <div class="two-grid-cell">IP Address</div>
                  <div class="two-grid-cell">{{ runtime.ipv4addr }}</div>

                  <div class="two-grid-cell">Subnet Mask</div>
                  <div class="two-grid-cell">{{ runtime.ipv4mask }}</div>

                  <div class="two-grid-cell">Default Gateway</div>
                  <div class="two-grid-cell">{{ runtime.ipv4gateway }}</div>

                  <div class="two-grid-cell">Primary DNS</div>
                  <div class="two-grid-cell">{{ runtime.ipv4dns1 }}</div>

                  <div class="two-grid-cell">Secondary DNS</div>
                  <div class="two-grid-cell">{{ runtime.ipv4dns2 }}</div>
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
import { get, set, connect, disconnect, get_runtime } from '@/api/wan'

export default {
  name: 'WAN',
  data() {
    return {
      config: {},
      intervalIds: [],
      activeName: 'first',
      radio: 2,
      ConnectionType: 1,
      ConnectionTypeOptions: [
        { label: 'Static IP', value: 1 },
        { label: 'Dynamic IP', value: 2 },
        { label: 'PPPoE', value: 3 }
      ],
      vlanType: 20,
      vlanTypeOptions: [
        { label: '10', value: 10 },
        { label: '20', value: 20 }
      ],
      hostname: '',
      upBandWidth: '',
      downLoadBandWidth: '',
      mtu: '',
      primaryDNS: '',
      secondaryDNS: '',
      username: '',
      passowrd: '',
      ipv4addr: '',
      ipv4mask: '',
      ipv4gateway: '',
      checkedUsingDHCP: false,
      runtime: {
        up: false,
        ipv4addr: '',
        ipv4mask: '',
        ipv4gateway: '',
        ipv4dns1: '',
        ipv4dns2: ''
      }
    }
  },
  mounted() {
    get({}).then(res => {
      this.config = res.config
      if (res.proto == 'static') {
        this.ConnectionType = 1
        this.mtu = res.config.static.mtu
        this.ipv4addr = res.config.static.ipv4addr
        this.ipv4mask = res.config.static.ipv4mask
        this.ipv4gateway = res.config.static.ipv4gateway
        this.primaryDNS = res.config.static.ipv4dns1
        this.secondaryDNS = res.config.static.ipv4dns2
      } else if (res.proto == 'dhcp') {
        this.ConnectionType = 2
        this.mtu = res.config.dhcp.mtu
        this.primaryDNS = res.config.dhcp.ipv4dns1
        this.secondaryDNS = res.config.dhcp.ipv4dns2
      } else {
        this.ConnectionType = 3
        this.mtu = res.config.pppoe.mtu
        this.username = res.config.pppoe.username
        this.password = res.config.pppoe.password
        this.primaryDNS = res.config.pppoe.ipv4dns1
        this.secondaryDNS = res.config.pppoe.ipv4dns2
      }
    })
    get_runtime({}).then(res => {
      this.runtime = res.status
    })
    this.intervalIds.push(setInterval(() => {
      get_runtime({}).then(res => {
        this.runtime = res.status
      })
    }, 5000))
  },
  beforeDestroy() {
    this.intervalIds.forEach(id => {
      clearInterval(id)
    })
  },
  methods: {
    get_runtime_wrapper() {
      // 间隔一秒执行一次 get_runtime
      this.intervalIds.push(setInterval(() => {
        get_runtime({}).then(res => {
          this.runtime = res.status
        })
      }, 5000))
    },
    onTypeChange() {
      if (this.ConnectionType === 1) {
        this.mtu = res.config.static.mtu
        this.ipv4addr = res.config.static.ipv4addr
        this.ipv4mask = res.config.static.ipv4mask
        this.ipv4gateway = res.config.static.ipv4gateway
        this.primaryDNS = res.config.static.ipv4dns1
        this.secondaryDNS = res.config.static.ipv4dns2 
      } else if (this.ConnectionType === 2) {
        this.mtu = res.config.dhcp.mtu
        this.primaryDNS = res.config.dhcp.ipv4dns1
        this.secondaryDNS = res.config.dhcp.ipv4dns2        
      } else {
        this.mtu = res.config.pppoe.mtu
        this.username = res.config.pppoe.username
        this.password = res.config.pppoe.password
        this.primaryDNS = res.config.pppoe.ipv4dns1
        this.secondaryDNS = res.config.pppoe.ipv4dns2
      }
    },
    onSaveClick() {
      const params = {}
      const params_val = {}

      if (this.ConnectionType === 1) {
        params.proto = 'static'
        params_val.mtu = this.mtu
        params_val.ipv4addr = this.ipv4addr
        params_val.ipv4mask = this.ipv4mask
        params_val.ipv4gateway = this.ipv4gateway
        params_val.ipv4dns1 = this.primaryDNS
        params_val.ipv4dns2 = this.secondaryDNS
        params.static = params_val
      } else if (this.ConnectionType === 2) {
        params.proto = 'dhcp'
        params_val.mtu = this.mtu
        if (this.primaryDNS && this.primaryDNS !== '') {
          params_val.peerdns = '1'
          params_val.ipv4dns1 = this.primaryDNS
          params_val.ipv4dns2 = this.secondaryDNS
        } else {
          params_val.peerdns = '0'
        }
        params.dhcp = params_val
      } else if (this.ConnectionType === 3) {
        params.proto = 'dhcp'
        params_val.mtu = this.mtu
        params_val.username = this.username
        params_val.password = this.password
        if (this.primaryDNS && this.primaryDNS !== '') {
          params_val.peerdns = '1'
          params_val.ipv4dns1 = this.primaryDNS
          params_val.ipv4dns2 = this.secondaryDNS
        } else {
          params_val.peerdns = '0'
        }
        params.pppoe = params_val
      }

      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      set(params).then(res => {
        this.$message.success('success')
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    onConnect() {
      const params = {}
      connect({}).then(res => {
        this.$message.success('success')
      })
    },
    onDisConnect() {
      const params = {}
      connect(params).then(res => {
        this.$message.success('success')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";

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
    //justify-content: flex-end;
  }
  .flex-start {
    justify-content: flex-start;
  }
}

.my-el-radio {
  margin-right: 100px;
}

.my-el-radio:first-child {
  margin-left: 40px;
}

.title {
  margin-bottom: 8px;
}

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
