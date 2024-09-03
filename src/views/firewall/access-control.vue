<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="AccessControl" name="accesscontrol">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">Access Control List</h1>

              <div class="two-column-row-container">
                <!-- 按钮-->
                <div class="div_9pkiva">
                  <div class="div_bk877k">
                    <i class="el-icon-circle-plus i_z9c008"></i>
                    <span class="span_bw1pvx">Add</span>
                  </div>

                  <div class="div_hfbgxq">
                    <i class="el-icon-remove i_e77xbo"></i>
                    <span class="span_cculwo">Delete</span>
                  </div>
                </div>

                <div class="div_8k5c1i">
                  <div class="div_j1x77t">
                    <el-table ref="table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="tableData" border>
                      <el-table-column width="1" type="expand" class-name="expand-column-class">
                        <template slot-scope="scope">
                          <div class="div_qm0grd">

                            <div class="div_5lsylu">
                              <span class="span_xp6kmv">Name:</span>
                              <div class="div_azroet">
                                <el-input v-model="scope.row.name" size="mini" disabled placeholder class="el-input_2wcroh"></el-input>
                                <span class="span_lvcmue">(1-50 characters)</span>
                              </div>
                            </div>

                            <div class="div_tjnsgf">
                              <span class="span_rzsx8v">Policy:</span>
                              <div class="div_d1fug9">
                                <el-select v-model="scope.row.policy" size="mini" class="el-select_2wsnam">
                                  <el-option value="Allow" label="Allow"></el-option>
                                  <el-option value="Block" label="Block"></el-option>
                                </el-select>
                              </div>
                            </div>
                            <!--service type -->
                            <div class="div_ncp6uz">
                              <span class="span_2v0zbu">Service Type:</span>
                              <div class="div_se09e6">
                                <el-select v-model="scope.row.service_type" size="mini" class="el-select_1qyven">
                                  <el-option value="ALL" label="ALL"></el-option>
                                  <el-option value="FTP" label="FTP"></el-option>
                                  <el-option value="SSH" label="SSH"></el-option>
                                  <el-option value="TELNET" label="TELNET"></el-option>
                                  <el-option value="SMTP" label="SMTP"></el-option>
                                  <el-option value="DNS" label="DNS"></el-option>
                                  <el-option value="HTTP" label="HTTP"></el-option>
                                </el-select>
                              </div>
                            </div>

                            <!-- Interface: -->
                            <div class="div_88t0ul">
                              <span class="span_cvjqv8">Interface:</span>
                              <div class="div_zlz6tp">
                                <el-select v-model="scope.row.the_interface" size="mini" multiple class="el-select_tlte84">
                                  <el-option value="LAN" label="LAN"></el-option>
                                  <el-option value="WAN1" label="WAN1"></el-option>
                                  <el-option value="WAN2" label="WAN2"></el-option>
                                </el-select>
                              </div>
                            </div>

                            <!-- Source:: -->
                            <div class="div_c675tm">
                              <span class="span_i1bmxr">Source:</span>
                              <div class="div_bz71le">
                                <el-select v-model="scope.row.source" size="mini" class="el-select_flkft1">
                                  <el-option-group lable="0">
                                    <el-option value="IPGROUP_LAN" label="IPGROUP_LAN"></el-option>
                                    <el-option value="ipgroup1" label="ipgroup1"></el-option>
                                  </el-option-group>
                                  <el-option-group lable="1">
                                    <el-option value="!IPGROUP_LAN" label="!IPGROUP_LAN"></el-option>
                                    <el-option value="!ipgroup1 " label="!ipgroup1 "></el-option>
                                  </el-option-group>
                                  <el-option-group lable="2">
                                    <el-option value="Me" label="Me"></el-option>
                                    <el-option value="!Me" label="Me "></el-option>
                                  </el-option-group>
                                </el-select>
                              </div>
                            </div>

                            <!-- destination -->
                            <div class="div_ew5wsh">
                              <span class="span_j5trg9">Destination:</span>
                              <div class="div_omxcwo">
                                <el-select v-model="scope.row.destination" size="mini" class="el-select_86ace3">
                                  <el-option-group lable="0">
                                    <el-option value="IPGROUP_LAN" label="IPGROUP_LAN"></el-option>
                                    <el-option value="ipgroup1" label="ipgroup1"></el-option>
                                  </el-option-group>
                                  <el-option-group lable="1">
                                    <el-option value="!IPGROUP_LAN" label="!IPGROUP_LAN"></el-option>
                                    <el-option value="!ipgroup1 " label="!ipgroup1 "></el-option>
                                  </el-option-group>
                                  <el-option-group lable="2">
                                    <el-option value="Me" label="Me"></el-option>
                                    <el-option value="!Me" label="Me "></el-option>
                                  </el-option-group>
                                </el-select>
                              </div>
                            </div>

                            <!-- Effective Time:-->
                            <div class="div_jncfkk">
                              <span class="span_e0o31x">Effective Time:</span>
                              <div class="div_xflqqw">
                                <el-select v-model="scope.row.effective_time" size="mini" class="el-select_g93m20">
                                  <el-option value="Any" label="Any"></el-option>
                                  <el-option value="time1" label="time1"></el-option>
                                  <el-option value="time2" label="time2"></el-option>
                                </el-select>
                              </div>
                            </div>

                            <div class="div_g2u0ol">
                              <div class="div_fllm70">
                                <el-button size="mini" @click="onTableEditDone(scope.row)">OK</el-button>
                                <el-button size="mini" @click="onTableEditCancel(scope.row)">Cancel
                                </el-button>
                              </div>
                            </div>

                          </div>
                        </template>

                      </el-table-column>
                      <el-table-column type="selection" width="50" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="name" label="Name" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="source" label="Source" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="destination" label="Destination" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="policy" label="Policy" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="service_type" label="Service Type" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="the_interface" label="Interface" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="effective_time" label="Effective Time" header-align="center" align="center"></el-table-column>

                      <el-table-column label="Operation" header-align="center" width="160" align="center">
                        <template slot-scope="scope">
                          <div class="div_akqqm0">
                            <span @click="handleTableEdit(scope.row)" class="span_l0f0ex">
                              <i class="el-icon-edit-outline"></i>
                            </span>
                            <span class="span_luu5li">
                              <i class="el-icon-remove"></i>
                            </span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>




