<template>
  <div>
    <div>Create Interface</div>
    <div class="fieldset">
      <el-form ref="form" :model="form" :rules="rules" label-width="280px">
        <el-form-item label="Name of the new interface" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Note interface name length">
          <span>
            <i class="iconfont icon-bangzhu" />
            Maximum length of the name is 15 characters including the automatic protocol/bridge prefix (br-, 6in4-,
            pppoe-
            etc.)
          </span>
        </el-form-item>

        <el-form-item label="Protocol of the new interface" prop="region">
          <el-select v-model="form.region" placeholder="please select Protocol of the new interface">
            <el-option v-for="(item, index) in protocolList" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="showLastSecondFormItem"
          label="Create a bridge over multiple interfaces"
          prop="interfaceChecked"
        >
          <el-checkbox v-model="form.interfaceChecked" />
        </el-form-item>

        <el-form-item v-if="showLastSecondFormItem" label="Cover the following interface">
          <el-checkbox-group v-if="form.interfaceChecked" v-model="checkedBoxItem" class="interface-checkbox">
            <el-checkbox v-for="(item ,index) in childrenList" :label="item.label" />
          </el-checkbox-group>

          <el-radio-group v-else v-model="interfaceRadio">
            <el-radio v-for="(item, index) in childrenList" :label="item.label" />
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div v-if="isShowErrMsg" class="err-msg">
        <span>{{ errMsg }}</span>
      </div>

    </div>
    <div style="width: 100%; margin-top: 22px; display: flex; justify-content: space-between;">
      <el-button type="success" size="small" @click="back">BACK TO OVERVIEW</el-button>
      <el-button type="success" size="small" @click="createInterface">SUBMIT</el-button>
    </div>
  </div>
</template>
<script>
export default {
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
      form: {
        name: '',
        region: 'Static address',
        interfaceChecked: false
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
      protocolList: [{
        label: 'Static address',
        value: 'Static address',
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
      },
      {
        label: 'DHCP client',
        value: 'DHCP client',
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
      },
      {
        label: 'Unmanaged',
        value: 'Unmanaged',
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
      },
      {
        label: 'Dual-Stack Lite (RFC63333)',
        value: 'Dual-Stack Lite (RFC63333)'
      },
      {
        label: 'IPv6-over-IPv4 (6rd)',
        value: 'IPv6-over-IPv4 (6rd)'
      },
      {
        label: 'DHCPv6 client',
        value: 'DHCPv6 client',
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
      },
      {
        label: 'PPP',
        value: 'PPP'
      },
      {
        label: 'PPtP',
        value: 'PPtP'
      },
      {
        label: 'PPPoE',
        value: 'PPPoE',
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
      },
      {
        label: 'L2TP',
        value: 'L2TP'
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
  created() {},
  methods: {
    createInterface() {
      this.$refs['form'].validate((valid) => {
        const data = {}
        // 如果为true 说明没有children，如果为false说明有说明有children
        const hasCoverInterface = this.noChildrenArr.includes(this.form.region)
        if (valid) {
          data['name'] = this.form.name
          data['region'] = this.form.region
          if (!hasCoverInterface) {
            if (this.form.interfaceChecked) {
              data['cover_interface'] = this.checkedBoxItem
            } else {
              data['cover_interface'] = this.interfaceRadio
            }
          }
          this.$router.push('interfaces')
        }
        this.showErrMsg()
      })
      // console.log(this.interfaceRadio) 单选值
      // console.log(this.checkedBoxItem) 多选值
    },
    back() {
      this.$router.go(-1)
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
    color: rgb(194, 187, 186);
    font-size: 12px;
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
