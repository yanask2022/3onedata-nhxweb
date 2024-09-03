<template>
  <div class="root">
    <NXHTabIndex
      v-show="tabs.length > 0"
      ref="tab"
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component :is="tab.componentName" v-bind="tab" :is-active="activeName === tab.name" />
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>
<script>

import NXHTabIndex from '@/components/NXHTab'
import AP_2GHz from '@/views/wireless/ap/components/AP_2GHz'
import AP_5GHz_1 from '@/views/wireless/ap/components/AP_5GHz_1'
import AP_5GHz_2 from '@/views/wireless/ap/components/AP_5GHz_2'
import AP_6GHz from '@/views/wireless/ap/components/AP_6GHz'
import { wifi } from '@/api/wifi'
// import UnsavedAlert from '@/mixins/unsaved-alert'

export default {
  name: 'APIndex',
  components: {
    NXHTabIndex,
    AP_2GHz,
    AP_5GHz_1,
    AP_5GHz_2,
    AP_6GHz
  },
  // mixins: [UnsavedAlert], // 离开页面事件只有在页面组件中才能监听到。 tab组件中监听不到
  data() {
    return {
      tabs: [
        // { label: '2.4GHz', name: 'AP_2GHz' },
        // { label: '5GHz_1', name: 'AP_5GHz_1' },
        // { label: '5GHz_2', name: 'AP_5GHz_2' },
        // { label: '6GHz', name: 'AP_6GHz' }
      ],
      activeName: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'APEdit') {
      sessionStorage.setItem('fromWireLessAPEdit', 'true')
    } else {
      sessionStorage.setItem('fromWireLessAPEdit', 'false')
    }
    next()
  },
  mounted() {
    const fromAPEdit = sessionStorage.getItem('fromWireLessAPEdit') === 'true'
    const lastTabName = sessionStorage.getItem('WireLessAPTabName')

    if (fromAPEdit && lastTabName && lastTabName !== 'undefined') {
      this.activeName = lastTabName
    }
  },
  created() {
    this.$store.dispatch('configs/getWifi').then((res) => {
      // 根据radio生成tab
      // tab格式: {label: radio.key_radio.freq, name: 根据freq动态设置2.4g/5g/6g, paramsKey: radio.key(给子组件内部获取数据用)  }(变量radio编号_radio接口的freg(例子radio0_2.4Ghz))
      const entries = Object.entries(res).filter(value => {
        return value[0].startsWith('radio')
      }).sort((a, b) => {
        const numA = parseInt(a[0].match(/\d+$/)[0], 10)
        const numB = parseInt(b[0].match(/\d+$/)[0], 10)
        return numA - numB
      })
      for (const [key, value] of entries) {
        // let tabName = ''
        // if (value.freq === '2.4G') {
        //   tabName = 'AP_2GHz'
        // } else if (value.freq === '5G') {
        //   tabName = 'AP_5GHz_1'
        // } else if (value.freq === '6G') {
        //   tabName = 'AP_6GHz'
        // }
        this.tabs.push({
          label: `${key}_${value.freq}`,
          name: `${key}_${value.freq}`,
          componentName: 'AP_2GHz',
          paramsKey: key,
          freq: value.freq
        })
      }
      if (this.activeName === '' || this.activeName === '0') {
        this.activeName = this.tabs[0].name
      }
    })
    // wifi({}).then(res => {
    //   const { radio0, radio1, radio2, radio3 } = res
    //   if (!radio0) {
    //      this.$refs.tab.displayTab(0, false)
    //   }
    //   if (!radio1) {
    //      this.$refs.tab.displayTab(1, false)
    //   } else {
    //     if (!radio0) {
    //       this.activeName = "AP_5GHz_1"
    //     }
    //   }
    //   if (!radio2) {
    //     this.$refs.tab.displayTab(2, false)
    //   }
    //   if (!radio3) {
    //     this.$refs.tab.displayTab(3, false)
    //   }
    // })
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
