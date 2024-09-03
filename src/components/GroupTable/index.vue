<template>
  <div>
    <el-table :default-sort="defaultSort" :border="true" :data="tableData"
      style="width: 100%" @cell-dblclick="tableDbEdit">
      <el-table-column  prop="group" label="id" header-align="center" align="center" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.group}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="comment" label="groupName" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.comment}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!!$scopedSlots.default"
        fixed="right"
        header-align="center"
        label="Modify"
        width="380"
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
    // 需求： 表头宽度为当前列最小宽度. 当内容宽度比表头宽时， 内容撑开当前列
    tableData(newData) {
      this.columns.map((item, index) => {
        // 设置表头宽度
        item['width'] = this.renderWidth(item.label)
        // 遍历新数据
        if (this.tableData.length > 0) {
          newData.map((dataItem) => {
            if (dataItem[item.prop]) {
              const dataWidth = this.renderWidth(dataItem[item.prop])
              if (dataWidth > item.width) {
                item.width = dataWidth
              }
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
      // 遍历新数据
      if (this.tableData.length > 0) {
        this.tableData.map((dataItem) => {
          if (dataItem[item.prop]) {
            const dataWidth = this.renderWidth(dataItem[item.prop])
            if (dataWidth > item.width) {
              item.width = dataWidth
            }
          }
        })
      }
    })
  },
  mounted() {
  },
  methods: {
    tableDbEdit(row, column, event) {
      this.showInput = column.property + row.id
      this.oldData[column.property] = row[column.property]
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
      document.body.appendChild(span)
      // 20: element 样式设置的padding， 2: width 有小数时的余量
      realWidth = span.getBoundingClientRect().width + 12 + 2
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
  padding-left: 5px;
  padding-right: 5px;
}

::v-deep .el-table th > .cell {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
