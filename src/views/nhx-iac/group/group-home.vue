<template>
  <div class="root">
    <NXHTabIndex
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" v-bind="tab"/>
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>
<script>

import NXHTabIndex from '@/components/NXHTab'
import GroupTab from '@/views/nhx-iac/components/group-tab'
export default {
  name: 'Group',
  components: {
    NXHTabIndex,
    GroupTab
  },
  data() {
    return {
      tabs: [
        { label: 'AP Group', name: 'GroupTab' }
      ],
      activeName: 'GroupTab'
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>


</style>
