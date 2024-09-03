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
    <br>
  </div>
</template>
<script>

import NXHTabIndex from '@/components/NXHTab'
import ConfigTab from '@/views/nhx-mesh/config/components/config-tab'
export default {
  name: 'ConfigHome',
  components: {
    NXHTabIndex,
    ConfigTab
  },
  data() {
    return {
      tabs: [
        { label: 'AP Group', name: 'ConfigTab' }
      ],
      activeName: 'ConfigTab'
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
