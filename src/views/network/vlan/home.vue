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
import VlanTab from './components/vlan-tab'

export default {
  name: 'VLanHome',
  components: {
    NXHTabIndex,
    VlanTab
  },
  data() {
    return {
      activeName: 'VlanTab',
      tabs: [
        { label: 'Vlan', name: 'VlanTab' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
