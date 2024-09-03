<template>
  <el-tabs
    ref="tabs"
    :value="value"
    :type="tabType"
    @input="onChange"
    @tab-click="onTabClick"
  >
    <el-tab-pane
      v-for="(tab, index) in tabs"
      :key="index"
      :label="tab.label"
      :name="tab.name"
    >
      <slot name="tab" :tab="tab" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'NXHTabIndex',
  props: {
    tabType: {
      type: String,
      default: 'border-card'
    },
    tabs: {
      type: Array
    },
    value: {
      type: String
    }
  },
  methods: {
    displayTab(index, display) {
      this.$nextTick(() => {
        if (!display) {
          this.$refs.tabs.$children[0].$refs.tabs[index].style.display = 'none'
        } else {
          this.$refs.tabs.$children[0].$refs.tabs[index].style.display = 'inline-block'
        }
      })
    },
    onChange(e) {
      this.$emit('input', e)
    },
    onTabClick(tab) {
      this.$emit('onTabClick', tab)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-tabs__header {
  background-color: #F7F7F7;
  border-bottom: unset !important;
}
::v-deep .el-tabs__item {
  font-size: 12px;
  border: none !important;
}
</style>
