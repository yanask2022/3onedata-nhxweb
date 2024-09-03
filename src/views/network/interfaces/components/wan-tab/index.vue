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
            <component :is="tab.name" v-bind="tab" @selectedChange="selectedChange" />
          </template>
        </NXHTabIndex>
      </div>
    </el-card>
    <br>
    <br>
    <!--    <el-card shadow="never">-->
    <!--      <div slot="header">-->
    <!--        <div class="header-wrapper">-->
    <!--          <span>DHCP Server</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="card-panel-editable-content-wrapper" style="width: 100%">-->
    <!--        <NXHTabIndex v-model="DHCPTabActiveName" :tabs="DHCPTabs">-->
    <!--          <template v-slot:tab="{ tab }">-->
    <!--            <component :is="tab.name" v-bind="tab" />-->
    <!--          </template>-->
    <!--        </NXHTabIndex>-->
    <!--      </div>-->
    <!--    </el-card>-->
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
export default {
  name: 'WanTab',
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
  data() {
    return {
      commonTabActiveName: 'GeneralSetupTab',
      commonTabs: [{
        label: 'General Setup',
        name: 'GeneralSetupTab'
      }
      // {
      //   label: 'Advanced Settings',
      //   name: 'AdvancedSettingsTab'
      // },
      // {
      //   label: 'Physical Settings',
      //   name: 'PhysicalSettingsTab'
      // },
      // {
      //   label: 'Firewall Settings',
      //   name: 'FirewallSettingsTab'
      // }
      ],
      DHCPTabActiveName: 'DhcpGeneralTab',
      DHCPTabs: [{
        label: 'General Setup',
        name: 'DhcpGeneralTab'
      },
      {
        label: 'Advanced Settings',
        name: 'DhcpAdvanceTab'
      },
      {
        label: 'IPV6 Settings',
        name: 'DhcpIpsixTab'
      }
      ]
    }
  },
  methods: {
    selectedChange(e) {
      if (e !== 'DHCP Client') {
        this.commonTabs = [{
          label: 'General Setup',
          name: 'GeneralSetupTab'
        }]
      } else {
        this.commonTabs = [{
          label: 'General Setup',
          name: 'GeneralSetupTab'
        },
        {
          label: 'Advanced Settings',
          name: 'AdvancedSettingsTab'
        },
        {
          label: 'Physical Settings',
          name: 'PhysicalSettingsTab'
        },
        {
          label: 'Firewall Settings',
          name: 'FirewallSettingsTab'
        }
        ]
      }
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
    border-radius:0 !important;
    border: unset;
    box-shadow:unset;
  }
</style>
