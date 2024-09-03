<template>
  <div class="root">
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules" >

          <div class="field-row" :class="{'highlight' : hash === 'protocol'}">
            <div class="field-key">
              <span class="field-key-text">Protocol</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    @change="selectChange"
                    v-model="form.protocol"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(item, index) in protocolList" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <template  v-if="showOtherFormItem">
            <div  class="field-row" :class="{'highlight' : hash === 'ipv4_address'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 address</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv4_address" sizi="small" />
                  </div>
                </div>
              </div>
            </div>

            <div  class="field-row" :class="{'highlight' : hash === 'ipv4_netmask'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 netmask</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-select
                      v-model="form.ipv4_netmask"
                      style="width: 100%"
                      size="small"
                    >
                      <el-option v-for="(item, index) in ipv4List" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>

<!--            -->
            <div  class="field-row" :class="{'highlight' : hash === 'ipv4_gateway'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 gateway</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv4_gateway" sizi="small" />
                  </div>
                </div>
              </div>
            </div>

<!--            -->
            <div  class="field-row" :class="{'highlight' : hash === 'ipv4_broadcast'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 broadcast</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv4_broadcast" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
<!--            -->
            <div  class="field-row" :class="{'highlight' : hash === 'dns_server'}">
              <div class="field-key">
                <span class="field-key-text">Use custom DNS servers</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.dns_server" sizi="small" />
                  </div>
                </div>
              </div>
            </div>

            <div  class="field-row" :class="{'highlight' : hash === 'ipv6_assignment_length'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 assignment length</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-select
                      v-model="form.ipv6_assignment_length"
                      style="width: 100%"
                      size="small"
                    >
                      <el-option v-for="(item, index) in ipv6AssignmentLength" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template  v-if="showIPv6FormItem">
            <div  class="field-row" :class="{'highlight' : hash === 'ipv6_assignment_hint'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 assignment hint</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_assignment_hint" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
<!--            -->
            <div  class="field-row" :class="{'highlight' : hash === 'ipv6_address'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 address</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_address" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
<!--            -->
            <div  class="field-row" :class="{'highlight' : hash === 'ipv6_gateway'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 gateway</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_gateway" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div  class="field-row" :class="{'highlight' : hash === 'ipv6_routed_prefix'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 routed prefix</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_routed_prefix" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GeneralSetupTab',
  data() {
    return {
      form: {
        protocol: 'Static address',
        ipv4_address: '',
        ipv4_netmask: '255.255.255.0',
        ipv4_gateway: '',
        ipv4_broadcast: '',
        dns_server: '',
        ipv6_assignment_length: '60',
        ipv6_assignment_hint: '',
        ipv6_address: '',
        ipv6_gateway: '',
        ipv6_routed_prefix: ''
      },
      protocolList: [
        { label: 'Static address', value: 'Static address' },
        { label: 'DHCP Client', value: 'DHCP Client' },
        { label: 'Unmanaged', value: 'Unmanaged' },
        { label: 'Dual-Stack-Lite (RFC6663)', value: 'Dual-Stack-Lite (RFC6663)' },
        { label: 'IPv6 in IPv4 (RFC4231)', value: 'Ipv6 in Ipv4 (RFC4231)' },
        { label: 'IPv6 over IPv4(6to4)', value: 'Pv6 over IPv4(6to4)' },
        { label: 'Pv6 over IPv4(6rd)', value: 'Pv6 over IPv4(6rd)' },
        { label: 'AICCU(SIXXS)', value: 'AICCU(SIXXS)' },
        { label: 'DHCPv6 Client', value: 'DHCPv6 Client' },
        { label: 'Automatic Homenet (HNCP)', value: 'Automatic Homenet (HNCP)' },
        { label: 'PPP', value: 'PPP' },
        { label: 'PPtP', value: 'PPtP' },
        { label: 'PPPoE', value: 'PPPoE' },
        { label: 'PPPoATM', value: 'PPPoATM' },
        { label: 'UMTS/GPRS/EV-DO', value: 'UMTS/GPRS/EV-DO' },
        { label: 'L2TP', value: 'L2TP' }
      ],
      ipv4List: [
        { label: '255.255.255.0', value: '255.255.255.0' },
        { label: '255.255.0.0', value: '255.255.0.0' },
        { label: '255.0.0.0', value: '255.0.0.0' }
      ],
      ipv6AssignmentLength: [
        { label: '60', value: '60' },
        { label: '64', value: '64' },
        { label: 'disabled', value: 'disabled' }
      ],
      rules: {
        protocol: [{
          required: true,
          message: 'Please select a protocol',
          trigger: 'blur'
        }],
        ipv4_address: [{
          required: true,
          message: 'Please enter the ipv4 address',
          trigger: 'blur'
        }],
        ipv4_gateway: [{
          required: true,
          message: 'Please slect ipv4 of gateway',
          trigger: 'blur'
        }],
        ipv4_broadcast: [{
          required: true,
          message: 'Please enter the ipv4 broadcast',
          trigger: 'blur'
        }],
        dns_server: [{
          required: true,
          message: 'Please enter the dns serve',
          trigger: 'blur'
        }],
        ipv6_assignment_length: [{
          required: true,
          message: 'Please slect ipv6 of ipv6_assignment_length',
          trigger: 'blur'
        }],
        ipv6_assignment_hint: [{
          required: true,
          message: 'Please enter the ipv6_assignment_hint',
          trigger: 'blur'
        }],
        ipv6_address: [{
          required: true,
          message: 'Please enter the ipv6 address',
          trigger: 'blur'
        }],
        ipv6_gateway: [{
          required: true,
          message: 'Please enter the ipv4 gateway',
          trigger: 'blur'
        }],
        ipv6_routed_prefix: [{
          required: true,
          message: 'Please enter the ipv4 ipv6_routed_prefix',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    showOtherFormItem() {
      return this.form.protocol === 'Static address'
    },
    showIPv6FormItem() {
      return this.form.ipv6_assignment_length === 'disabled'
    }
  },
  methods: {
    selectChange(e) {
      // console.log(e)
      this.$emit('selectedChange', e)
    }
  }
}

</script>

<style scoped>
</style>
