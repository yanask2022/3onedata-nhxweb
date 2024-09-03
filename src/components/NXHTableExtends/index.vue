<template>
  <div>
    <el-table
      ref="mTable"
      :key="refreshKey"
      :border="true"
      :data="tableData"
      :stripe="false"
      :span-method="spanMethod"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @cell-dblclick="handleCellDoubleClick"
    >
      <el-table-column
        v-if="selection"
        :resizable="false"
        header-align="center"
        align="center"
        type="selection"
        width="55"
      />
      <!--:width="column.maxWidth"-->
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :resizable="false"
        :sortable="column.sortable"
        :prop="column.prop"
        :min-width="getMinWidth(column)"
        :fixed="getFixed(column)"
        :label="column.label"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <template v-if="column.custom === true">
            <slot :name="column.prop" :scope="scope" />
          </template>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!!$scopedSlots.default"
        fixed="right"
        header-align="center"
        :resizable="false"
        :label="defaultSlotLabel"
        :width="defaultSlotWidth"
        align="center"
      >
        <template slot-scope="scope">
          <slot name="default" :scope="scope" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//  扩展 NXHTable组件
import NXHTable from '@/components/NXHTable/index'
export default {
  name: 'NXHTableExtends',
  extends: NXHTable,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    spanMethod: {
      type: Function,
      default: null
    },
    defaultSlotWidth: {
      type: String,
      default: 'auto'
    },
    defaultSlotLabel: {
      type: String,
      default: 'Modify'
    },
    refreshKey: {
      type: Number,
      default: Math.random()
    }
  },
  methods: {
    getMinWidth(column) {
      if (column.custom) {
        return column.fixedWidth
      } else {
        return column.width
      }
    },
    handleCellDoubleClick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .nxh-table-cell-class {
  border-bottom: unset !important;
  height: 43px;
  line-height: 43px;
}

::v-deep .nxh-table-header-class {
  border-bottom: unset !important;
  background: #f9f9f9;
  height: 46px;
}

::v-deep .warning-row {
  background: oldlace;
}

::v-deep .success-row {
  background: #f0f9eb;

}
::v-deep .el-table .cell {
  word-break: keep-all !important;
  padding-left: 5px !important;
  padding-right: 5px !important;
}

::v-deep .el-table th > .cell {
  padding-left: 5px;
  padding-right: 5px;
}

::v-deep .el-table-column--selection.is-leaf .el-checkbox{
  //display:none
}
</style>
