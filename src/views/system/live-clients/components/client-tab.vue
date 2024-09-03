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

      <CLIENT-Table :table-data="tableData" :columns="columns" @changItem="earnItem" />

      <div class="pagination-container">
        <el-pagination
          background
          :current-page="currentPage"
          :pager-count="5"
          :page-sizes="[10, 15, 20, 30,50,100]"
          :page-size="10"
          layout=" total,  sizes,  prev, pager, next,jumper"
          :total="3"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>
</template>

<script>
import CLIENTTable from '@/components/CLIENTTable'
import { get_assoclist } from '@/api/ac'

export default {
  name: 'LiveClientsTab',
  components: {
    CLIENTTable
  },
  data() {
    return {
      Selection: [],
      currentPage: 1,
      keyword: '',
      tableData: [
      ],
      columns: [
        {
          label: 'IPv4-address',
          prop: 'ipv4-address',
          fixed: 'left'
        },
        {
          label: 'MAC-address',
          prop: 'mac-address'
        },
        {
          label: 'Interface',
          prop: 'interface'
        },
        {
          label: 'Network',
          prop: 'network'
        }
      ]
    }
  },

  mounted() {
    // TODO 这里的数据来源未知(可能不应该用 get_assoclist 接口)
    get_assoclist({}).then(res => {
      for (var i = 0; i < res.assoclist.length; i++) {
        var b_exist = false
        var rv = {}
        for (const key in res.assoclist[i].assoclist) {
          b_exist = true
          rv['macaddr'] = key
          rv['name'] = res.assoclist[i].name
          rv['id'] = res.assoclist[i].id
          rv['channel'] = res.assoclist[i].channel
          rv['noise'] = res.assoclist[i].assoclist[key].noise
          rv['signal'] = res.assoclist[i].assoclist[key].signal
          rv['tx_rate'] = res.assoclist[i].assoclist[key].tx_rate
          rv['rx_rate'] = res.assoclist[i].assoclist[key].rx_rate
        }

        if (b_exist) {
          this.tableData.push(rv)
        }
      }

      console.log(this.tableData)
    })
  },

  methods: {
    earnItem(e) {
      this.Selection = e
    },
    onDeleteSelected() {
      console.log('1')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
