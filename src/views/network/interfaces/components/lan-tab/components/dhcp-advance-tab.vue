<template>
  <div class="root">
    <!-- 当前tab数据 -->
    {{ fatherData }}
    <el-card shadow="nevar">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">

          <!--  -->
          <div class="field-row" :class="{'highlight' : hash === 'dynamic_dhcp'}">
            <div class="field-key">
              <span class="field-key-text">Dynamic DHCP</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="form.dynamic_dhcp"
                  />
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="field-row" :class="{'highlight' : hash === 'force'}">
            <div class="field-key">
              <span class="field-key-text">Force</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="form.force"
                  />
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="field-row" :class="{'highlight' : hash === 'ipv4_netmask'}">
            <div class="field-key">
              <span class="field-key-text">IPv4-Netmask</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.ipv4_netmask" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="field-row" :class="{'highlight' : hash === 'dhcp_options'}">
            <div class="field-key">
              <span class="field-key-text">DHCP-Options</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.dhcp_options" sizi="small" />
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
  name: 'RouterAdminV2DhcpAdvanceTab',
  props: {
    fatherData: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      hash: '',
      form: {
        dynamic_dhcp: false,
        force: false,
        ipv4_netmask: '',
        dhcp_options: ''
      },
      rules: {
        ipv4_netmask: [{
          required: true,
          message: 'please enter ipv4 netmask',
          trigger: 'blur'
        }],
        dhcp_options: [{
          required: true,
          message: 'please enter dhcp options',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {

  },

  methods: {

  }
}

</script>

<style lang="scss" scoped>
.el-input {

}
</style>
