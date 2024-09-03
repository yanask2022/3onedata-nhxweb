<template>
  <div class="root">
    <br>
    <el-card shadow="never">
      <div slot="header" class="header-wrapper">
        <span>Zone</span>
        <!--<el-button class="reset-btn" size="small" >-->
        <!--  ADD ZONE-->
        <!--</el-button>-->
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
              <!--<el-button type="warning" >Delete</el-button>-->
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
import * as _ from 'lodash'
export default {
  name: 'ZoneTab',
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
        { label: 'network', prop: 'network' },
        { label: 'input', prop: 'input' },
        { label: 'output', prop: 'output' },
        { label: 'forward', prop: 'forward' }
        // { label: 'masq', prop: 'masq' },
        // { label: 'mtu_fix', prop: 'mtu_fix' }
      ]
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
  computed: {
    ...mapGetters(['zone']),
    tableData() {
      return Object.keys(this.zone).map(key => {
        const item = _.cloneDeep(this.zone[key])
        item.network = item.network.join(' ')
        return item
      })
    }
  },
  methods: {
    onEdit(row) {
      this.$router.push({
        name: 'ZoneEdit',
        params: { ...row }
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
