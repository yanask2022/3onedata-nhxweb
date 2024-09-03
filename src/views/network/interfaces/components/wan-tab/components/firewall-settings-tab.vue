<template>
  <div class="root">
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'interfaceChecked'}">
          <div class="field-key">
            <span class="field-key-text">Create / Assign firewall-zone</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">

              <el-radio-group v-model="firewall_zone">
                <el-radio label="lan" style="display: block" />
                <el-radio label="wan" style="display: block;margin-top: 20px" />
                <el-radio style="display: flex; align-items: center; width: 330px;margin-top: 20px">
                  <span style="margin-right: 10px">unspecified -or- create</span>
                  <el-input v-model="custom_zone" />
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FirewallSettingsTab',
  data() {
    return {
      firewall_zone: '',
      custom_zone: ''
    }
  }
}
</script>

<style scoped>

</style>
