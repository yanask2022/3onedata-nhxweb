<template>
  <div>
    <el-table
      :default-sort="defaultSort"
      :render-header="renderHeader"
      :border="true"
      :data="tableData"
      :stripe="false"
      :row-class-name="tableRowClassName"
      style="max-width: 100%"
      @selection-change="handleSelectionChange"
    >
      <af-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :fixed="getFixed(column)"
        header-align="center"
        :min-width="getMinWidth(column)"
        align="center"
        :label="column.label"
      />
      <el-table-column
        v-if="!!$scopedSlots.default"
        fixed="right"
        header-align="center"
        :label="lastColumnLabel"
        min-width="180"
        align="center"
      >
        <template slot-scope="props">
          <slot name="default" :value="props.row"/>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>

export default {
  name: 'STATable',
  props: {
    defaultSort: {
      type: Object,
      default: null
    },
    lastColumnLabel: {
      type: String,
      default: 'Modify'
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
  data() {
    return {
      child2: 'child2'
    }
  },

  watch: {
    tableData() {
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  },
  mounted() {
  },
  methods: {
    handleSelectionChange(event) {

      // this.$emit('selection-change', event)
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.highlight && row.highlight == 'warning') {
        return 'warning-row'
      } else if (row.highlight && row.highlight == 'success') {
        return 'success-row'
      }
      return ''
    },
    getMinWidth(item) {
      if (item.fixed) {
        return item.minWidth
      } else {
        return this.minWidth
      }
    },
    getFixed(item) {
      if (item.fixed) {
        return item.fixed
      } else {
        return false
      }
    },
    renderHeader(h, { column, $index }) {
      if (column.fixed) {
        return column.minWidth
      }
      let realWidth = 0
      const span = document.createElement('span')
      span.innerText = column.label
      document.body.appendChild(span)
      realWidth = span.getBoundingClientRect().width
      column.minWidth = realWidth
      document.body.removeChild(span)
      return h('span', column.label)
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

</style>
