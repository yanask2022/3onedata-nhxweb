<template>
  <div class="root">
    <br>
    <!-- 按钮-->
    <div class="class3">
      <el-button size="mini" class="unset-border-radius" @click="onBackClick">Back</el-button>
    </div>

    <!-- title -->
    <el-row class="margin-bottom-10">
      <el-col :span="6">Selected device：</el-col>
      <el-col :span="18">
        <span class="margin-left-20">Configs：</span>
      </el-col>
    </el-row>

    <!--  table -->
    <el-row>
      <!-- 已选中表格-->
      <el-col :span="6">
        <div class="table-panel-wrapper">
          <el-table
            class="width-100p"
            :data="selectedRows"
            cell-class-name="cell-class"
          >
            <el-table-column
              prop="device_name"
              header-align="center"
              align="center"
              label="Device name"
            />
            <el-table-column
              prop="id"
              header-align="center"
              align="center"
              label="Device id"
            />
          </el-table>
        </div>
      </el-col>

      <el-col :span="18">
        <div class="edit-panel-wrapper">
          <NXHTabIndex
            v-model="activeName1"
            :tabs="tabs1"
          >
            <template v-slot:tab="{ tab }">
              <template v-if="tab.name === 'ServicesTab'">
                <NXHTabIndex
                  v-model="servicesTabActiveName"
                  :tabs="servicesTabs"
                >
                  <template v-slot:tab="{ tab }">
                    <component :is="tab.name" v-bind="tab.data" />
                  </template>
                </NXHTabIndex>
              </template>
              <template v-else-if="tab.name === 'SystemTab'">
                <NXHTabIndex
                  v-model="systemTabActiveName"
                  :tabs="systemTabs"
                >
                  <template v-slot:tab="{ tab }">
                    <component :is="tab.name" v-bind="tab.data" />
                  </template>
                </NXHTabIndex>
              </template>
            </template>
          </NXHTabIndex>
          <!--          <NXHTabIndex v-model="activeName" :tabs="tabs">-->
          <!--            <template v-slot:tab="{ tab }">-->
          <!--              <component :is="tab.name" v-bind="tab.data" />-->
          <!--            </template>-->
          <!--          </NXHTabIndex>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NXHTabIndex from '@/components/NXHTab'
import { get_group, group_add_device } from '@/api/ac'
import BasicTab from './config-tab/basic-tab'
import GroupTab from './config-tab/group-tab'
import RestoreTab from './config-tab/restore-tab'
import BackupTab from './config-tab/backup-tab'
import RebootTab from './config-tab/reboot-tab'
import UpgradeTab from './config-tab/upgrade-tab'

export default {
  name: 'ConfigTab',
  components: {
    NXHTabIndex,
    BasicTab,
    GroupTab,
    RestoreTab,
    BackupTab,
    RebootTab,
    UpgradeTab
  },
  props: {
    selectedRows: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      tabs1: [
        { label: 'Services', name: 'ServicesTab' },
        { label: 'System', name: 'SystemTab' }
      ],
      activeName1: 'ServicesTab',
      servicesTabActiveName: 'GroupTab',
      servicesTabs: [
        { label: 'Group', name: 'GroupTab', data: {}}
      ],
      systemTabActiveName: 'RestoreTab',
      systemTabs: [
        { label: 'Factory Default Restore', name: 'RestoreTab', data: {}},
        { label: 'Reboot', name: 'RebootTab', data: {}},
        { label: 'Firmware Upgrade', name: 'UpgradeTab', data: {}}
      ],
      activeName: 'GroupTab',
      tabs: [
        // { label: 'Basic', name: 'BasicTab', data: {}},
        { label: 'Group', name: 'GroupTab', data: {}}

      ],
      selectedAp: null,
      group_list: [],
      activeEditConfigName: 'Basic',
      mockFirmwareConfig: {
        fileList: []
      },
      groupConfig: {
        selectedGroup: {
          value: 1,
          label: '配置组1'
        }
      },
      mockNHXConfig: {
        options: [
          { value: 1, label: 'Fixed NHX-IAC IP address' },
          { value: 2, label: 'Auto discovery' }
        ]
      }

      // tableColumnState: 0,
      // haveSelectedRows: false,
      // keyword: '',
      // tableData: [],
      // columns: [
      //   { label: 'AP Name', prop: 'id' },
      //   { label: 'MAC Address', prop: 'id' },
      //   { label: 'IP Address', prop: 'ip' },
      //   { label: 'Firmware Version', prop: 'version' },
      //   { label: 'Uptime', prop: 'online' }
      // ]
    }
  },
  computed: {
    computedSelectedRows() {
      return this.selectedRows
    }
  },
  provide() {
    return {
      selectedRows: () => this.selectedRows
    }
  },
  created() {
    this.tabs[0].data.selectedRows = this.selectedRows
  },
  mounted() {
    get_group({}).then(res => {
      if (Array.isArray(res)) {
        this.group_list = res
      } else {
        this.group_list = []
      }
    })
  },
  methods: {
    onReStoreClick() {
      return this.$confirm(`Factory restore？`)
    },
    applyNHXConfig() {
      this.$message.success('success')
    },
    onRebootClick() {
      return this.$confirm(`Confirm Reboot?`)
    },
    applyFirmwareConfig() {
      this.$message.success('Complete')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onRowSelect(selection, row) {
      const selected = selection.length > 0
      this.$refs.group_list.clearSelection()
      this.$refs.group_list.toggleRowSelection(row, selected)
      if (selected) {
        this.selectedAp = row
      } else {
        this.selectedAp = null
      }
    },
    onBasicListRowSelect() {
    },
    onBackClick() {
      this.$emit('on-tab-change', 'DeviceTab')
    },
    groupAddDevice() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const params = this.selectedAp
      if (!params) {
        this.$message.error('未选择数据')
        loading.close()
        return
      }
      // TODO 循环调用 group_add_device？
      const ap = this.selectedRows[0].id
      group_add_device({
        group: params.iname,
        device: ap
      }).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.class3 {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 32px;
  //padding: 10px 22px
}
.table-panel-wrapper {
  width: 100%;
  height: 700px;
  border: 1px solid #e3e3e3;
}

 .edit-panel-wrapper {
   //width: 100%;
   height: 700px;
   //border: 1px solid #e3e3e3;
   margin-left: 20px;
   //margin-right: 20px;
   //padding-top: 20px;
   //padding-right: 22px;

   //::v-deep .el-tabs__nav-wrap::after {
   //  //display: none;
   //}
   //
   //::v-deep .el-tabs__header {
   //  border-bottom: unset;
   //  padding-left: 20px;
   //}
   //
   //::v-deep .el-tabs__item {
   //  margin-left: 0 !important;
   //  border-top-left-radius: 0 !important;
   //  border-top-right-radius: 0 !important;
   //  background: #F2F2F2;
   //  font-size: 12px;
   //  color: #000000;
   //  height: 40px;
   //  line-height: 40px;
   //  border: none !important;
   //
   //  &:nth-child(2) {
   //    padding-left: 20px;
   //  }
   //
   //  &.is-active {
   //    background: #ffffff;
   //    color: $primary-color;
   //  }
   //
   //  &:last-child {
   //    padding-right: 20px !important;
   //  }
   //}
   //
   //::v-deep .el-tabs__active-bar {
   //  background-color: $primary-color;
   //}
 }

.class4 {
  width: 100%;
  height: 600px;
  position: relative;
  padding-top: 15px;
  padding-left: 20px
}

.class5 {
  width: 100%;
  margin-top: 30px;
}
</style>
