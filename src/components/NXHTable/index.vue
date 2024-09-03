<template>
  <div>
    <el-table
      ref="mTable"
      :border="true"
      :data="tableData"
      :stripe="false"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        :resizable="false"
        v-if="selection"
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
        :min-width="column.width"
        :fixed="getFixed(column)"
        :label="column.label"
        header-align="center"
        align="center"
      />
      <el-table-column
        v-if="!!$scopedSlots.default"
        fixed="right"
        :resizable="false"
        header-align="center"
        label="Modify"
        width="180"
        align="center"
      >
        <template slot-scope="props">
          <slot name="default" :value="props.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'NXHTable',
  props: {
    // 单选
    radio: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object,
      default: null
    },
    minWidth: {
      type: Number,
      default: 80
    },
    columns: {
      type: Array
    },
    tableData: {
      type: Array
    }
  },
  watch: {
    selection() {
      this.$refs.mTable.clearSelection()
    },
    // 需求： 表头宽度为当前列最小宽度. 当内容宽度比表头宽时， 内容撑开当前列
    tableData(newData) {
      this.columns.map((item, index) => {
        // 设置表头宽度
        item['width'] = this.renderWidth(item.label)
        if (item['sortable'] === true) {
          item['width'] = item['width'] + 10
        }
        // 遍历新数据
        if (this.tableData.length > 0) {
          newData.map((dataItem) => {
            if (dataItem[item.prop]) {
              const dataWidth = this.renderWidth(dataItem[item.prop])
              if (dataWidth > item.width) {
                item.width = dataWidth
                if (item['sortable'] === true) {
                  item['width'] = item['width'] + 10
                }
              }
              // 如果表头宽度实际渲染宽度大于内容实际渲染宽度，将列宽设置为固定宽度
              // 否则， 将列宽设置为内容所占百分比
              // if (item.width > dataWidth) {
              //   item.maxWidth = item.width
              //   item.width = ''
              //   console.log(item.prop + '使用固定宽度： ' + item.maxWidth)
              // } else {
              //   item.width = dataWidth
              //   item.maxWidth = ''
              // }
            }
          })
        }
      })
    }
  },
  created() {
    // 表格数据不更新时， watch 不执行
    this.columns.map((item, index) => {
      // 设置表头宽度
      item['width'] = this.renderWidth(item.label)
      if (item['sortable'] === true) {
        item['width'] = item['width'] + 10
      }
      // 遍历新数据
      if (this.tableData.length > 0) {
        this.tableData.map((dataItem) => {
          if (dataItem[item.prop]) {
            const dataWidth = this.renderWidth(dataItem[item.prop])
            if (dataWidth > item.width) {
              item.width = dataWidth
              if (item['sortable'] === true) {
                item['width'] = item['width'] + 10
              }
            }
          }
        })
      }
    })
  },
  mounted() {
  },
  methods: {
    doLayout() {
      this.$refs.mTable.doLayout()
    },
    toggleRowSelection(row, selected) {
      this.$refs.mTable.toggleRowSelection(row, selected)
    },
    handleSelectionChange(val) {
      if (this.selection === true) {
        this.$emit('selection-change', val)
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.highlight && row.highlight == 'warning') {
        return 'warning-row'
      } else if (row.highlight && row.highlight == 'success') {
        return 'success-row'
      }
      return ''
    },
    getFixed(item) {
      if (item.fixed) {
        return item.fixed
      } else {
        return false
      }
    },
    renderWidth(label) {
      let realWidth = 0
      const span = document.createElement('span')
      span.innerText = label
      span.style.fontSize = '14px'
      // 解决遇到括号等特殊字符可会换行而不能正确计算宽度
      span.style.display = 'inline-block'
      document.body.appendChild(span)
      // 20: element 样式设置的padding， 2: width 有小数时的余量
      // realWidth = span.getBoundingClientRect().width + 12 + 2
      realWidth = span.clientWidth + 12
      document.body.removeChild(span)
      return realWidth
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
