<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>General Config: {{ group }} / {{ id }} </span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'comment'}">
          <div class="field-key">
            <span class="field-key-text">Device name</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="device_name" sizi="small" @change="changeGroupName" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </el-card>
    <br>

  </div>

</template>

<script>

export default {
  name: 'NHXMeshDeviceDetailsEdit',
  data() {
    return {
      hash: '',
      device_name: '',
      group: ''
    }
  },
  mounted() {
    this.device_name = this.$route.query.device_name
    this.group = this.$route.query.group
    this.id = this.$route.query.id
  },
  methods: {
    changeGroupName() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // TODO 问一下set ap_list
      // group_modify({
      //   group: this.groupId,
      //   comment: this.comment
      // }).then(res => {
      //   loading.close()
      //   this.$message({
      //     type: 'success',
      //     message: 'Save success'
      //   })
      // }).catch(() => {
      loading.close()
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.highlight {
  //animation: blink 1s 3 steps(1);
  background: #8ebdf5 !important;
}

@keyframes blink {
  50% {
    color: transparent;
  }
}

::v-deep .el-card__header {
  //border: unset;
}

::v-deep .el-button {
  color: #FFFFFF;
}

</style>
