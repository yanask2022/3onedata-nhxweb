<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>General Config: {{ $route.query.comment }} / {{ $route.query.iname }}</span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'comment'}">
          <div class="field-key">
            <span class="field-key-text">Group name</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="comment" :disabled="!canEdit" sizi="small" @change="changeGroupName" />
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

import { group_modify } from '@/api/ac'

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'groupGeneralConfig',
  data() {
    return {
      hash: '',
      groupId: '',
      canEdit: false,
      comment: ''
    }
  },
  mounted() {
    this.comment = this.$route.query.comment
    this.canEdit = this.$route.query.canEdit
    this.groupId = this.$route.query.group
  },
  methods: {
    changeGroupName() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      group_modify({
        group: this.groupId,
        comment: this.comment
      }).then(res => {
        loading.close()
        this.$message({
          type: 'success',
          message: 'Save success'
        })
      }).catch(() => {
        loading.close()
      })
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
