<template>
  <div class="root">
    <NXHTabIndex
      ref="tab"
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
// TODO 使用一个tab, 把数据传入tab
import Group_AP_2GHz from './components/Group_AP_2GHz'
import Group_AP_5GHz_1 from './components/Group_AP_5GHz_1'
import Group_AP_5GHz_2 from './components/Group_AP_5GHz_2'
import Group_AP_6GHz from './components/Group_AP_6GHz'
// import UnsavedAlert from '@/mixins/unsaved-alert'

export default {
  name: 'GroupAP',
  components: {
    NXHTabIndex,
    Group_AP_2GHz,
    Group_AP_5GHz_1,
    Group_AP_5GHz_2,
    Group_AP_6GHz
  },
  // mixins: [UnsavedAlert], // 离开页面事件只有在页面组件中才能监听到。 tab组件中监听不到
  data() {
    return {
      // api返回有radiox才显示: radio2才显示5G_2, radio3蔡显示6G, 不用判断 radio2.freq(0和1需要判断, 2和3不用). 表格数据: 0-9是2.4G,10-19是5G_1,20-29是5G_2,30-39是6G
      tabs: [
        { label: '2.4GHz', name: 'Group_AP_2GHz' },
        { label: '5GHz_1', name: 'Group_AP_5GHz_1' },
        { label: '5GHz_2', name: 'Group_AP_5GHz_2' },
        { label: '6GHz', name: 'Group_AP_6GHz' }
      ],
      activeName: 'Group_AP_2GHz',
      group: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'GroupAPEdit') {
      sessionStorage.setItem('fromAPEdit', 'true')
    } else {
      sessionStorage.setItem('fromAPEdit', 'false')
    }
    next()
  },
  mounted() {
    const fromAPEdit = sessionStorage.getItem('fromAPEdit') === 'true'
    const lastTabName = sessionStorage.getItem('APTabName')
    if (fromAPEdit && lastTabName && lastTabName !== 'undefined') {
      this.activeName = lastTabName
    }

    if (fromAPEdit) {
      this.group = sessionStorage.getItem('group')
    } else {
      this.group = this.$route.query.group
    }
    if (this.group) {
      this.$store.dispatch('configs/getGroup', [this.group, false]).then(() => {
      })
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

.root {
  display: flex;
  flex-direction: column;
}
//
//.title {
//  color: rgb(154, 37, 143);
//  font-size: 16px;
//  margin: 15px 0;
//}
//
//.content-wrapper {
//  width: 100%;
//  display: flex;
//  flex-direction: column;
//
//  .field-row {
//    display: flex;
//    align-items: center;
//    height: 43px;
//    padding: 10px 20px;
//
//    .field-key {
//      flex: 3;
//    }
//
//    .field-value {
//      flex: 7;
//    }
//
//    &:nth-child(odd) {
//      background-color: #f9f9f9;
//    }
//
//    &:nth-child(even) {
//      background-color: #ffffff;
//    }
//  }
//}

</style>
