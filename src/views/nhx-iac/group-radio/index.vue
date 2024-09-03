<template>
  <div class="root">
    <NXHTabIndex
      v-if="tabs.length > 0"
      ref="tab"
      v-model="activeName"
      :tabs="tabs"
    >
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" v-bind="tab" @onHWModeChange="hwChange" />
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>
<script>

import NXHTabIndex from '@/components/NXHTab'
import VAP_2GHz from '@/views/nhx-iac/group-radio/components/VAP_2GHz'
import VAP_5GHz_1 from '@/views/nhx-iac/group-radio/components/VAP_5GHz_1'
import VAP_5GHz_2 from '@/views/nhx-iac/group-radio/components/VAP_5GHz_2'
import VAP_6GHz from '@/views/nhx-iac/group-radio/components/VAP_6GHz'
import { group_get_config } from '@/api/ac'

export default {
  name: 'GroupRadio',
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
    const loading = this.$loading({
      lock: true,
      text: 'Please wait...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    group_get_config({
      group: this.$route.query.group
    }).then(res => {
      // hwmode
      const { raido0, raido1, raido2, raido3 } = res
      // this.tabs = [
      //   { label: `raido0_${raido0.hwmode}`, name: 'VAP_2GHz', canEdit: canEdit },
      //   { label: `raido0_${raido0.hwmode}`, name: 'VAP_5GHz_1', canEdit: canEdit },
      //   { label: `raido0_${raido0.hwmode}`, name: 'VAP_5GHz_2', canEdit: canEdit },
      //   { label: `raido0_${raido0.hwmode}`, name: 'VAP_6GHz', canEdit: canEdit }
      // ]
      if (raido0) {
        this.tabs.push({ label: `raido0_${raido0.hwmode}`, name: 'VAP_2GHz', canEdit: !!canEdit })
      }
      if (raido1) {
        this.tabs.push({ label: `raido1_${raido1.hwmode}`, name: 'VAP_5GHz_1', canEdit: !!canEdit })
      }
      if (raido2) {
        this.tabs.push({ label: `raido2_${raido2.hwmode}`, name: 'VAP_5GHz_2', canEdit: !!canEdit })
      }
      if (raido3) {
        this.tabs.push({ label: `raido3_${raido3.hwmode}`, name: 'VAP_6GHz', canEdit: !!canEdit })
      }

      // if (!raido2) {
      //   this.$refs.tab.displayTab(2, false)
      // }
      // if (!raido3) {
      //   this.$refs.tab.displayTab(3, false)
      // }
    }).finally(() => {
      loading.close()
    })
  },
  methods: {
    hwChange(event) {
      if (this.tabs.length > 0) {
        this.tabs.forEach(tab => {
          if (tab.name === event.name) {
            tab.label = event.label
          }
        })
      }
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
