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
          <div class="field-key">Revert all the configuration to factory default.</div>
          <div class="field-value">
          </div>
        </div>

        <div class="opt-btn-wrapper">
          <el-button type="danger" @click="RestoreFactory">Factory Restore</el-button>
        </div>

      </div>
    </el-card>
  </div>

</template>

<script>
import { factory } from '@/api/system'

export default {
  name: 'RestoreTab',
  methods: {
    RestoreFactory() {
      this.$confirm('Really reset all changes', '', {
        confirmButtonText: ' OK ',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Saving...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        factory({
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
