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
import Radio_2GHz from '@/views/wireless/radio/components/Radio_2GHz'
import Radio_5GHz_1 from '@/views/wireless/radio/components/Radio_5GHz_1'
import Radio_6GHz from '@/views/wireless/radio/components/Radio_6GHz'
import OverviewTab from './components/overview-tab'
import lodash from 'lodash'
export default {
  name: 'RadioIndex',
  components: {
    NXHTabIndex,
    Radio_2GHz,
    Radio_5GHz_1,
    Radio_6GHz,
    OverviewTab
  },
  data() {
    return {
      tabs: [
        { label: 'Overview', name: 'OverviewTab' }
      ],
      activeName: 'OverviewTab'
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path === this.$route.path && to.params && to.params.paramsKey && to.params.freq) {
          const freq = to.params.freq
          const key = to.params.paramsKey
          const target = this.tabs.find(tab => {
            return tab.label === `${key}_${freq}`
          })
          this.activeName = target.name
        }
      },
      deep: true
    }
  },
  created() {
    lodash.delay(this.getData, 200)
  },
  methods: {
    getData() {
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
          let tabName = ''
          if (value.freq === '2.4G') {
            tabName = 'Radio_2GHz'
          } else if (value.freq === '5G') {
            tabName = 'Radio_5GHz_1'
          } else if (value.freq === '6G') {
            tabName = 'Radio_6GHz'
          }
          this.tabs.push({ label: `${key}_${value.freq}`, name: tabName, paramsKey: key })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.root {
  display: flex;
  flex-direction: column;
}

.title {
  color: rgb(154, 37, 143);
  font-size: 16px;
  margin: 15px 0;
}

.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  .field-row {
    display: flex;
    align-items: center;
    height: 43px;
    padding: 10px 20px;

    .field-key {
      flex: 3;
    }

    .field-value {
      flex: 7;
    }

    &:nth-child(odd) {
      background-color: #f9f9f9;
    }

    &:nth-child(even) {
      background-color: #ffffff;
    }
  }
}

</style>
