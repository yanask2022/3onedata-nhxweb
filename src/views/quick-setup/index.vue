<template>
<div class="root">
    <NXHTabIndex
      ref="tab"
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" />
      </template>
    </NXHTabIndex>
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
import operationMode from '@/views/quick-setup/components/operation-mode'
export default {
  name: 'index',
  components: {
    NXHTabIndex,
    operationMode
  },
  data() {
    return {
      role: 'ac',
      activeName: 'operationMode',
      tabs: [
        { label: 'Operation Mode', name: 'operationMode' },
      ],
    }
  },
  // watch: {
  //   $route: {
  //     handler(to, from) {
  //       if (to.path === this.$route.path && to.params && to.params.tabName) {
  //         this.activeName = to.params.tabName
  //       }
  //     },
  //     deep: true
  //   }
  // },

}
</script>
<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
}

</style>
