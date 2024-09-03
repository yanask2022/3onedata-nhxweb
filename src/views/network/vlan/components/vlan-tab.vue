<template>
  <div class="root">
    <el-card
      shadow="never"
    >
      <div slot="header">
        <div class="header-wrapper">
          <span>Vlan Config</span>
          <el-button class="reset-btn" size="small" @click="onAdd">
            ADD NEW VLAN
          </el-button>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          :span-method="arraySpanMethod"
          default-slot-width="160"
          :table-data="tableData"
          :columns="columns"
        >
          <template v-slot:default="{scope}">
            <div>
              <el-button type="primary" @click="onRowEdit(scope.row)">Edit</el-button>
              <el-button type="danger" @click="onRowDel(scope.row)">Delete</el-button>
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
import { vlan_delete } from '@/api/vlan'
export default {
  name: 'VlanTab',
  components: {
    NXHTableExtends
  },
  data() {
    return {
      // name vid ifname mode type IPv4 address IPv4 netmask
      columns: [
        { label: 'name', prop: 'name' },
        { label: 'vid', prop: 'vid' },
        { label: 'ifname', prop: 'ifname' },
        // { label: 'mode', prop: 'mode' },
        { label: 'type', prop: 'type' },
        { label: 'IPv4 address', prop: 'ipv4addr' },
        { label: 'IPv4 netmask', prop: 'netmask' }
      ],
      tableData: [
        // { name: 'test', vid: 1, ifname: 'ath0', mode: 'Trunk', type: '-', ipv4addr: '192.168.1.20', netmask: '255.255.255.0' },
        // { name: 'test', vid: 1, ifname: 'ath1', mode: 'Access', type: '-', ipv4addr: '192.168.1.21', netmask: '255.255.255.0' },
        // { name: 'test', vid: 1, ifname: 'ath2', mode: 'Access', type: '-', ipv4addr: '192.168.1.22', netmask: '255.255.255.0' },
        // { name: 'test', vid: 1, ifname: 'ath3', mode: 'Trunk', type: '-', ipv4addr: '192.168.1.22', netmask: '255.255.255.0' },
        // { name: 'test', vid: 2, ifname: 'ath4', mode: 'Access', type: '-', ipv4addr: '192.168.1.24', netmask: '255.255.255.0' },
        // { name: 'test', vid: 2, ifname: 'ath5', mode: 'Trunk', type: '-', ipv4addr: '192.168.1.24', netmask: '255.255.255.0' },
        // { name: 'test', vid: 3, ifname: 'ath6', mode: 'Access', type: '-', ipv4addr: '192.168.1.24', netmask: '255.255.255.0' }
      ],
      rowIndexArr: []
    }
  },

  computed: {
    ...mapGetters(['vlan', 'originalVlan'])
  },
  mounted() {
    this.$store.dispatch('configs/getVLan').then(() => {
      const tempData = []
      Object.keys(this.vlan).forEach(key => {
        tempData.push({ ...this.vlan[key] })
      })

      this.tableData = tempData
      this.fillRowIndex()
    })
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: 'VLanEdit',
        params: { isNew: true }
      })
    },
    fillRowIndex(arr) {
      this.tableData.reduce((previousValue, currentValue, currentIndex) => {
        if (previousValue === -1 || previousValue !== currentValue.vid) {
          this.rowIndexArr.push(currentIndex)
        }
        return currentValue.vid
      }, -1)
      this.rowIndexArr.push(this.tableData.length)
    },
    onRowDel(row) {
      this.$confirm('Confirm Delete  VLAN: ' + row.name + '?', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].vid === row.vid) {
            await vlan_delete({
              name: row.name
            }).then(() => {
              this.tableData.splice(i, 1)
              i--
            })
          }
        }
        this.rowIndexArr = []
        this.fillRowIndex()
      })
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // magic number: 6, 合并的第几列
      if (columnIndex === 6) {
        if (this.rowIndexArr.includes(rowIndex)) {
          return {
            rowspan: this.rowIndexArr[this.rowIndexArr.indexOf(rowIndex) + 1] - rowIndex,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    onRowEdit(row) {
      this.$router.push({
        name: 'VLanEdit',
        params: { ...row, isNew: false }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.highlight {
  background: #8ebdf5 !important;
}
::v-deep .el-button {
  color: #FFFFFF;
}
.reset-btn {
  background-color: #4a90e2;
  color: #ffffff;
}

.header-wrapper {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
</style>
