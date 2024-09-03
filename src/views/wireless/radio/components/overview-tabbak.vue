<template>
  <div class="root">
    <NXHTabIndex
      ref="tab"
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" v-bind="tab" />
      </template>
    </NXHTabIndex>
  </div>
</template>

<script>

import NXHTabIndex from '@/components/NXHTab'
import VAPOverviewTab from '@/views/wireless/radio/components/overview-components/vap-overview-tab'
import RadioOverviewTab from '@/views/wireless/radio/components/overview-components/radio-overview-tab'

export default {
  name: 'OverviewTab',
  components: {
    NXHTabIndex,
    VAPOverviewTab,
    RadioOverviewTab
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabs: [
        { label: 'VAP Status', name: 'VAPOverviewTab' },
        // { label: 'Radio status', name: 'RadioOverviewTab' },
      ],
      activeName: 'VAPOverviewTab'
    }
  }
}
</script>

<style scoped lang="scss">
span {
  font-size: 12px;
}

.el-button--mini {
  color: #FFFFFF !important;
}

.reset-btn {
  background-color: #4a90e2;
  color: #ffffff;
}

::v-deep .el-icon-circle-plus {
  color: #FFFFFF;
  //font-size: 14px;
}

.item-actions {
  justify-content: center;
  display: flex;
}

.item-status {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.header-wrapper {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
</style>
