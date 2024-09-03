<template>
  <div class="root">
    <span class="title">Create Interface</span>
    <el-card>

      <div class="card-panel-editable-content-wrapper">
        <el-form ref="postForm" :model="form" :rules="rules" class="form-container">

          <!-- SSID -->
          <div class="field-row" :class="{'highlight' : hash === 'name'}">
            <div class="field-key">
              <span class="field-key-text">Name of the new interface</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.name" sizi="small" style="width: 350px" />
                </div>
                <span class="field-value-column-input-tips"> Maximum length of the name is 15 characters including the automatic protocol/bridge prefix (br-, 6in4-,pppoe-etc.)</span>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="field-row" :class="{'highlight' : hash === 'region'}">
            <div class="field-key">
              <span class="field-key-text">Protocol of the new interface</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="form.region"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(item, index) in protocolList" :label="item.label" :value="item.value" :key="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div v-if="showLastSecondFormItem" class="field-row" :class="{'highlight' : hash === 'interfaceChecked'}">
            <div class="field-key">
              <span class="field-key-text">Create a bridge over multiple interfaces</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="form.interfaceChecked"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-if="showLastSecondFormItem" class="field-row" :class="{'highlight' : hash === 'interfaceChecked'}">
            <div class="field-key">
              <span class="field-key-text">Cover the following interface</span>
            </div>
            <div class="field-value">
              <div class="field-value-column" />
            </div>
          </div>
          <div v-show="showLastSecondFormItem" style="width: 100%;">
            <NXH-Table v-show="form.interfaceChecked" :selection="true" :table-data="tableData" :columns="columns" @selection-change="onSelectChange" />
            <NXHSingleTable v-show="!form.interfaceChecked" :radio="true" :table-data="tableData" :columns="columns" @on-radio="onRadio" />
          </div>
        </el-form>
      </div>
    </el-card>
    <div style="width: 100%; margin-top: 22px; display: flex; justify-content: space-between;">
      <el-button type="success" size="small" @click="back">BACK TO OVERVIEW</el-button>
      <el-button type="success" size="small" @click="createInterface">SUBMIT</el-button>
    </div>
  </div>
</template>
<script>
import NXHTable from '@/components/NXHTable'
import NXHSingleTable from '@/components/NXHSingleTable'
import { addInterfaces, getAllInterfaces } from '@/api/interface'

