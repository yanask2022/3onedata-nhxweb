<template>
  <div class="root">
    <br>
    <el-card shadow="never">
      <div slot="header" class="header-wrapper">
        <span>pforwards</span>
        <el-button class="reset-btn" size="small" @click="addPortForward">
          ADD PForward
        </el-button>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          ref="tableRef"
          :selection="false"
          :table-data="tableData"
          :columns="columns"
          default-slot-width="170"
          default-slot-label="Actions"
        >
          <template v-slot:default="{ scope }">
            <div class="item-actions">
              <el-button type="primary" @click="onEdit(scope.row)">Edit</el-button>
              <el-button type="warning" @click="onDelete(scope.row)">Delete</el-button>
            </div>
          </template>
        </NXHTableExtends>
      </div>
    </el-card>
  </div>
</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { mapGetters } from 'vuex'
import { delPForward } from '@/api/network'
export default {
  name: 'PortForwardsTab',
  components: {
    NXHTableExtends
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        { label: 'name', prop: 'name' },
        // { label: 'target', prop: 'target' },
        { label: 'src', prop: 'src' },
        { label: 'dest', prop: 'dest' },
        { label: 'proto', prop: 'proto' },
        { label: 'src_dport', prop: 'src_dport' },
        { label: 'dest_ip', prop: 'dest_ip' },
        { label: 'dest_port', prop: 'dest_port' },
        { label: 'enabled', prop: 'enabled' }
      ]
    }
  },
  computed: {
    ...mapGetters(['portForwards']),
    tableData() {
      return this.portForwards.map(item => {
        if (item.enabled === 0 || item.enabled === '0') {
          item['highlight'] = 'warning'
        }
        return item
      })
    }
  },
  watch: {
    isActive(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          this.$refs.tableRef.doLayout()
        })
      }
    }
  },
  methods: {
    addPortForward() {
      this.$router.push({
        name: 'PortForwardsEdit',
        params: { isNew: true }
      })
    },
    onEdit(row) {
      if (row.highlight) {
        delete row['highlight']
      }
      this.$router.push({
        name: 'PortForwardsEdit',
        params: { ...row }
      })
    },
    onDelete(row) {
      delPForward(row.index).then(res => {
        this.$store.dispatch('configs/getPortForwards', true).then(() => {})
        this.$message({ message: 'Delete success', type: 'success' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-button--mini {
  color: #FFFFFF !important;
}
.header-wrapper {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.reset-btn {
  background-color: #4a90e2;
  color: #ffffff;
}
</style>
