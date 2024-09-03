<template>
<div class="root">
<!--    <NXHTabIndex-->
<!--      ref="tab"-->
<!--      v-model="activeName"-->
<!--      :tabs="tabs"-->
<!--    >-->
<!--      <template v-slot:tab="{ tab }">-->
<!--        <component :is="tab.name" />-->
<!--      </template>-->
<!--    </NXHTabIndex>-->
  <component is="UPnP" />
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
import UPnP from '@/views/services/components/UPnP'
export default {
  name: 'index',
  components: {
    NXHTabIndex,
    UPnP
  },
  data() {
    return {
      activeName: 'UPnP',
      tabs: [
        { label: 'UpnP', name: 'UPnP' },
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
