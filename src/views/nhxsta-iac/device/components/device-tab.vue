<template>
  <div class="root">
    <br>
    <div class="buttons-wrapper">
      <div class="left">
        <el-input
          v-model="keyword"
          placeholder="Name, MAC Address, IP"
          size="mini"
          suffix-icon="el-icon-search"
          class="width-190"
        />
        <!--        <el-button-group class="margin-left-10">-->
        <!--          <el-button size="mini" :class="{'btn-selected' : tableColumnState === 0}" class="unset-border-radius" @click="tableColumnState = 0">Overview</el-button>-->
        <!--          <el-button size="mini" :class="{'btn-selected' : tableColumnState === 1}" class="unset-border-radius" @click="tableColumnState = 1">Config</el-button>-->
        <!--          <el-button size="mini" :class="{'btn-selected' : tableColumnState === 2}" class="unset-border-radius" @click="tableColumnState = 2">Performance</el-button>-->
        <!--        </el-button-group>-->
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
    <br>
    <br>
    <div style="width: 100%">
      <NXHTableExtends
        :key="randomKey"
        :selection="true"
        :table-data="tableData"
        :columns="columns"
        default-slot-width="200"
        @selection-change="onSelectChange"
        @cell-dblclick="handleCellDoubleClick"
      >
        <template v-slot:id="{ scope }">
          <el-input
            v-if="scope.row[scope.column.property + 'isShow']"
            :ref="scope.column.property"
            v-model="scope.row.id"
            @blur="alterData(scope.row,scope.column)"
          />
          <span v-else>{{ scope.row.id }}</span>
        </template>
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.scope.row)">Edit</el-button>
          <el-button @click="onStatusClick(scope.scope.row)">Status</el-button>
        </template>
      </NXHTableExtends>
    </div>
  </div>
</template>

<script>
import NXHTable from '@/components/NXHTable'
import { get_aplist } from '@/api/ac'
import NXHTableExtends from '@/components/NXHTableExtends/index'
export default {
  name: 'IPListTab',
  components: {
    NXHTable,
    NXHTableExtends
  },
  data() {
    return {
      randomKey: Math.random(),
      tableColumnState: 0,
      haveSelectedRows: false,
      keyword: '',
      tableData: [],
      selectedRows: [],
      columns: [
        { label: 'Device name', prop: 'device_name', custom: true },
        { label: 'Group id', prop: 'group' },
        { label: 'Device id', prop: 'id' },
        { label: 'IP Address', prop: 'ip' },
        { label: 'Firmware Version', prop: 'version' },
        { label: 'Uptime', prop: 'online' }
      ]
    }
  },
  mounted() {
    get_aplist({}).then(res => {
      if (res.aplist && Array.isArray(res.aplist)) {
        for (let i = 0; i < res.aplist.length; i++) {
          if (!res.aplist[i].device_name) {
            res.aplist[i].device_name = ''
          }
        }
        this.tableData = res.aplist
      }
    })
    // get_group({}).then(res => {
    //   this.group_list = res
    // })
  },
  methods: {
    onEdit(row) {
      this.$router.push({
        name: 'DeviceDeEdit',
        query: { ...row }
      })
    },
    onStatusClick(row) {
      const params = {}
      params.id = row.id
      params.data = this.tableData

      this.$router.push({
        name: 'DeviceDetails',
        params: params
      })
    },
    refreshTable() {
      this.randomKey = Math.random()
    },
    alterData(row, column) {
      row[column.property + 'isShow'] = false
      this.refreshTable()
    },
    handleCellDoubleClick(row, column, cell, event) {
      row[column.property + 'isShow' ] = true
      this.refreshTable()
      this.$nextTick(() => {
        this.$refs[column.property] && this.$refs[column.property].focus()
      })
    },
    onSelectChange(selection) {
      this.haveSelectedRows = selection.length > 0
      this.selectedRows = selection
    },

    onConfigClick() {
      if (this.selectedRows.length < 1) {
        this.$message.error('no selected data')
        return
      }
      this.$emit('on-config', this.selectedRows)
      this.$emit('on-tab-change', 'ConfigTab')
    }
  }
}
</script>

<style lang="scss" scoped>
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
.highlight-btn {
  background-color: #005564 !important;
  color: #ffffff !important;
}
</style>
