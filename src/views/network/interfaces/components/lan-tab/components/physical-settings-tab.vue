<template>
  <div class="root">
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="ruleForm" :model="form" :rules="rules">

          <div class="field-row" :class="{'highlight' : hash === 'enbale_bridge_interface'}">
            <div class="field-key">
              <span class="field-key-text">Bridge interfaces</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.enbale_bridge_interface" />
                </div>
                <span class="field-value-column-input-tips"> creates a bridge over specified interface(s)</span>
              </div>
            </div>
          </div>

          <div v-if="form.enbale_bridge_interface" class="field-row" :class="{'highlight' : hash === 'enable_stp'}">
            <div class="field-key">
              <span class="field-key-text">Enable STP</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.enable_stp" />
                </div>
                <span class="field-value-column-input-tips"> Enables the Spanning Tree Protocol on this bridge</span>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'interfaceChecked'}">
            <div class="field-key">
              <span class="field-key-text">Interface</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input" />
              </div>
            </div>
          </div>
          <div style="width: 100%;">
            <NXH-Table v-show="form.enbale_bridge_interface" :selection="true" :table-data="tableData" :columns="columns" @selection-change="onSelectChange" />
            <NXHSingleTable v-show="!form.enbale_bridge_interface" :default-sort="{}" :radio="true" :table-data="tableData" :columns="columns" @on-radio="onRadio" />
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

import NXHTable from '@/components/NXHTable'
import NXHSingleTable from '@/components/NXHSingleTable'
export default {
  name: 'PhysicalSettingsTab',
  components: {
    NXHTable,
    NXHSingleTable
  },
  props: {
    // fatherData: {
    //   type: Object,
    //   default: null
    // },
    // TODO 这里需要请求数据， 然后改query: { tabName: this.firstTabName, secondTabName: this.$options.name + '#' + updateKey },
    firstTabName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fatherData: '',
      deepCopyData: {},
      hash: '',
      columns: [
        { label: 'Network', prop: 'ifname' },
        { label: 'ifname', prop: 'interface' },
        { label: 'Device', prop: 'network' }
      ],
      tableData: [],
      form: {
        enbale_bridge_interface: false,
        enable_stp: false,
        radioValue: '',
        checkboxValue: ''
      },
      interfaceList: [
        { label: 'Ethernet Adapter: "bond0"', value: 'Ethernet Adapter: "bond0"' },
        { label: 'Ethernet Adapter: "eth0" (lan, test)', value: 'Ethernet Adapter: "eth0" (lan, test)' },
        { label: 'Ethernet Adapter: "eth1" (aedd, lan, sdfs)', value: 'Ethernet Adapter: "eth1" (aedd, lan, sdfs)' },
        { label: 'Ethernet Adapter: "eth2" (lan)', value: 'Ethernet Adapter: "eth2" (lan)' },
        { label: 'Ethernet Adapter: "eth3" (lan)', value: ' Ethernet Adapter: "eth3" (lan)' },
        { label: ' Ethernet Adapter: "eth4" (wan, wan6)', value: ' Ethernet Adapter: "eth4" (wan, wan6)' },
        { label: ' Ethernet Adapter: "gretap0"', value: ' Ethernet Adapter: "gretap0"' },
        { label: 'Ethernet Adapter: "ip6gre0"', value: 'Ethernet Adapter: "ip6gre0"' },
        { label: 'Ethernet Adapter: "ip6tnl0"', value: 'Ethernet Adapter: "ip6tnl0"' },
        { label: 'Ethernet Adapter: "ipsecdummy"', value: 'Ethernet Adapter: "ipsecdummy"' },
        { label: 'Ethernet Adapter: "miireg"', value: 'Ethernet Adapter: "miireg"' },
        { label: 'Ethernet Adapter: "mmo" (okoo)', value: 'Ethernet Adapter: "mmo" (okoo)' },
        { label: 'Ethernet Adapter: "soc0"', value: 'Ethernet Adapter: "soc0"' },
        { label: 'Ethernet Adapter: "teql0"', value: 'Ethernet Adapter: "teql0"' },
        { label: 'Ethernet Adapter: "teste3333" (teset1111)', value: 'Ethernet Adapter: "teste3333" (teset1111)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: 'Wireless Network: Master "nhx-son-backhaul" (lan)', value: 'Wireless Network: Master "nhx-son-backhaul" (lan)' },
        { label: 'Wireless Network: Client "OpenWrt-Sta" (lan)', value: 'Wireless Network: Client "OpenWrt-Sta" (lan)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: 'Wireless Network: Master "OpenWrt" (lan)', value: 'Wireless Network: Master "OpenWrt" (lan)' },
        { label: ' Wireless Network: Master "OpenWrt" (dsfasd, lan, sdsfdsf3121)', value: ' Wireless Network: Master "OpenWrt" (dsfasd, lan, sdsfdsf3121)' },
        { label: 'Wireless Network: Master "nhx-son-backhaul" (lan)', value: 'Wireless Network: Master "nhx-son-backhaul" (lan)' },
        { label: 'Wireless Network: Client "OpenWrt-Sta" (lan)', value: 'Wireless Network: Client "OpenWrt-Sta" (lan)' },
        { label: 'Custom Interface:', value: 'Custom Interface:' }
      ],
      rules: {
        mac_address: [{
          required: true,
          message: 'Please enter the mac address',
          trigger: 'blur'
        }],
        mtu: [{
          required: true,
          message: 'Please enter the mtu',
          trigger: 'blur'
        }],
        use_gateway: [{
          required: true,
          message: 'Please enter the number of gateways',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    setTimeout(() => {
      this.tableData = [
        {
          ifname: 'bond0',
          interface: 'bond0',
          network: 'Ethernet Adapter'
        },
        {
          ifname: 'eth0',
          interface: 'eth0',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'eth1',
          interface: 'eth1',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'eth2',
          interface: 'eth2',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'eth3',
          interface: 'eth3',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'eth4',
          interface: 'eth4',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'gretap0',
          interface: 'gretap0',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'ip6gre0',
          interface: 'ip6gre0',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'ip6tnl0',
          interface: 'ip6tnl0',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'ipsecdummy',
          interface: 'ipsecdummy',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'miireg',
          interface: 'miireg',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'mmo',
          interface: 'mmo',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'soc0',
          interface: 'soc0',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'teql0',
          interface: 'teql0',
          network: 'Ethernet Adapter',
          phy: 'todo'
        },
        {
          ifname: 'teste3333',
          interface: 'teste3333',
          network: 'Ethernet Adapter',
          phy: 'todo'
        }
      ]
    }, 500)
  },
  methods: {
    getData(data) {
      this.fatherData = data
      console.log('PhysicalSettingsTab', data)
    },
    onRadio(val) {
      console.log('onRadio', val)
      // this.form.interfaces = [{...val}]
    },
    onSelectChange(val) {
      console.log('onSelectChange:', val)
      // this.form.interfaces = val
    }
  }
}

</script>

<style scoped>
.el-radio-group {
    width: 408px;
    color: rgb(132, 119, 116);

  }

  .interface-checkbox {
    width: 408px;
  }

  .el-radio {
    padding: 6px 0;
  }
</style>
