<template>
  <div class="root">
    <span class="title">Flash operations</span>
    <NXHTabIndex :tabs="tabs" v-model="activeName">
      <template v-slot:tab="{ tab }">
        <component :is="tab.name" />
      </template>
    </NXHTabIndex>
    <br>
  </div>
</template>
<script>

import NXHTabIndex from '@/components/NXHTab'
import RestoreTab from '@/views/system-tools/flash/components/restore-tab'
import BackupTab from '@/views/system-tools/flash/components/backup-tab'
import RebootTab from '@/views/system-tools/flash/components/reboot-tab'
import UpgradeTab from '@/views/system-tools/flash/components/upgrade-tab'

export default {
  name: 'FlashIndex',
  components: {
    NXHTabIndex,
    RestoreTab,
    BackupTab,
    RebootTab,
    UpgradeTab
  },
  data() {
    return {
      activeName: 'RestoreTab',
      tabs: [
        { label: 'Factory Default Restore', name: 'RestoreTab' },
        { label: 'BackUp Restore', name: 'BackupTab' },
        { label: 'Reboot', name: 'RebootTab' },
        { label: 'Firmware Upgrade', name: 'UpgradeTab' }
      ]
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