<script>
export default {
  name: 'AccessControl',
  data() {
    return {
      activeName: 'accesscontrol',
      allow_current_list: '',
      enable_mac_filtering: false,
      tableData: [
        {
          id: 1,
          name: 'AccessCtl1',
          source: '!IPGROUP_LAN',
          destination: 'ipgroup1',
          policy: 'WAN1',
          service_type: 'ALL',
          the_interface: 'LAN,WAN1',
          effective_time: 'Any'
        },
        {
          id: 2,
          name: 'AccessCtl3',
          source: '!IPGROUP_LAN',
          destination: 'ipgroup3',
          policy: 'WAN1',
          service_type: 'ALL',
          the_interface: 'LAN,WAN1',
          effective_time: 'Any'
        }
      ],
      tableEditing: false
    }
  },
  methods: {
    onTableEditDone(row) {
      this.$refs.table.toggleRowExpansion(row, false)
      this.tableEditing = false
    },
    onTableEditCancel(row) {
      this.$refs.table.toggleRowExpansion(row, false)
      this.tableEditing = false
    },
    handleTableEdit(row) {
      if (!this.tableEditing) {
        this.$refs.table.toggleRowExpansion(row, true)
        this.tableEditing = true
      }
    },
    onSaveLogSettingsClick() {
      console.log('onSaveLogSettingsClick')
    },
    onSaveLogClick() {
      console.log('onSaveLogClick')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
.two-column-row-container {
  padding-top: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;

  .two-column-row {
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;

    .col-1 {
      width: 184px;
    }

    .col-2 {
      width: auto;
    }
  }
}

.chart-wrapper {
  background: #fff;
  height: 305px;
  width: 400px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
}

.table-wrapper {
  background: #fff;
  height: 305px;
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e5e5;
}

.title-bar {
  padding-left: 10px;
  width: 100%;
  background: #eee;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 40px;
  color: #212121;
  font-weight: bold;
  justify-content: space-between;
}

.tab-btn {
  padding: 0 6px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 30px;
  background: #ffffff;
  color: #7d7e80;
  font-size: 14px;
  cursor: pointer
}

.tab-btn-selected {
  border-color: #4acbd6;
  background: #4acbd6;
  color: #ffffff;
}

.div_9pkiva {
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_bk877k {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_z9c008 {
  font-size: 18px
}

.span_bw1pvx {
  font-size: 12px;
  margin-left: 5px
}

.div_hfbgxq {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_e77xbo {
  font-size: 18px
}

.span_cculwo {
  font-size: 12px;
  margin-left: 5px
}

.div_8k5c1i {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_j1x77t {
  flex: 1;
}

.div_qm0grd {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_5lsylu {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_xp6kmv {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_azroet {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_2wcroh {
  max-width: 200px;
}

.span_lvcmue {
  margin-left: 5px
}

.div_tjnsgf {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_rzsx8v {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_d1fug9 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_2wsnam {
  width: 200px
}

.div_ncp6uz {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_2v0zbu {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_se09e6 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_1qyven {
  width: 200px
}

.div_88t0ul {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_cvjqv8 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_zlz6tp {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_tlte84 {
  width: 200px
}

.div_c675tm {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_i1bmxr {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_bz71le {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_flkft1 {
  width: 200px
}

.div_ew5wsh {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_j5trg9 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_omxcwo {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_86ace3 {
  width: 200px
}

.div_jncfkk {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_e0o31x {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_xflqqw {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_g93m20 {
  width: 200px
}

.div_g2u0ol {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_fllm70 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_akqqm0 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_l0f0ex {
  font-size: 16px
}

.span_luu5li {
  font-size: 16px;
  margin-left: 8px
}
</style>
