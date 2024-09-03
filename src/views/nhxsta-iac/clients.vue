<template>
  <div class="root">
    <NXHTabIndex v-model="activeName" :tabs="tabs" @onTabClick="onTabClick">
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" v-bind="getFlags(tab.name)" @onEditStatusChange="changeEditStatus" />
      </template>
    </NXHTabIndex>
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
// TODO 可能不应该用nhx-iac/compoents/client-tab 的数据
import ClientTab from '@/views/nhx-iac/components/client-tab'

export default {
  name: 'Clients',
  components: {
    NXHTabIndex,
    ClientTab
  },
  data() {
    return {
      activeName: 'ClientTab',
      keyword: '',
      tabs: [{
        label: 'Ethernet Client',
        name: 'ClientTab'
      }],
      tabIndex: '0',
      ClientEdit: false,
      ClientTabFlags: {
        isActive: true
      },
      currentPage: 1
    }
  },

  created() {
    this.getClientList()
  },

  methods: {
    getClientList() {
      console.log('2')
    },
    getFlags(tabName) {
      if (tabName === 'ClientTab') {
        return this.ClientTabFlags
      }
    },
    onTabClick(tab) {
      this.tabIndex = tab.index
      if (this.tabIndex === '0') {
        this.ClientTabFlags = {
          isActive: true
        }
      }
    },
    changeEditStatus({ tableName, isEdit }) {
      if (tableName === 'ClientTab') {
        this.ClientTabFlags = isEdit
      }
      this.isEdit = (!!this.ClientEdit)
    }
  }
}

</script>

<style scoped lang="scss">

</style>
