<template>
  <div class="root">
    <NXHSingleTable :radio="true" :table-data="group_list" :columns="columns" @on-radio="onRadio" />
    <div>
      <el-button style="margin-top: 20px" @click="onSave">Save</el-button>
    </div>
  </div>
</template>

<script>

import { get_group, group_add_device } from '@/api/ac'
import NXHSingleTable from '@/components/NXHSingleTable'
export default {
  name: 'GroupTab',
  components: {
    NXHSingleTable
  },
  inject: ['selectedRows'],
  data() {
    return {
      selectedAp: {},
      group_list: [],
      columns: [
        { label: 'ID', prop: 'iname' },
        { label: 'Group Name', prop: 'comment' }
      ]
    }
  },
  mounted() {
    get_group({}).then(res => {
      if (Array.isArray(res)) {
        this.group_list = res
      } else {
        this.group_list = []
      }
    })
  },
  methods: {
    onSave() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const selectedRow = this.selectedRows()[0]
      const params = {}
      // 左侧列表中当前选择的ap  device's id
      params.device = selectedRow.id
      // 左侧列表中当前选择的ap  device's  group
      params.group = selectedRow.group
      group_add_device(params).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    onRadio(selected) {

      if (selected) {
        this.selectedAp = selected

      } else {
        this.selectedAp = null
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
