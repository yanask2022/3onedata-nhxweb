<template>

  <div class="root">
    <NXHTabIndex
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
import StatusTab from './components/StatusTab'
export default {
  name: 'PortsHome',
  components: {
    NXHTabIndex,
    StatusTab
  },
  data() {
    return {
      activeName: 'StatusTab',
      tabs: [
        { label: 'Ports', name: 'StatusTab' }
      ]
    }
  }
}
</script>
