<template>
  <div class="root">
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">
          <div class="field-row" :class="{'highlight' : hash === 'enbaleBoot'}">
            <div class="field-key">
              <span class="field-key-text">Bring up on boot</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.enbaleBoot" />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'enableIpv6'}">
            <div class="field-key">
              <span class="field-key-text">Use builtin IPv6-management</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.enableIpv6" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'mac_address'}">
            <div class="field-key">
              <span class="field-key-text">Override MAC address</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.mac_address" sizi="small" />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'mtu'}">
            <div class="field-key">
              <span class="field-key-text">Override MTU</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.mtu" sizi="small" />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'use_gateway'}">
            <div class="field-key">
              <span class="field-key-text">Use gateway metric</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.use_gateway" sizi="small" />
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AdvancedSettingsTab',
  data() {
    return {
      form: {
        enbaleBoot: false,
        enableIpv6: false,
        mac_address: '5C:B1:5F:92:4A:3C',
        mtu: '1500',
        use_gateway: '0'
      },
      rules: {
        mac_address: [
          {
            required: true,
            message: 'Please enter the mac address',
            trigger: 'blur'
          }
        ],
        mtu: [
          {
            required: true,
            message: 'Please enter the mtu',
            trigger: 'blur'
          }
        ],
        use_gateway: [
          {
            required: true,
            message: 'Please enter the number of gateways',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {}
}

</script>

<style scoped>
.el-input {

}

</style>
