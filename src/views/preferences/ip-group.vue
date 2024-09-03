<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="IP Group" name="ip_group">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Group List
              </h1>
              <!-- 操作按钮-->
              <div class="class1">
                <div class="div_psi5tq">
                  <i class="el-icon-circle-plus i_qk5a9h"></i>
                  <span class="span_sz36v7">Add</span>
                </div>

                <div class="div_o16qfr">
                  <i class="el-icon-remove i_7u4wo7"></i>
                  <span class="span_nvcvzm">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_xpofra">
                <div class="div_z03o9y">
                  <el-table ref="ip_group_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="ip_group_table_data" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_sftliu">

                          <div class="div_633qhn">
                            <span class="span_99zg4c">Group Name:</span>
                            <div class="div_c7gz1a">
                              <el-input v-model="props.row.group_name" size="mini" placeholder disabled class="el-input_r09wkj"></el-input>
                            </div>
                          </div>

                          <div class="div_3t3e3s">
                            <span class="span_w8tvv8">Address Name:</span>
                            <div class="div_2ld6u">
                              <el-select v-model="props.row.address_name" multiple size="mini" class="el-select_pme6ye">
                                <el-option value="IP_LAN" lable="IP_LAN"></el-option>
                                <el-option value="ipaddr1" label="ipaddr1"></el-option>
                              </el-select>
                            </div>

                          </div>

                          <div class="div_uv0naj">
                            <span class="span_8kuyxl">Description:</span>
                            <div class="div_97c41z">
                              <el-input v-model="props.row.description" size="mini" class="el-input_qtxevk"></el-input>
                              <span class="span_e4ko4a">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_lnt9bp">
                            <div class="div_88ektf">
                              <el-button size="mini" @click="onIPGroupTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onIPGroupTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="80" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="group_name" label="Group Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="address_name" label="Address Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="description" label="Description" header-align="center" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_juphqt">
                          <div v-if="scope.row.can_edit" class="div_84gblk">
                            <span @click="handleIPGroupTableEdit(scope.row)" class="span_jis54i">
                              <i class="el-icon-edit-outline"></i>
                            </span>

                            <span @click="handleIPGroupTableDelete(scope.row, scope.$index)" class="span_wandqu">
                              <i class="el-icon-remove"></i>
                            </span>
                          </div>
                          <div v-else>
                            <span> -- </span>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="IP Address" name="ip_address">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                IP Address List
              </h1>
              <!-- 操作按钮-->
              <div class="div_3o1bak">
                <div class="div_u97k5t">
                  <i class="el-icon-circle-plus i_o6aam"></i>
                  <span class="span_utm3ym">Add</span>
                </div>

                <div class="div_ynskrn">
                  <i class="el-icon-remove i_ysupau"></i>
                  <span class="span_hnewp7">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_shm8mi">
                <div class="div_mau05n">
                  <el-table ref="ip_address_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="ip_address_table_data" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_pe0j7t">

                          <div class="div_vegbeo">
                            <span class="span_nvm6v">Name:</span>
                            <div class="div_3l6j6i">
                              <el-input v-model="props.row.name" size="mini" disabled class="el-input_k6a6xy"></el-input>
                            </div>
                          </div>
                          <div class="div_70m16i">
                            <span class="span_4jl3n5">IP Address Type:</span>
                            <div class="div_c0mf14">
                              <el-radio-group v-model="props.row.ip_address_type_key">
                                <el-radio :label="1">IP Address Range</el-radio>
                                <el-radio :label="2">IP Address/Mask</el-radio>
                              </el-radio-group>
                            </div>
                          </div>
                          <div class="div_qz9cvk">
                            <span class="span_7g5fc5"></span>
                            <div v-if="props.row.ip_address_type_key == 1" class="div_nqg0e7">
                              <el-input v-model="props.row.ip_range_start" size="mini" class="el-input_xlacjf"></el-input>
                              <span class="span_d9v84q">-</span>
                              <el-input v-model="props.row.ip_range_end" size="mini" class="el-input_bwthlf"></el-input>
                            </div>
                            <div v-else>
                              <el-input v-model="props.row.ip_address" size="mini" class="el-input_8v6rlw"></el-input>
                              <span class="span_6425x3">-</span>
                              <el-input v-model="props.row.mask" size="mini" class="el-input_gugik0"></el-input>
                            </div>
                          </div>

                          <div class="div_23kkbu">
                            <span class="span_lmecds">Description:</span>
                            <div class="div_1046pd">
                              <el-input v-model="props.row.description" size="mini" class="el-input_8aaud3"></el-input>
                              <span class="span_o3j7te">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_cl9hwl">
                            <div class="div_w19xzn">
                              <el-button size="mini" @click="onIPAddressTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onIPAddressTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="name" label="Name" width="100" header-align="center" align="center"></el-table-column>
                    <el-table-column label="IP Address Type" width="140" header-align="center" align="center">
                      <template slot-scope="props">
                        <span v-if="props.row.ip_address_type_key == 2">
                          IP Address/Mask
                        </span>
                        <span v-if="props.row.ip_address_type_key == 1">
                          IP Address Range
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="ip_address_range" label="IP Address Range" header-align="center" align="center">
                      <template slot-scope="props">
                        <span v-if="props.row.ip_address_type_key == 1">
                          {{ props.row.ip_range_start }}/{{ props.row.ip_range_end }}
                        </span>
                        <span v-if="props.row.ip_address_type_key == 2">--</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="IP Address/Mask" header-align="center" width="180" align="center">

                      <template slot-scope="props">
                        <span v-if="props.row.ip_address_type_key == 1">--</span>
                        <span v-if="props.row.ip_address_type_key == 2">
                          {{ props.row.ip_address }}/{{ props.row.mask }}
                        </span>
                      </template>

                    </el-table-column>
                    <el-table-column prop="description" label="Description" width="160" header-align="center" align="center"></el-table-column>

                    <el-table-column width="100" header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">

                        <div class="div_j6y20j">
                          <div v-if="scope.row.can_edit" class="div_zdns24">
                            <span @click="handleIPAddressTableEdit(scope.row)" class="span_wq8yeg">
                              <i class="el-icon-edit-outline"></i>
                            </span>

                            <span @click="handleIPAddressTableDelete(scope.row, scope.$index)" class="span_chenr6">
                              <i class="el-icon-remove"></i>
                            </span>
                          </div>
                          <div v-else>
                            <span> -- </span>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
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
  name: 'IPGroup',
  data() {
    return {
      activeName: 'ip_group',
      ip_group_table_data: [
        {
          id: '1',
          group_name: 'IPGROUP_ANY',
          address_name: '--',
          description: 'IPGROUP_ANY',
          can_edit: false
        },
        {
          id: '2',
          group_name: 'IPGROUP_LAN',
          address_name: 'IP_LAN',
          description: 'IPGROUP_LAN',
          can_edit: false
        },
        {
          id: '3',
          group_name: 'ipgroup1',
          address_name: 'IP_LAN',
          description: '--',
          can_edit: true
        }
      ],
      ip_group_table_is_editing: false,

      ip_address_table_data: [
        {
          id: '1',
          name: 'IP_LAN',
          ip_address_range: '--',
          ip_address_mask: '192.168.0.0/24',
          description: 'IP_LAN',
          can_edit: false,
          ip_address_type_key: 2,
          ip_address: '192.168.0.1',
          mask: '24'
        },
        {
          id: '2',
          name: 'ipaddr1',
          ip_address_type_key: 1,
          ip_range_start: '192.168.10.2',
          ip_range_end: '192.168.10.254',
          ip_address_range: '--',
          ip_address: '192.168.0.1',
          mask: '24',
          ip_address_mask: '192.168.10.2-192.168.10.254',
          description: '--',
          can_edit: true
        }
      ],
      ip_address_table_is_editing: false
    }
  },
  methods: {

    onIPGroupTableEditDone(row) {
      this.$refs.ip_group_table.toggleRowExpansion(row, false)
      this.ip_group_table_is_editing = false
    },

    onIPGroupTableEditCancel(row) {
      this.$refs.ip_group_table.toggleRowExpansion(row, false)
      this.ip_group_table_is_editing = false
    },

    handleIPGroupTableDelete(row) {
      // TODO 表格项删除
    },
    handleIPGroupTableEdit(row) {
      if (!this.ip_group_table_is_editing) {
        this.$refs.ip_group_table.toggleRowExpansion(row, true)
        this.ip_group_table_is_editing = true
      }
    },

    onIPAddressTableEditDone(row) {
      this.$refs.ip_address_table.toggleRowExpansion(row, false)
      this.ip_address_table_is_editing = false
    },
    onIPAddressTableEditCancel(row) {
      this.$refs.ip_address_table.toggleRowExpansion(row, false)
      this.ip_address_table_is_editing = false
    },
    handleIPAddressTableEdit(row) {
      if (!this.ip_address_table_is_editing) {
        this.$refs.ip_address_table.toggleRowExpansion(row, true)
        this.ip_address_table_is_editing = true
      }
    },
    handleIPAddressTableDelete(row) {

    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.three-column-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;

  .three-column-row-cell-1 {
    display: flex;
    align-items: center;
    width: 174px;
  }

  .three-column-row-cell-2 {
    display: flex;
    align-items: center;
    width: 180px;
  }

  .three-column-row-cell-3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.content-wrapper {
  padding: 10px 32px;
  position: relative;
  font-size: 12px;
}

.class1 {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_psi5tq {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_qk5a9h {
  font-size: 18px
}

.span_sz36v7 {
  font-size: 12px;
  margin-left: 5px
}

.div_o16qfr {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_7u4wo7 {
  font-size: 18px
}

.span_nvcvzm {
  font-size: 12px;
  margin-left: 5px
}

.div_xpofra {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_z03o9y {
  flex: 1;
}

.div_sftliu {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_633qhn {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_99zg4c {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_c7gz1a {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_r09wkj {
  max-width: 232px;
}

.div_3t3e3s {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_w8tvv8 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_2ld6u {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_pme6ye {
  width: 232px;
}

.div_uv0naj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_8kuyxl {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_97c41z {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_qtxevk {
  max-width: 232px;
}

.span_e4ko4a {
  color: #000000;
  font-size: 12px
}

.div_lnt9bp {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_88ektf {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_juphqt {
  width: 100%
}

.div_84gblk {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_jis54i {
  font-size: 16px
}

.span_wandqu {
  font-size: 16px;
  margin-left: 8px
}

.div_3o1bak {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_u97k5t {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_o6aam {
  font-size: 18px
}

.span_utm3ym {
  font-size: 12px;
  margin-left: 5px
}

.div_ynskrn {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_ysupau {
  font-size: 18px
}

.span_hnewp7 {
  font-size: 12px;
  margin-left: 5px
}

.div_shm8mi {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_mau05n {
  flex: 1;
}

.div_pe0j7t {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_vegbeo {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_nvm6v {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_3l6j6i {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_k6a6xy {
  max-width: 232px;
}

.div_70m16i {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_4jl3n5 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_c0mf14 {
  flex: 1;
  display: flex;
  align-items: center
}

.div_qz9cvk {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_7g5fc5 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_nqg0e7 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_xlacjf {
  width: 140px
}

.span_d9v84q {
  margin: 0 5px
}

.el-input_bwthlf {
  width: 140px
}

.el-input_8v6rlw {
  width: 140px
}

.span_6425x3 {
  margin: 0 5px
}

.el-input_gugik0 {
  width: 75px
}

.div_23kkbu {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_lmecds {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_1046pd {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_8aaud3 {
  max-width: 232px;
}

.span_o3j7te {
  color: #000000;
  font-size: 12px
}

.div_cl9hwl {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_w19xzn {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_j6y20j {
  width: 100%
}

.div_zdns24 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_wq8yeg {
  font-size: 16px
}

.span_chenr6 {
  font-size: 16px;
  margin-left: 8px
}
</style>

