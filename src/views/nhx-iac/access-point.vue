<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="IP List Statistics" name="IPList">
        <div class="content-container">
          <!-- table 上部按钮 -->
          <div class="buttons-wrapper">
            <div class="left">
              <el-input
                v-model="keyword"
                placeholder="Name, MAC Address, IP"
                size="mini"
                suffix-icon="el-icon-search"
                class="width-190"
              />
              <el-button-group class="margin-left-10" style="width: 300px">
                <el-button size="mini" :class="{'btn-selected' : tableColumnState === 0}" class="unset-border-radius" @click="tableColumnState = 0">Overview</el-button>
                <el-button size="mini" :class="{'btn-selected' : tableColumnState === 1}" class="unset-border-radius" @click="tableColumnState = 1">Config</el-button>
                <el-button size="mini" :class="{'btn-selected' : tableColumnState === 2}" class="unset-border-radius" @click="tableColumnState = 2">Performance</el-button>
                <!--<el-button size="mini" class="unset-border-radius">Mesh Network</el-button>-->
              </el-button-group>
            </div>
            <div class=" right">
              <!--<el-button size="mini" class="unset-border-radius">Add</el-button>-->
              <!--<el-button size="mini" class="unset-border-radius">Delete</el-button>-->
              <el-button
                size="mini"
                :class="{'highlight-btn': haveSelectedRows}"
                class="unset-border-radius"
                @click="onConfigClick"
              >Config
              </el-button>
            </div>
          </div>
          <!-- table 容器-->
          <div class="table-wrapper">
            <!--:default-sort="{prop: 'ap_name', order: 'aescending'}"-->
            <el-table
              ref="multipleTable"
              :data="apList"
              header-cell-class-name="header-class"
              cell-class-name="cell-class"
              border
              @selection-change="onSelectionChange"
            >
              <el-table-column
                width="1"
                type="expand"
                class-name="expand-column-class"
              >
                <template slot-scope="props">
                  <div class="row-expand-template">
                    <expand-tmplate :row-data="props" />
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                header-align="center"
                align="center"
                width="50"
                type="selection"
              />
              <el-table-column
                prop="id"
                header-align="center"
                align="center"
                label="AP Name"
                sortable
              />
              <el-table-column
                prop="id"
                header-align="center"
                align="center"
                label="MAC Address"
                sortable
              />
              <el-table-column
                prop="ip"
                header-align="center"
                align="center"
                label="IP Address"
                sortable
              />

              <el-table-column
                prop="version"
                header-align="center"
                align="center"
                label="Firmware Version"
                sortable
                width="170"
              />

              <el-table-column
                prop="online"
                header-align="center"
                align="center"
                label="Uptime"
                sortable
              />

            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="showConfigPanel" label="Config" name="Config" class="class2">
        <div class="class3">
          <el-button size="mini" class="unset-border-radius" @click="onBackClick">Back</el-button>
        </div>
        <el-row class="margin-bottom-10">
          <el-col :span="6">Selected AP：</el-col>
          <el-col :span="18">
            <span class="margin-left-20">Configs：</span>
          </el-col>
        </el-row>
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
                  prop="id"
                  header-align="center"
                  align="center"
                  label="AP Name"
                />
                <el-table-column
                  prop="ip"
                  header-align="center"
                  align="center"
                  label="IP Address"
                />
              </el-table>
            </div>
          </el-col>
          <!--   配置区-->
          <el-col :span="18">
            <div class="edit-panel-wrapper">
              <el-tabs v-model="activeEditConfigName" style="padding-left: 0 !important;">

                <el-tab-pane label="Basic" name="Basic">
                  <div class="class4">
                    <div style="width: 100%;">
                      <el-row>
                        <el-col :span="24">
                          <h1 class="panel-title">Basic</h1>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <div class="class5">
                            <el-table
                              ref="basic_list"
                              :data="selectedRows"
                              header-cell-class-name="header-class-two"
                              cell-class-name="cell-class"
                              border
                              @select="onBasicListRowSelect"
                            >

                              <!--<el-table-column-->
                              <!--  header-align="center"-->
                              <!--  align="center"-->
                              <!--  width="50"-->
                              <!--  type="selection"-->
                              <!--/>-->
                              <el-table-column
                                prop="id"
                                header-align="center"
                                align="center"
                                label="AP Name"
                              >
                                <template slot-scope="props">
                                  <el-input v-model="props.row.id" size="mini" />
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop="id"
                                header-align="center"
                                align="center"
                                label="Mac Address"
                              />
                              <el-table-column
                                prop="ip"
                                header-align="center"
                                align="center"
                                label="IP Address"
                              />
                              <!--<el-table-column-->
                              <!--  prop="model"-->
                              <!--  header-align="center"-->
                              <!--  align="center"-->
                              <!--  label="Model"-->
                              <!--/>-->
                            </el-table>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <div class="margin-top-30">
                            <el-button size="mini">Save</el-button>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-tab-pane>

                <!-- 组配置 -->
                <el-tab-pane label="Group" name="Group">
                  <div class="class4">
                    <div style="width: 100%;">
                      <el-row>
                        <el-col :span="24">
                          <h1 class="panel-title">Group</h1>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <div class="class5">
                            <el-table
                              ref="group_list"
                              :data="group_list"
                              header-cell-class-name="header-class-two"
                              cell-class-name="cell-class"
                              border
                              @select="onRowSelect"
                            >

                              <el-table-column
                                header-align="center"
                                align="center"
                                width="50"
                                type="selection"
                              />
                              <el-table-column
                                prop="iname"
                                header-align="center"
                                align="center"
                                label="ID"
                                width="50"
                              />
                              <el-table-column
                                prop="comment"
                                header-align="center"
                                align="center"
                                label="Group Name"
                              />
                            </el-table>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <div class="margin-top-30">
                            <el-button size="mini" @click="groupAddDevice">Save</el-button>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>

                </el-tab-pane>

                <!-- 固件配置-->
                <el-tab-pane label="Firmware" name="Firmware">
                  <div class="class4">
                    <div style="width: 100%;">
                      <el-row>
                        <el-col :span="24">
                          <h1 class="panel-title">Firmware Upgrade</h1>
                        </el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-col :span="3">Firmware Version:</el-col>
                        <el-col :span="21">6.0.1 Build 20180108 Rel.57022</el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-col :span="3">Hardware Version:</el-col>
                        <el-col :span="21">TL-R47T+ v6.0</el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-col :span="3">New Firmware File:</el-col>
                        <el-col :span="21">
                          <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :multiple="false"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="mockFirmwareConfig.fileList"
                          >
                            <el-button size="mini">Upload</el-button>
                            <div slot="tip" class="el-upload__tip">upload xxx file only</div>
                          </el-upload>
                        </el-col>
                      </el-row>

                      <el-row class="margin-top-50">
                        <el-col>
                          <el-button size="mini" @click="applyFirmwareConfig">Upgrade</el-button>
                        </el-col>
                      </el-row>
                    </div>

                    <!--<div class="confirm-config-button-wrapper">-->
                    <!--  <el-button size="mini" @click="applyFirmwareConfig">Apply</el-button>-->
                    <!--  &lt;!&ndash;<el-button size="mini" @click="">Cancel</el-button>&ndash;&gt;-->
                    <!--</div>-->
                  </div>
                </el-tab-pane>

                <el-tab-pane label="Reboot" name="Reboot">
                  <div class="class4">
                    <div style="width: 100%;">

                      <h1 class="panel-title">Reboot</h1>
                      <el-button class="margin-top-30" size="mini" @click="onRebootClick">Reboot</el-button>
                    </div>

                    <div class="confirm-config-button-wrapper">
                      <!-- buttons-->
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Factory Restore" name="FactoryRestore">
                  <div class="class4">
                    <div style="width: 100%;">
                      <el-row>
                        <el-col :span="24">
                          <h1 class="panel-title">Factory Defaults</h1>
                        </el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-col :span="24">Revert all to configuration to factory default</el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-button size="mini" @click="onReStoreClick">Factory Restore</el-button>
                      </el-row>
                    </div>

                    <div class="confirm-config-button-wrapper">
                      <!-- buttons-->
                    </div>
                  </div>
                </el-tab-pane>

                <!--NHX-IAC IP-->
                <el-tab-pane label="NHX-IAC IP" name="NHX-IAC-IP">
                  <div class="class4">
                    <div style="width: 100%;">

                      <h1 class="panel-title">NHX-IAC IP</h1>
                      <br>
                      <div class="class6">
                        <span class="margin-right-10">NHX-IAC IP： </span>
                        <el-select
                          v-model="groupConfig.selectedGroup.value"
                          size="mini"
                          placeholder="please select"
                          class="width-232"
                        >
                          <el-option
                            v-for="item in mockNHXConfig.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </div>

                      <div class="margin-top-30">
                        <el-button size="mini" @click="applyNHXConfig">Apply</el-button>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ExpandTmplate from '@/views/nhx-iac/components/ExpandTmplate'
