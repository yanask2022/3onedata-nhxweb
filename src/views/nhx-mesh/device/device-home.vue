<template>
  <div className="root">

    <NXHTabIndex
      ref="tab"
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component
          :is="tab.name"
          v-bind="tab"
          @on-tab-change="tabChange"
          @on-config="configChange"
        />
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>
<script>

import NXHTabIndex from '@/components/NXHTab'
import DeviceTab from './components/device-tab'
import ConfigTab from './components/config'

export default {
  name: 'NHXMeshDeviceHome',
  components: {
    NXHTabIndex,
    DeviceTab,
    ConfigTab
  },
  provide() {
    return {
      selectedRows: this.selectedRowsWrapper
    }
  },
  data() {
    return {
      selectedRowsWrapper: {
        data: []
      },
      tabs: [
        { label: 'ap devices', name: 'DeviceTab' },
        { label: 'Config', name: 'ConfigTab', selectedRows: [] }
      ],
      activeName: 'DeviceTab'

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.tab.displayTab(1, false)
    })
  },
  methods: {
    tabChange(tabName) {
      this.activeName = tabName
    },
    configChange(selectedRows) {
      if (selectedRows.length > 0) {
        this.$nextTick(() => {
          this.$refs.tab.displayTab(1, true)
        })
        this.activeName = 'ConfigTab'
      }
      this.tabs[1].selectedRows = selectedRows
      this.selectedRowsWrapper.data = selectedRows
    }
  }
}
</script>
