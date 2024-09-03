<template>
  <div class="root">
    <el-card shadow="never">
      <div slot="header">
        <div class="header-wrapper">
          <span>Common Configuration</span>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTabIndex v-model="commonTabActiveName" :tabs="commonTabs">
          <template v-slot:tab="{ tab }">
            <component :is="tab.name" :config="config" v-bind="tab" @onProtoChange="onProtoChange" />
          </template>
        </NXHTabIndex>
      </div>
    </el-card>
    <br>
    <br>
    <el-card v-if="showDHCPSettingTab" shadow="never">
      <div slot="header">
        <div class="header-wrapper">
          <span>DHCP Server</span>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTabIndex v-model="DHCPTabActiveName" :tabs="DHCPTabs">
          <template v-slot:tab="{ tab }">
            <component :is="tab.name" :config="config" :father-data="fatherData" v-bind="tab" />
          </template>
        </NXHTabIndex>
      </div>
    </el-card>
  </div>
</template>

<script>
import GeneralSetupTab from './components/general-setup-tab'
import AdvancedSettingsTab from './components/advanced-settings-tab'
import PhysicalSettingsTab from './components/physical-settings-tab'
import FirewallSettingsTab from './components/firewall-settings-tab'
import DhcpAdvanceTab from './components/dhcp-advance-tab.vue'
import DhcpGeneralTab from './components/dhcp-general-tab.vue'
import DhcpIpsixTab from './components/dhcp-ipsix-tab.vue'
import NXHTabIndex from '@/components/NXHTab'
import { mapGetters } from 'vuex'
export default {
  name: 'LanTab',
  components: {
    NXHTabIndex,
    GeneralSetupTab,
    AdvancedSettingsTab,
    PhysicalSettingsTab,
    FirewallSettingsTab,
    DhcpAdvanceTab,
    DhcpGeneralTab,
    DhcpIpsixTab
  },
  props: {
    config: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActiveWan: false,
      showDHCPSettingTab: false,
      // fatherData: {},
      commonTabActiveName: 'GeneralSetupTab',
      commonTabs: [
        {
          label: 'General Setup',
          name: 'GeneralSetupTab',
          firstTabName: this.name
        },
        {
          label: 'Advanced Settings',
          name: 'AdvancedSettingsTab',
          firstTabName: this.name
        },
        // "每一个tab都需要 Physical Settings  tab"
        {
          label: 'Physical Settings',
          name: 'PhysicalSettingsTab',
          firstTabName: this.name
        },
        {
          label: 'Firewall Settings',
          name: 'FirewallSettingsTab',
          firstTabName: this.name
        }
      ],
      DHCPTabActiveName: 'DhcpGeneralTab',
      DHCPTabs: [
        {
          label: 'General Setup',
          name: 'DhcpGeneralTab',
          firstTabName: this.name
        }
        /* {
          label: 'Advanced Settings',
          name: 'DhcpAdvanceTab',
        },
        {
          label: 'IPV6 Settings',
          name: 'DhcpIpsixTab',
        },*/
      ]
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (
          to.path === this.$route.path &&
          to.params &&
          to.params.tabName &&
          to.params.tabName === this.name &&
          to.params.secondTabName) {
          // TODO
          this.commonTabActiveName = to.params.secondTabName
        }
      },
      deep: true
    },
    // 'fatherData.proto': {
    //   handler(value) {
    //     this.showDHCPSettingTab = value === 'static'
    //   },
    //   deep: true
    // }
  },

  computed: {
    ...mapGetters(['interfaces', 'originalInterfaces']),
    fatherData() {
      return this.interfaces[this.config.name]
    }
  },
  created() {
    this.$store.dispatch('configs/getInterfaceConfigByName', [this.config.name, true]).then(res => {
      this.onProtoChange(res.proto)
    })
  },
  methods: {
    onProtoChange(e){
      this.showDHCPSettingTab = e === 'static'
    },
    // 显示/隐藏 DHCP tab
    changeDHCPTabs(e) {
      // this.isActiveWan = e === 'wan'
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

::v-deep .el-card__body {
  padding: 0 !important;
}

::v-deep .el-tabs__content {
  padding: 20px 0 0 0 !important;
}

::v-deep .el-tabs--border-card {
  border-radius: 0 !important;
  border: unset;
  box-shadow: unset;
}
</style>