import { get_aplist, get_group, group_add_device } from '@/api/ac'

export default {
  name: 'AccessPoint',
  components: { ExpandTmplate },
  data() {
    return {
      selectedAp: {},
      apList: [],
      keyword: '',
      activeName: 'IPList',
      tableData: [
        {
          ap_name: '50-C7-BF-00-00-02',
          mac: '50-C7-BF-00-00-02',
          ip: '192.168.0.1',
          status: 'Connected',
          model: 'EAP345(EU)',
          h_v: '3.0',
          f_v: '2.0.0 Build 20180601 Rel. 52885',
          channel: '6(2.4G), 36(5G)',
          client_number: '1',
          download: '23.3 G',
          upload: '512 M'
        },
        {
          ap_name: '50-C7-BF-00-00-01',
          mac: '50-C7-BF-00-00-01',
          ip: '192.168.0.1',
          status: 'Connected',
          model: 'EAP345(EU)',
          h_v: '3.0',
          f_v: '2.0.0 Build 20180601 Rel. 52885',
          channel: '6(2.4G), 36(5G)',
          client_number: '1',
          download: '23.3 G',
          upload: '512 M'
        },
        {
          ap_name: '50-C7-BF-00-00-01',
          mac: '50-C7-BF-00-00-01',
          ip: '192.168.0.1',
          status: 'Connected',
          model: 'EAP345(EU)',
          h_v: '3.0',
          f_v: '2.0.0 Build 20180601 Rel. 52885',
          channel: '6(2.4G), 36(5G)',
          client_number: '1',
          download: '23.3 G',
          upload: '512 M'
        },
        {
          ap_name: '50-C7-BF-00-00-01',
          mac: '50-C7-BF-00-00-01',
          ip: '192.168.0.1',
          status: 'Connected',
          model: 'EAP345(EU)',
          h_v: '3.0',
          f_v: '2.0.0 Build 20180601 Rel. 52885',
          channel: '6(2.4G), 36(5G)',
          client_number: '1',
          download: '23.3 G',
          upload: '512 M'
        },
        {
          ap_name: '50-C7-BF-00-00-01',
          mac: '50-C7-BF-00-00-01',
          ip: '192.168.0.1',
          status: 'Connected',
          model: 'EAP345(EU)',
          h_v: '3.0',
          f_v: '2.0.0 Build 20180601 Rel. 52885',
          channel: '6(2.4G), 36(5G)',
          client_number: '1',
          download: '23.3 G',
          upload: '512 M'
        },
        {
          ap_name: '50-C7-BF-00-00-01',
          mac: '50-C7-BF-00-00-01',
          ip: '192.168.0.1',
          status: 'Connected',
          model: 'EAP345(EU)',
          h_v: '3.0',
          f_v: '2.0.0 Build 20180601 Rel. 52885',
          channel: '6(2.4G), 36(5G)',
          client_number: '1',
          download: '23.3 G',
          upload: '512 M'
        }
      ],
      selectedRows: null,
      showConfigPanel: false,
      activeEditConfigName: 'Group',
      groupConfig: {
        selectedGroup: {
          value: 1,
          label: '配置组1'
        }
      },
      mockGroupConfig: {
        options: [
          { value: 1, label: '配置组1' },
          { value: 2, label: '配置组2' },
          { value: 3, label: '配置组3' }
        ]
      },
      NHXConfig: {
        selectedGroup: {
          value: 1,
          label: 'Fixed NHX-IAC IP address'
        }
      },
      mockNHXConfig: {
        options: [
          { value: 1, label: 'Fixed NHX-IAC IP address' },
          { value: 2, label: 'Auto discovery' }
        ]
      },
      mockFirmwareConfig: {
        fileList: []
      },

      haveSelectedRows: false,
      tableColumnState: 0,
      basic_list: [
        { ap_name: 'AP name1', mac: '00:00:00:00', ip: '192.168.0.1', model: 'model name 1' },
        { ap_name: 'AP name2', mac_address: '00:00:00:00', ip_address: '192.168.0.1', model: 'model name 1' },
        { ap_name: 'AP name3', mac_address: '00:00:00:00', ip_address: '192.168.0.1', model: 'model name 1' }
      ],

      group_list: [
      ]
    }
  },
  mounted() {
    get_aplist({}).then(res => {
      this.apList = res.aplist
    })
    get_group({}).then(res => {
      this.group_list = res
    })
  },
  methods: {
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
        return
      }
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
    onBasicListRowSelect(selection, row) {
      const selected = selection.length > 0
      this.$refs.basic_list.clearSelection()
      this.$refs.basic_list.toggleRowSelection(row, selected)
      // if (selected) {
      //   this.selectedAp = row
      // } else {
      //   this.selectedAp = null
      // }
    },
    onSelectionChange(selection) {
      this.haveSelectedRows = selection.length > 0
    },
    applyNHXConfig() {
      this.$message.success('NHX-IAC配置已应用')
    },
    onReStoreClick() {
      return this.$confirm(`确认恢复出厂设置？`)
    },
    onRebootClick() {
      return this.$confirm(`确认重启？`)
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
    handleView(row) {
      this.$refs.multipleTable.toggleRowExpansion(row)
    },
    applyGroupConfig() {
      this.$message.success('Complete')
    },
    applyFirmwareConfig() {
      this.$message.success('Complete')
    },
    onConfigClick() {
      if (this.$refs.multipleTable.selection.length < 1) {
        this.$message.error('未选择数据')
        return
      }
      // this.$nextTick(() => {
      this.selectedRows = this.$refs.multipleTable.selection
      // })
      this.activeName = 'Config'
      this.showConfigPanel = true
    },
    onBackClick() {
      // this.showConfigPanel = false
      this.activeName = 'IPList'
    }
  }
}
</script>
<style lang="scss" scoped>

