<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="VLAN" name="first">
        <el-row>
          <el-col :span="24">
            <div class="content-container">
              <h1 class="panel-title">
                VLan List
              </h1>

              <div class="opt-wrapper">
                <div class="opt-item"  @click="onAddItem">
                  <i class="el-icon-circle-plus icon-holder" />
                  <span class="icon-text">Add</span>
                </div>

                <div class="opt-item" @click="onDeleteSelected">
                  <i class="el-icon-remove icon-holder"/>
                  <span class="icon-text">Delete</span>
                </div>
              </div>
              <el-table
                ref="multipleTable"
                v-loading="tableLoading"
                row-key="id"
                :expand-row-keys="expands"
                :data="tableData"
                header-cell-class-name="header-class"
                cell-class-name="cell-class"
                border
                tooltip-effect="dark"
                class="margin-top-5"
                @expand-change="onExpandChange"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  width="1"
                  type="expand"
                  class-name="expand-column-class"
                >
                  <template slot-scope="props">
                    <div class="inline-edit-container">

                      <div class="inline-edit-container-row">
                        <span class="inline-edit-container-row-key disabled-color">VLAN ID:</span>
                        <div class="inline-edit-container-row-value">
                          <el-input :disabled="true" placeholder="20" class="inline-edit-container-row-value-input" />
                          <span class="inline-edit-container-row-value-text disabled-color">(1-4094)</span>
                        </div>
                      </div>

                      <div class="inline-edit-container-row">
                        <span class="inline-edit-container-row-key">Name:</span>
                        <div class="inline-edit-container-row-value">
                          <el-input
                            :disabled="false"
                            placeholder=""
                            value="vlan20"
                            class="inline-edit-container-row-value-input"
                          />
                          <span class="inline-edit-container-row-value-text">(1-50characters)</span>
                        </div>
                      </div>
                      <div class="inline-edit-container-row">
                        <span class="inline-edit-container-row-key">Ports:</span>
                        <div class="inline-edit-container-row-select-value">
                          <div class="inline-edit-container-row-select-value-item">
                            <el-checkbox disabled>1</el-checkbox>
                            <el-select class="inline-edit-container-row-select-value-item-select" :disabled="true" placeholder=" " />
                          </div>

                          <div class="inline-edit-container-row-select-value-item">
                            <el-checkbox>2</el-checkbox>
                            <el-select class="inline-edit-container-row-select-value-item-select" :disabled="false" placeholder=" ">
                              <el-option label="UNTAG" />
                              <el-option label="TAG" />
                            </el-select>
                          </div>
                          <div class="inline-edit-container-row-select-value-item" >
                            <el-checkbox disabled>3</el-checkbox>
                            <el-select class="inline-edit-container-row-select-value-item-select"  :disabled="true" placeholder=" " />
                          </div>
                          <div class="inline-edit-container-row-select-value-item">
                            <el-checkbox disabled>4</el-checkbox>
                            <el-select  class="inline-edit-container-row-select-value-item-select" :disabled="true" placeholder=" " />
                          </div>
                        </div>
                      </div>
                      <div class="inline-edit-container-row">
                        <span class="inline-edit-container-row-key">Description:</span>
                        <div class="inline-edit-container-row-value">
                          <el-input
                            :disabled="false"
                            placeholder=""
                            value="Default Vlan For WAN2"
                            class="inline-edit-container-row-value-input"
                          />
                          <span class="inline-edit-container-row-value-text">(1-50 characters, optional)</span>
                        </div>
                      </div>

                      <div class="inline-edit-container-row margin-top-5">
                        <div class="inline-edit-container-end-btn-wrapper">
                          <el-button size="mini" @click="onEditDone(props.row)">OK</el-button>
                          <el-button size="mini" @click="onEditCancel(props.row)">Cancel</el-button>
                        </div>
                      </div>

                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  type="selection"
                  :selectable="rowCanSelect"
                  width="55"
                />
                <el-table-column
                  header-align="center"
                  align="center"
                  label="ID"
                  width="50"
                >
                  <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  header-align="center"
                  align="center"
                  label="VLAN ID"
                  width="100"
                />
                <el-table-column
                  width="200"
                  prop="address"
                  header-align="center"
                  align="center"
                  label="Name"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="ports"
                  header-align="center"
                  align="center"
                  label="Ports"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="description"
                  header-align="center"
                  align="center"
                  label="Description"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="address"
                  width="100"
                  header-align="center"
                  align="center"
                  label="Operation"
                >
                  <template slot-scope="scope">
                    <span class="font-size-16" @click="handleEdit(scope.row)">
                      <i class="el-icon-edit-outline" />
                    </span>
                    <span class="font-size-16 margin-left-10" @click="handleDelete(scope.row, scope.$index)">
                      <i class="el-icon-remove" />
                    </span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Ports" name="second">
        <el-row>
          <el-col :span="24">
            <div class="content-container">
              <h1 class="panel-title">
                Ports
              </h1>
              <el-table
                class="margin-top-50"
                :data="ports.tableData"
                header-cell-class-name="header-class"
                cell-class-name="cell-class"
                border
              >
                <el-table-column
                  prop="Port"
                  label="Port"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="PVID"
                  label="PVID"
                  header-align="center"
                  align="center"
                >
                  <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.PVID"></el-input>-->
                    <el-select v-model="scope.row.PVID" :disabled="scope.row.pvid_can_edit">
                      <el-option :value="20" label="20" />
                      <el-option :value="436" label="436" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="VLAN"
                  label="VLAN"
                  header-align="center"
                  align="center"
                />
              </el-table>

              <div class="margin-top-20">
                <el-button size="mini">Save</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'VLAN',
  data() {
    return {
      tableLoading: true,
      activeName: 'first',
      expands: [],
      tableData: [],
      multipleSelection: [],
      isEditing: false,
      ports: {
        tableData: [
          { Port: 'Port1', PVID: '2', VLAN: '1(TAG) 2(UNTAG) 12(TAG)', pvid_can_edit: false },
          { Port: 'Port2', PVID: '20', VLAN: '20(UNTAG)', pvid_can_edit: true },
          { Port: 'Port3', PVID: '436', VLAN: '436(UNTAG)', pvid_can_edit: true },
          { Port: 'Port4', PVID: '336', VLAN: '336(UNTAG)', pvid_can_edit: false },
          { Port: 'Port5', PVID: '2988', VLAN: '2988(UNTAG)', pvid_can_edit: false }
        ]
      }
    }
  },
  mounted() {
    this.mockData()
  },
  methods: {
    onExpandChange(row, expandedRows) {
      console.log('onExpandChange')
      //
    },
    mockData() {
      setTimeout(() => {
        this.tableData = [
          {
            id: 1,
            date: '2016-05-03',
            ports: '1(UNTAG)',
            name: '6546',
            address: 'vlan6',
            description: 'Default Vlan For WAN2',
            canSelect: false
          }, {
            description: 'Default Vlan For WAN2',
            id: 2,
            ports: '1(UNTAG)',
            date: '2016-05-02',
            name: '4',
            address: 'vlan56',
            canSelect: false
          }, {
            description: 'Default Vlan For WAN2',
            id: 3,
            ports: '1(UNTAG)',
            date: '2016-05-04',
            name: '432',
            address: 'vlan46',
            canSelect: true
          }, {
            id: 4,
            description: 'Default Vlan For WAN2',
            ports: '2(TAG)',
            date: '2016-05-01',
            name: '432432',
            address: 'vlan326',
            canSelect: true
          }, {
            id: 5,
            description: '',
            date: '2016-05-08',
            ports: '1(UNTAG)',
            name: '3434',
            address: 'vlan4326',
            canSelect: true
          }, {
            id: 6,
            description: 'Default Vlan For WAN2',
            date: '2016-05-06',
            ports: '2(TAG)',
            name: '121',
            address: 'vlan632',
            canSelect: true
          }]
        this.tableLoading = false
      }, 500)
    },
    onAddItem() {
      if (!this.isEditing) {
        const tempid = this.tableData.length + 1
        this.tableData.unshift({
          id: tempid,
          date: '',
          name: '',
          address: '',
          ports: '',
          description: '',
          canSelect: true
        })
        this.expands = []
        this.expands.push(tempid)
        this.isEditing = true
      }
    },
    onDeleteSelected() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确认删除所选中记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.map((value, index) => {
            for (let i = 0; i < this.tableData.length; i++) {
              if (value.id === this.tableData[i].id) {
                this.tableData.splice(i, 1)
              }
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleDelete(row, index) {
      if (row.canSelect) {
        this.$confirm('确认删除此条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleEdit(row) {
      if (row.canSelect && this.isEditing === false) {
        this.$refs.multipleTable.toggleRowExpansion(row, true)
        this.isEditing = true
      }
    },
    onEditCancel(row) {
      this.$refs.multipleTable.toggleRowExpansion(row, false)
      this.isEditing = false
    },
    onEditDone(row) {
      console.log(row)
      this.tableLoading = true
      setTimeout(() => {
        this.isEditing = false
        this.$refs.multipleTable.toggleRowExpansion(row)
        this.tableLoading = false
      }, 500)
    },
    rowCanSelect(row) {
      return row.canSelect
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>

@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

::v-deep .el-input__inner {
  border-radius: 0px;
  height: 30px;
  line-height: 30px;
}

</style>
