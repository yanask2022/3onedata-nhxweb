<template>
  <div class="root">
    <NXHTabIndex
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" v-bind="tab" :is-active="activeName === tab.name" />
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
import DefaultsTab from '@/views/network/firewall/components/defaults-tab.vue'
import RedirectTab from '@/views/network/firewall/components/redirect-tab.vue'
import PortForwardsTab from '@/views/network/firewall/components/port-forwards-tab.vue'
import ZoneTab from '@/views/network/firewall/components/zone-tab.vue'

export default {
  name: 'FirewallHome',
  components: { NXHTabIndex, DefaultsTab, RedirectTab, ZoneTab, PortForwardsTab },
  data() {
    return {
      activeName: 'DefaultsTab',
      tabs: [
        { label: 'Defaults', name: 'DefaultsTab' },
        { label: 'PForwards', name: 'PortForwardsTab' },
        { label: 'Zone', name: 'ZoneTab' },
        { label: 'Redirect', name: 'RedirectTab' }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('configs/getPortForwards').then(() => {})
    this.$store.dispatch('configs/getZone').then(() => {})
    this.$store.dispatch('configs/getRedirects').then(() => {})
    this.$store.dispatch('configs/getDefaults').then(() => {})
  }
}
</script>

<style scoped>

</style>
