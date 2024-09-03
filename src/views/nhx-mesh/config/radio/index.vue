<template>
  <div class="root">
    <NXHTabIndex
      ref="tab"
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
import VAP_2GHz from './components/VAP_2GHz'
import VAP_5GHz_1 from './components/VAP_5GHz_1'
import VAP_5GHz_2 from './components/VAP_5GHz_2'
import VAP_6GHz from './components/VAP_6GHz'
import { group_get_config } from '@/api/ac'

export default {
  name: 'ConfigRadio',
  components: {
    NXHTabIndex,
    VAP_2GHz,
    VAP_5GHz_1,
    VAP_5GHz_2,
    VAP_6GHz
  },
  // mixins: [UnsavedAlert], // 离开页面事件只有在页面组件中才能监听到。 tab组件中监听不到
  data() {
    return {
      tabs: [],
      activeName: 'VAP_2GHz'
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
    const canEdit = this.$route.query.canEdit
    this.tabs = [
      { label: 'VAP_2.4GHz', name: 'VAP_2GHz', canEdit: canEdit },
      { label: 'VAP_5GHz_1', name: 'VAP_5GHz_1', canEdit: canEdit },
      { label: 'VAP_5GHz_2', name: 'VAP_5GHz_2', canEdit: canEdit },
      { label: 'VAP_6GHz', name: 'VAP_6GHz', canEdit: canEdit }
    ]
    group_get_config({
      group: this.$route.query.group
    }).then(res => {
      const { radio2, radio3 } = res
      if (!radio2) {
        this.$refs.tab.displayTab(2, false)
      }
      if (!radio3) {
        this.$refs.tab.displayTab(3, false)
      }
    })
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
