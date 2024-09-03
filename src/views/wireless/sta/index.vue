<template>
  <div class="root">
    <NXHTabIndex
      v-show="tabs.length > 0"
      ref="tab"
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <STATabContent v-bind="tab" />
      </template>
    </NXHTabIndex>
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
import STATabContent from './components/sta-tab-content'

export default {
  name: 'STAIndex',
  components: {
    NXHTabIndex,
    STATabContent
  },
  data() {
    return {
      // sta0: 24.GHz, sta1: 5.8GHz, sta2: 5GHz, sta3: 6GH。扫描接口参数sta2对应radio2，wifi2，sta3对应radio3，wifi3
      activeName: '',
      tabs: [
        // { label: '2.4G', name: 'STA_2GHz', isActive: true },
        // { label: '5G_1', name: 'STA_5GHz1', isActive: false },
        // { label: '5G_2', name: 'STA_5GHz2', isActive: false },
        // { label: '6G', name: 'STA_6GHz', isActive: false }
      ]
    }
  },
  watch: {
    activeName(newValue) {
      this.tabs.map((tab) => {
        tab.isActive = tab.name === newValue
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'STAAPEdit') {
      sessionStorage.setItem('fromSTAAPEdit', 'true')
    } else {
      sessionStorage.setItem('fromSTAAPEdit', 'false')
    }
    next()
  },
  mounted() {
    const fromAPEdit = sessionStorage.getItem('fromSTAAPEdit') === 'true'
    const lastTabName = sessionStorage.getItem('STAAPTabName')
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
        this.tabs.push({
          label: `${key}_${value.freq}`,
          name: `${key}_${value.freq}`,
          radioKey: key,
          freq: value.freq
        })
      }
      if (this.activeName === '' || this.activeName === '0') {
        this.activeName = this.tabs[0].name
      }
    })
    // wifi({}).then(res => {
    //   const { sta0, sta1, sta2, sta3 } = res
    //   if (!sta0) {
    //     this.$refs.tab.displayTab(0, false)
    //
    //   }
    //   if (!sta1) {
    //     this.$refs.tab.displayTab(1, false)
    //   } else {
    //     if (!sta0) {
    //       this.activeName = "STA_5GHz1"
    //     }
    //   }
    //   // sta0 2.4G
    //   // sta1 5G_1
    //   // sta2 5G_2
    //   // sta3 6G
    //   if (!sta2) {
    //     this.$refs.tab.displayTab(2, false)
    //   }
    //   if (!sta3) {
    //     this.$refs.tab.displayTab(3, false)
    //   }
    // })
  }
}
</script>