export default {
  components: {
    NXHTable,
    NXHSingleTable
  },
  data() {
    // interfacer名字验证
    const validName = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9]+$/
      if (value === '') {
        callback(new Error('The selected protocol needs a device assigned'))
      } else if (!reg.test(value)) {
        callback(new Error('The user name must be a string of 6 to 18 uppercase and lowercase digits'))
      } else {
        callback()
      }
    }

    return {
      hash: '',
      columns: [
        { label: 'Network', prop: 'ifname' },
        { label: 'ifname', prop: 'interface' },
        { label: 'Device', prop: 'network' }
      ],
      tableData: [],
      form: {
        name: '',
        region: 'static',
        interfaceChecked: false,
        interfaces: []
      },
      rules: {
        name: [{
          required: true,
          message: 'No network name specified',
          trigger: 'blur'
        },
        {
          required: true,
          validator: validName,
          trigger: 'blur'
        }
        ],
        region: [{
          required: true,
          message: 'must bu required',
          trigger: 'change'
        }]
      },
      protocolList: [
        {
          label: 'Static address',
          value: 'static',
          children: [
            {
              label: 'Ethernet Adapter: "bond0"',
              key: '1'
            },
            {
              label: 'Ethernet Adapter: "eth0" (lan, test)',
              key: '2'
            },
            {
              label: 'Ethernet Adapter: "eth1" (aedd, lan)',
              key: '3'
            },
            {
              label: 'Ethernet Adapter: "eth2" (lan)',
              key: '4'
            },
            {
              label: 'Ethernet Adapter: "eth3" (lan)',
              key: '5'
            },
            {
              label: 'Ethernet Adapter: "eth4" (wan, wan6)',
              key: '6'
            },
            {
              label: 'Ethernet Adapter: "gretap0"',
              key: '7'
            },
            {
              label: 'Ethernet Adapter: "ip6gre0"',
              key: '8'
            },
            {
              label: 'Ethernet Adapter: "ip6tnl0"',
              key: '9'
            },
            {
              label: 'Ethernet Adapter: "ipsecdummy"',
              key: '10'
            },
            {
              label: 'Ethernet Adapter: "miireg"',
              key: '11'
            },
            {
              label: 'Ethernet Adapter: "mmo" (okoo)',
              key: '12'
            },
            {
              label: 'Ethernet Adapter: "soc0"',
              key: '13'
            },
            {
              label: 'Ethernet Adapter: "teql0"',
              key: '14'
            },
            {
              label: 'Ethernet Adapter: "teste3333" (teset1111)',
              key: '15'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '16'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '17'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '18'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '19'
            },
            {
              label: 'Wireless Network: Master "nhx-son-backhaul" (lan)',
              key: '20'
            },
            {
              label: 'Wireless Network: Client "OpenWrt-Sta" (lan)',
              key: '21'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '22'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '23'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '24'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '25'
            },
            {
              label: 'Wireless Network: Master "nhx-son-backhaul" (lan)',
              key: '26'
            },
            {
              label: 'Wireless Network: Client "OpenWrt-Sta" (lan)',
              key: '27'
            },
            {
              label: 'Custom Interface:',
              key: '28'
            }
          ]
        },
        {
          label: 'DHCP client',
          value: 'dhcp',
          children: [
            {
              label: 'Ethernet Adapter: "bond0"',
              key: '1'
            },
            {
              label: 'Ethernet Adapter: "eth0" (lan, test)',
              key: '2'
            },
            {
              label: 'Ethernet Adapter: "eth1" (aedd, lan)',
              key: '3'
            },
            {
              label: 'Ethernet Adapter: "eth2" (lan)',
              key: '4'
            },
            {
              label: 'Ethernet Adapter: "eth3" (lan)',
              key: '5'
            },
            {
              label: 'Ethernet Adapter: "eth4" (wan, wan6)',
              key: '6'
            },
            {
              label: 'Ethernet Adapter: "gretap0"',
              key: '7'
            },
            {
              label: 'Ethernet Adapter: "ip6gre0"',
              key: '8'
            },
            {
              label: 'Ethernet Adapter: "ip6tnl0"',
              key: '9'
            },
            {
              label: 'Ethernet Adapter: "ipsecdummy"',
              key: '10'
            },
            {
              label: 'Ethernet Adapter: "miireg"',
              key: '11'
            },
            {
              label: 'Ethernet Adapter: "mmo" (okoo)',
              key: '12'
            },
            {
              label: 'Ethernet Adapter: "soc0"',
              key: '13'
            },
            {
              label: 'Ethernet Adapter: "teql0"',
              key: '14'
            },
            {
              label: 'Ethernet Adapter: "teste3333" (teset1111)',
              key: '15'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '16'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '17'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '18'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '19'
            },
            {
              label: 'Wireless Network: Master "nhx-son-backhaul" (lan)',
              key: '20'
            },
            {
              label: 'Wireless Network: Client "OpenWrt-Sta" (lan)',
              key: '21'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '22'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '23'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '24'
            },
            {
              label: 'Wireless Network: Master "OpenWrt" (lan)',
              key: '25'
            },
            {
              label: 'Wireless Network: Master "nhx-son-backhaul" (lan)',
              key: '26'
            },
            {
              label: 'Wireless Network: Client "OpenWrt-Sta" (lan)',
              key: '27'
            },
            {
              label: 'Custom Interface:',
              key: '28'
            }
          ]
        },
        {
          label: 'PPPoE',
          value: 'pppoe',
          children: [{
            label: 'Ethernet Adapter: "bond0"',
            key: '1'
          },
          {
            label: 'Ethernet Adapter: "eth0" (lan, test)',
            key: '2'
          },
          {
            label: 'Ethernet Adapter: "eth1" (aedd, lan)',
            key: '3'
          },
          {
            label: 'Ethernet Adapter: "eth2" (lan)',
            key: '4'
          },
          {
            label: 'Ethernet Adapter: "eth3" (lan)',
            key: '5'
          },
          {
            label: 'Ethernet Adapter: "eth4" (wan, wan6)',
            key: '6'
          },
          {
            label: 'Ethernet Adapter: "gretap0"',
            key: '7'
          },
          {
            label: 'Ethernet Adapter: "ip6gre0"',
            key: '8'
          },
          {
            label: 'Ethernet Adapter: "ip6tnl0"',
            key: '9'
          },
          {
            label: 'Ethernet Adapter: "ipsecdummy"',
            key: '10'
          },
          {
            label: 'Ethernet Adapter: "miireg"',
            key: '11'
          },
          {
            label: 'Ethernet Adapter: "mmo" (okoo)',
            key: '12'
          },
          {
            label: 'Ethernet Adapter: "soc0"',
            key: '13'
          },
          {
            label: 'Ethernet Adapter: "teql0"',
            key: '14'
          },
          {
            label: 'Ethernet Adapter: "teste3333" (teset1111)',
            key: '15'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '16'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '17'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '18'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '19'
          },
          {
            label: 'Wireless Network: Master "nhx-son-backhaul" (lan)',
            key: '20'
          },
          {
            label: 'Wireless Network: Client "OpenWrt-Sta" (lan)',
            key: '21'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '22'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '23'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '24'
          },
          {
            label: 'Wireless Network: Master "OpenWrt" (lan)',
            key: '25'
          },
          {
            label: 'Wireless Network: Master "nhx-son-backhaul" (lan)',
            key: '26'
          },
          {
            label: 'Wireless Network: Client "OpenWrt-Sta" (lan)',
            key: '27'
          },
          {
            label: 'Custom Interface:',
            key: '28'
          }
          ]
        }
      ],
      interfaceRadio: '',
      childrenList: [],
      noChildrenArr: [
        'Dual-Stack Lite (RFC63333)',
        'IPv6-over-IPv4 (6rd)',
        'PPP',
        'PPtP',
        'L2TP'
      ],
      checkedBoxItem: [],
      protocolErrMsg: 'The selected protocol needs a device assigned',
      nameErrMsg: 'No network name specified',
      errMsg: '',
      isShowErrMsg: false
    }
  },
  computed: {
    showLastSecondFormItem() {
      const isReally = this.noChildrenArr.includes(this.form.region)
      if (isReally) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    'form.interfaceChecked'() {
      this.columns = [
        { label: 'Network', prop: 'ifname' },
        { label: 'ifname', prop: 'interface' },
        { label: 'Device', prop: 'network' }
      ]
    },
    'form.region': {
      handler(newVal, oldVal) {
        if (newVal) {
          const existChildren = this.protocolList.find(item => item.label === newVal)
          this.childrenList = existChildren?.children
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    getAllInterfaces({}).then(res => {
      this.tableData = res
    })
  },
  methods: {
    onRadio(val) {
      console.log('onRadio', val)
      this.form.interfaces = [{ ...val }]
    },
    onSelectChange(val) {
      console.log('onSelectChange:', val)
      this.form.interfaces = val
    },
    createInterface() {
      var params = {}
      var ifname_list = ''
      params['name'] = this.form.name
      params['proto'] = this.form.region
      if (this.form.interfaceChecked) {
        params['type'] = 'bridge'
      }

      if (this.form.interfaces.length > 0) {
        var ifname_list = ''
        var ifanme_first = true

        for (let i = 0; i < this.form.interfaces.length; i++) {
          if (ifanme_first) {
            ifname_list = this.form.interfaces[i].ifname
          } else {
            ifname_list = ifname_list + ' ' + this.form.interfaces[i].ifname
          }

          ifanme_first = false
        }

        params['ifname'] = ifname_list
      }
      addInterfaces(params).then(res => {
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
        this.$EventBus.$emit('RefreshInterfaceTab', { activeName: params.name })
        this.$router.back()
      }).catch(() => {

      })
    },
    back() {
      this.$router.back()
    },
    showErrMsg() {
      if (this.form.name === '') {
        this.errMsg = 'No network name specified'
        this.isShowErrMsg = true
      }
      if (this.form.interfaceChecked && this.checkedBoxItem.length === 0) {
        this.errMsg = 'The selected protocol needs a device assigned'
        this.isShowErrMsg = true
      }
      if (!this.form.interfaceChecked && this.interfaceRadio === '') {
        this.errMsg = 'The selected protocol needs a device assigned'
        this.isShowErrMsg = true
      }
    }
  }
}

</script>

<style scoped lang="scss">
.title {
  color: #9a258f;
  font-size: 16px;
  margin: 15px 0;
}

.field-key {
  flex: 3 !important;
}
.field-value {
  flex:7 !important;
}
.fieldset {
    margin: 10px 0 0 0;
    padding: 2rem;
    border: 1px;
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    font-family: inherit;
    min-width: inherit;
    overflow-x: hidden;
    overflow-y: hidden;
    border-radius: 4px;
    background-color: #FFF;
    box-shadow: 3px 3px 3px rgb(0 0 0 / 5%);
    border-radius: 4px;
  }

  .el-radio-group {
    width: 408px;
    color: rgb(132, 119, 116);

    label {
      padding: 6px 0 6px 0;

    }
  }

  .interface-checkbox {
    width: 408px;
  }

  .el-input {
    width: 293px;
  }

  span {
    //color: rgb(194, 187, 186);
    //font-size: 12px;
  }

  .el-button {
    background-color: #409eff;
  }
  .err-msg {
    width: 100%;
    margin: 10px 10px;
    border: 1px solid #FF0000;
    height: 30px;
    border-radius: 4px;
    span {
      color: #FF0000;
      font-weight: 900;
      margin: 5px 0 5px 30px;
      line-height: 30px;
    }

  }
</style>
