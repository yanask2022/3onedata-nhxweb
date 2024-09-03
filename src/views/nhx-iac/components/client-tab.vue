<template>
  <div>

    <div class="card-panel-editable-content-wrapper" style="width: 100%">
      <div class="buttons-wrapper">
        <div class="left">
          <el-input v-model="keyword" placeholder="ADDR,CHAN" size="mini" suffix-icon="el-icon-search" class="class2" />
        </div>
        <div class="right">
          <div class="opt-wrapper">
            <div>
              <el-button type="danger" size="small" @click="onDeleteSelected">Delete</el-button>
              <!-- <i class="el-icon-remove icon-holder" />
              <span class="icon-text">Delete</span> -->
            </div>
          </div>
        </div>
      </div>

      <NXHTableExtends
          :selection="false"
          :table-data="tableData"
          :columns="columns">
      </NXHTableExtends>

      <div class="pagination-container">
        <el-pagination
          background
          :current-page="currentPage"
          :pager-count="5"
          :page-sizes="[10, 15, 20, 30,50,100]"
          :page-size="pageSize"
          layout=" total,  sizes,  prev, pager, next,jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>
</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { get_assoclist } from '@/api/ac'
import { get_info } from '@/api/system'
import { secondsToDhms } from '@/utils'
import { get_runtimes } from '@/api/wan'

export default {
  name: 'RouterAdminV2Clienttab',
  components: {
    NXHTableExtends,
  },
  data() {
    return {
      intervalIds: [],
      Selection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      keyword: '',
      totalData: [],
      tableData: [
      ],
      columns: [
        {
          label: 'AP ID',
          prop: 'id',
          fixed: 'left'
        },
        {
          label: 'vap_ifname',
          prop: 'ifname'
        },
        {
          label: 'wifi-iface',
          prop: 'name'
        },
        {
          label: 'network',
          prop: 'network'
        },
        {
          label: 'client_macaddr',
          prop: 'client_macaddr'
        },
        {
          label: 'channel',
          prop: 'channel'
        },
        {
          label: 'tx_rate',
          prop: 'tx_rate'
        },
        {
          label: 'rx_rate',
          prop: 'rx_rate'
        },
        {
          label: 'signal',
          prop: 'signal'
        },
        {
          label: 'noise',
          prop: 'noise'
        },
        {
          label: 'ipaddrs',
          prop: 'ipaddrs'
        },
        {
          label: 'ip6addrs',
          prop: 'ip6addrs'
        }
      ]
    }
  },

  mounted() {
    get_assoclist({}).then(res => {
      res.assoclist.forEach(parent => {
        if (!parent.assoclist) {
          return
        }
        const childAssoclistKeys = Object.keys(parent.assoclist)
        if (childAssoclistKeys.length > 0) {
          childAssoclistKeys.forEach(childKey => {
            const child = parent.assoclist[childKey]
            const rv = {}
            rv['id'] = parent.id
            rv['ifname'] = parent.ifname
            rv['name'] = parent.name
            rv['network'] = parent.network
            rv['channel'] = parent.channel
            rv['client_macaddr'] = childKey
            rv['tx_rate'] = child.tx_rate
            rv['rx_rate'] = child.rx_rate
            rv['signal'] = child.signal
            rv['noise'] = child.noise
            rv['ipaddrs'] = child.ipaddrs
            rv['ip6addrs'] = child.ip6addrs
            this.totalData.push(rv)
          })
          this.total = this.totalData.length
          this.updateTableData()
        }
      })
    })

    // this.intervalIds.push(setInterval(() => {
    //   this.tableData = []
    //   get_assoclist({}).then(res => {
    //     res.assoclist.forEach(parent => {
    //       if (!parent.assoclist) {
    //         return
    //       }
    //       const childAssoclistKeys = Object.keys(parent.assoclist)
    //       if (childAssoclistKeys.length > 0) {
    //         childAssoclistKeys.forEach(childKey => {
    //           const child = parent.assoclist[childKey]
    //           const rv = {}
    //           rv['id'] = parent.id
    //           rv['ifname'] = parent.ifname
    //           rv['name'] = parent.name
    //           rv['network'] = parent.network
    //           rv['channel'] = parent.channel
    //           rv['client_macaddr'] = childKey
    //           rv['tx_rate'] = child.tx_rate
    //           rv['rx_rate'] = child.rx_rate
    //           rv['signal'] = child.signal
    //           rv['noise'] = child.noise
    //           rv['ipaddrs'] = child.ipaddrs
    //           rv['ip6addrs'] = child.ip6addrs
    //           this.tableData.push(rv)
    //         })
    //       }
    //     })
    //   })
    // }, 5000))
  },

  beforeDestroy() {
    // this.intervalIds.forEach(id => {
    //   clearInterval(id)
    // })
  },
  methods: {
    earnItem(e) {
      this.Selection = e
    },
    onDeleteSelected() {
      console.log('1')
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.updateTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.updateTableData()
    },
    updateTableData() {
      const start = this.currentPage * this.pageSize - this.pageSize
      const end = this.currentPage * this.pageSize
      this.tableData = []
      this.tableData = this.totalData.slice(start, end)
    }
  }
}

</script>

<style lang="scss" scoped>

  .pagination-container {
    background: #fff;
    padding: 32px 0;
  }

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
      i {
        color: red;
      }

      span {
        color: red;
      }
    }
  }

</style>