@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.highlight-btn {
  background-color: $primary-color !important;
  color: #ffffff !important;
}

.confirm-config-button-wrapper {
  width: 174px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: 0
}

.table-panel-wrapper {
  width: 100%;
  height: 700px;
  border: 1px solid #e3e3e3;
}

.edit-panel-wrapper {
  //width: 100%;
  height: 700px;
  border: 1px solid #e3e3e3;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
  padding-right: 22px;

  ::v-deep .el-tabs__nav-wrap::after {
    //display: none;
  }

  ::v-deep .el-tabs__header {
    border-bottom: unset;
    padding-left: 20px;
  }

  ::v-deep .el-tabs__item {
    margin-left: 0 !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    background: #F2F2F2;
    font-size: 12px;
    color: #000000;
    height: 40px;
    line-height: 40px;
    border: none !important;

    &:nth-child(2) {
      padding-left: 20px;
    }

    &.is-active {
      background: #ffffff;
      color: $primary-color;
    }

    &:last-child {
      padding-right: 20px !important;
    }
  }

  ::v-deep .el-tabs__active-bar {
    background-color: $primary-color;
  }
}

.btn-selected {
  color: $primary-color;
  border-color: #b3ccd1;
  background-color: #e6eef0;
}
.unset-border-radius {
  border-radius: 0;
}
.buttons-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .left {
    display: flex;
    align-items: center;

    ::v-deep .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }

  .right {
    display: flex;
  }
}

.table-wrapper {
  width: 100%;
  margin-top: 20px;
}

.class1 {
  font-size: 20px;
  color: $primary-font-color
}

.class2 {
  padding: 0 10px
}

.class3 {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 22px
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

.class6 {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
