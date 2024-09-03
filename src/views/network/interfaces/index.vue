<template>
  <div class="root">
    <NXHTabIndex
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <OverviewTab v-if="tab.name === 'OverviewTab'" @onEditClick="switchTab" />
        <LanTab v-else v-bind="tab" />
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
import OverviewTab from './components/overview-tab'
import LanTab from './components/lan-tab/index.vue'
import { getInterfaces } from '@/api/interface'
export default {
  name: 'InterfacesIndex',
  components: {
    NXHTabIndex,
    OverviewTab,
    LanTab
  },
  data() {
    return {
      onRefreshTabListener: null,
      tabs: [
        { label: 'Overview', name: 'OverviewTab' }
      ],
      activeName: 'OverviewTab'
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path === this.$route.path && to.params && to.params.tabName) {
          this.activeName = to.params.tabName
        }
      },
      deep: true
    }
  },
  created() {
    this.onRefreshTabListener = async({ activeName }) => {
      await this.getData()
      this.activeName = activeName
    }
    this.$EventBus.$on('RefreshInterfaceTab', this.onRefreshTabListener)
    this.getData()
    this.$store.dispatch('configs/getZone').then(() => {})
  },
  methods: {
    getData() {
      this.tabs = [{ label: 'Overview', name: 'OverviewTab' }]
      const loading = this.$loading({
        lock: true,
        text: 'Please wait...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      getInterfaces({}).then(res => {
        for (const interfacesKey in res.interfaces) {
          this.tabs.push({
            label: res.interfaces[interfacesKey].name,
            name: res.interfaces[interfacesKey].name,
            config: res.interfaces[interfacesKey]
          })
        }
        loading.close()
        if (this.$route.params && this.$route.params.tabName) {
          this.activeName = this.$route.params.tabName
        }
      }).catch(() => {
        loading.close()
      })
    },
    switchTab(e) {
      this.activeName = e
    }
  }
}
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
}

</style>
