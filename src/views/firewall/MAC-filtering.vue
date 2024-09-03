<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="LAN MAC Filtering" name="Lan">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">General</h1>

              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_mac_filtering" label="Enable MAC Filtering"></el-checkbox>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-radio-group v-model="allow_current_list" :disabled="!enable_mac_filtering" class="el-radio-group_zrvpq">
                      <el-radio :label="1">Allow packets with the MAC addresses listed below and deny the rest</el-radio>
                      <el-radio :label="2" class="el-radio_en6wr3">Deny packets with the MAC addresses listed below and allow
                        the rest
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div class="col-2"></div>
                </div>

                <div class="two-column-row div_ni5azs">
                  <div class="col-1">
                    <el-button size="mini">Save</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="el-row_zpi63k">
            <el-col :span="24">
              <h1 class="panel-title">MAC Filtering List</h1>

              <div class="two-column-row-container">
                <!-- 按钮-->
                <div class="div_wrr8mh">
                  <div class="div_kvi7lj">
                    <i class="el-icon-circle-plus i_8am4js"></i>
                    <span class="span_5y74sx">Add</span>
                  </div>

                  <div class="div_ansxhl">
                    <i class="el-icon-remove i_ieb73h"></i>
                    <span class="span_8ol5wr">Delete</span>
                  </div>
                </div>

                <div class="div_e5wxq9">
                  <div class="div_jgxfxl">
                    <el-table ref="table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="tableData" border>
                      <el-table-column width="1" type="expand" class-name="expand-column-class">
                        <template slot-scope="scope">
                          <div class="div_dglt3m">

                            <div class="div_7o98zn">
                              <span class="span_ldq6ir">Name:</span>
                              <div class="div_7v648k">
                                <el-input v-model="scope.row.name" size="mini" placeholder class="el-input_yo6ts8"></el-input>
                                <span class="span_cgejyr">(1-50 characters)</span>
                              </div>
                            </div>
                            <div class="div_t57a4i">
                              <span class="span_h02igt">MAC Address:</span>
                              <div class="div_ifj0xu">
                                <el-input v-model="scope.row.mac" size="mini" placeholder class="el-input_2cskxh"></el-input>
                              </div>
                            </div>
                            <div class="div_5t3z0b">
                              <div class="div_6oimse">
                                <el-button size="mini" @click="onTableEditDone(scope.row)">OK</el-button>
                                <el-button size="mini" @click="onTableEditCancel(scope.row)">Cancel
                                </el-button>
                              </div>
                            </div>

                          </div>
                        </template>

                      </el-table-column>
                      <el-table-column type="selection" width="80" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="id" width="80" label="ID" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="name" label="Name" width="200" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="mac" label="MAC Address" header-align="center" align="center"></el-table-column>

                      <el-table-column label="Operation" header-align="center" width="160" align="center">
                        <template slot-scope="scope">
                          <div class="div_pquty9">
                            <span @click="handleTableEdit(scope.row)" class="span_as0wjx">
                              <i class="el-icon-edit-outline"></i>
                            </span>
                            <span class="span_ck1eop">
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
      <!--    -->
      <el-tab-pane label="WLAN MAC Filtering" name="Wlan">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">General</h1>

              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_mac_filtering" label="Enable MAC Filtering"></el-checkbox>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-radio-group v-model="allow_current_list" :disabled="!enable_mac_filtering" class="el-radio-group_b00a4l">
                      <el-radio :label="1">Allow packets with the MAC addresses listed below and deny the rest</el-radio>
                      <el-radio :label="2" class="el-radio_sk9rtq">Deny packets with the MAC addresses listed below and allow
                        the rest
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div class="col-2"></div>
                </div>

                <div class="two-column-row div_ha6a1t">
                  <div class="col-1">
                    <el-button size="mini">Save</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="el-row_e9abnh">
            <el-col :span="24">
              <h1 class="panel-title">MAC Filtering List</h1>

              <div class="two-column-row-container">
                <!-- 按钮-->
                <div class="div_jync6l">
                  <div class="div_hmiq0h">
                    <i class="el-icon-circle-plus i_v3y9i1"></i>
                    <span class="span_6zq4o3">Add</span>
                  </div>

                  <div class="div_7avx8s">
                    <i class="el-icon-remove i_td82jf"></i>
                    <span class="span_pa3gdk">Delete</span>
                  </div>
                </div>

                <div class="div_zsnuzy">
                  <div class="div_4n7rb4">
                    <el-table ref="table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="tableData" border>
                      <el-table-column width="1" type="expand" class-name="expand-column-class">
                        <template slot-scope="scope">
                          <div class="div_wwzf60">

                            <div class="div_lhwjaw">
                              <span class="span_u7djz7">Name:</span>
                              <div class="div_1kgpsf">
                                <el-input v-model="scope.row.name" size="mini" placeholder class="el-input_9daiyd"></el-input>
                                <span class="span_m7wlev">(1-50 characters)</span>
                              </div>
                            </div>
                            <div class="div_jkpod9">
                              <span class="span_3wi0zh">MAC Address:</span>
                              <div class="div_y1j1v9">
                                <el-input v-model="scope.row.mac" size="mini" placeholder class="el-input_xcf8wa"></el-input>
                              </div>
                            </div>
                            <div class="div_jk8xxp">
                              <div class="div_uzexs2">
                                <el-button size="mini" @click="onTableEditDone(scope.row)">OK</el-button>
                                <el-button size="mini" @click="onTableEditCancel(scope.row)">Cancel
                                </el-button>
                              </div>
                            </div>

                          </div>
                        </template>

                      </el-table-column>
                      <el-table-column type="selection" width="80" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="id" width="80" label="ID" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="name" label="Name" width="200" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="mac" label="MAC Address" header-align="center" align="center"></el-table-column>

                      <el-table-column label="Operation" header-align="center" width="160" align="center">
                        <template slot-scope="scope">
                          <div class="div_s1m3oz">
                            <span @click="handleTableEdit(scope.row)" class="span_v7g0br">
                              <i class="el-icon-edit-outline"></i>
                            </span>
                            <span class="span_g1o3oe">
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
  name: 'MACFiltering',
  data() {
    return {
      activeName: 'Lan',
      allow_current_list: '',
      enable_mac_filtering: false,
      tableData: [
        { id: '1', name: 'Client1', mac: '00:00:00:00' },
        { id: '2', name: 'Client2', mac: '00:00:00:00' },
        { id: '3', name: 'Client3', mac: '00:00:00:00' },
        { id: '4', name: 'Client4', mac: '00:00:00:00' }
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

.el-radio-group_zrvpq {
  margin-left: 10px
}

.el-radio_en6wr3 {
  margin-top: 10px
}

.div_ni5azs {
  margin-top: 30px
}

.el-row_zpi63k {
  margin-top: 30px
}

.div_wrr8mh {
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_kvi7lj {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_8am4js {
  font-size: 18px
}

.span_5y74sx {
  font-size: 12px;
  margin-left: 5px
}

.div_ansxhl {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_ieb73h {
  font-size: 18px
}

.span_8ol5wr {
  font-size: 12px;
  margin-left: 5px
}

.div_e5wxq9 {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_jgxfxl {
  flex: 1;
}

.div_dglt3m {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_7o98zn {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_ldq6ir {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_7v648k {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_yo6ts8 {
  max-width: 232px;
}

.span_cgejyr {
  margin-left: 5px
}

.div_t57a4i {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_h02igt {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_ifj0xu {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_2cskxh {
  max-width: 232px;
}

.div_5t3z0b {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_6oimse {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_pquty9 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_as0wjx {
  font-size: 16px
}

.span_ck1eop {
  font-size: 16px;
  margin-left: 8px
}

.el-radio-group_b00a4l {
  margin-left: 10px
}

.el-radio_sk9rtq {
  margin-top: 10px
}

.div_ha6a1t {
  margin-top: 30px
}

.el-row_e9abnh {
  margin-top: 30px
}

.div_jync6l {
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_hmiq0h {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_v3y9i1 {
  font-size: 18px
}

.span_6zq4o3 {
  font-size: 12px;
  margin-left: 5px
}

.div_7avx8s {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_td82jf {
  font-size: 18px
}

.span_pa3gdk {
  font-size: 12px;
  margin-left: 5px
}

.div_zsnuzy {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_4n7rb4 {
  flex: 1;
}

.div_wwzf60 {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_lhwjaw {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_u7djz7 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_1kgpsf {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_9daiyd {
  max-width: 232px;
}

.span_m7wlev {
  margin-left: 5px
}

.div_jkpod9 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_3wi0zh {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_y1j1v9 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_xcf8wa {
  max-width: 232px;
}

.div_jk8xxp {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_uzexs2 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_s1m3oz {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_v7g0br {
  font-size: 16px
}

.span_g1o3oe {
  font-size: 16px;
  margin-left: 8px
}
</style>
