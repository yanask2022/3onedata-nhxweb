<template>
  <div class="root">
    <br>
    <el-card shadow="never">
      <div slot="header" class="header-wrapper">
        <span>redirect</span>
        <el-button class="reset-btn" size="small" @click="addRedirect">
          ADD Redirect
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
import { delRedirect } from '@/api/network'
export default {
  name: 'RedirectTab',
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
        { label: 'enabled', prop: 'enabled' },
        { label: 'proto', prop: 'proto' },
        { label: 'src_ip', prop: 'src_ip' },
        { label: 'src_dport', prop: 'src_dport' },
        { label: 'dest_ip', prop: 'dest_ip' },
        { label: 'dest_port', prop: 'dest_port' },
        { label: 'target', prop: 'target' },
        { label: 'src', prop: 'src' },
        { label: 'dest', prop: 'dest' }
      ]
    }
  },
  computed: {
    ...mapGetters(['redirect']),
    tableData() {
      return this.redirect.map(item => {
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
    addRedirect() {
      this.$router.push({
        name: 'RedirectEdit',
        params: { isNew: true }
      })
    },
    onEdit(row) {
      if (row.highlight) {
        delete row['highlight']
      }
      this.$router.push({
        name: 'RedirectEdit',
        params: { ...row }
      })
    },
    onDelete(row) {
      delRedirect(row.index).then(res => {
        this.$store.dispatch('configs/getRedirects', true).then(() => {})
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
