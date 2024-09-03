<template>
  <div class="root">
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>Factory Defaults</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Reboot</div>
          <div class="field-value">
          </div>
        </div>

        <div class="opt-btn-wrapper">
          <el-button type="danger" @click="reboot">Reboot</el-button>
        </div>

      </div>
    </el-card>
  </div>

</template>

<script>
import { reboot } from '@/api/system'

export default {
  name: 'RebootTab',
  methods: {
    reboot() {
      this.$confirm('Really reboot?', '', {
        confirmButtonText: ' OK ',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Rebooting...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        reboot({
        }).then(res => {
          loading.close()
          this.$message.success('success')
        }).catch(() => {
          loading.close()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-card {
  border: unset;
}
::v-deep .el-card__header {
  border: unset;
}

::v-deep .el-button {
  color: #FFFFFF;
}
</style>
