<template>
  <div class="root">

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
import DeviceTab from '@/views/nhx-iac/device/components/device-tab'
import ConfigTab from '@/views/nhx-iac/device/components/config'
export default {
  name: 'DeviceHome',
  components: {
    NXHTabIndex,
    DeviceTab,
    ConfigTab
  },
  data() {
    return {

      tabs: [
        { label: 'Devices', name: 'DeviceTab' },
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
      if (this.activeName === 'ConfigTab') {
        this.$nextTick(() => {
          this.$refs.tab.displayTab(1, true)
        })
      } else if (this.activeName === 'DeviceTab') {
        this.$nextTick(() => {
          this.$refs.tab.displayTab(0, true)
        })
      }
    },
    configChange(selectedRows) {
      this.tabs[1].selectedRows = selectedRows
    }
  }
}
</script>
