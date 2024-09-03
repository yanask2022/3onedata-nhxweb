<template>
  <div class="root">
    <el-table
      ref="basic_list"
      :data="selectedRows.data"
      header-cell-class-name="header-class-two"
      cell-class-name="cell-class"
      border
      @select="onBasicListRowSelect"
    >
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
    </el-table>
  </div>

</template>

<script>

export default {
  name: 'BasicTab',
  inject: ['selectedRows'],
  computed: {

  },
  methods: {
    onBasicListRowSelect() {
      // TODO
    }
  }
}
</script>

<style scoped lang="scss">

</style>
