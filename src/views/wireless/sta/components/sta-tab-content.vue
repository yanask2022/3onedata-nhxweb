<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>VAP Config</span>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          ref="tableRef"
          :default-sort="{prop: 'priority', order: 'descending'}"
          :table-data="tableData"
          :columns="columns"
          default-slot-width="280"
        >
          <!--<template v-slot:priority="{ scope }">-->
          <!--  <span>{{ scope.$index + 1 }}</span>-->
          <!--</template>-->
          <template v-slot:default="{scope}">
            <div>
              <el-button type="info" :disabled="scope.$index == 0" @click="moveUp(scope.row, scope.$index)">MoveUp</el-button>
              <el-button type="warning" :disabled="(scope.$index + 1) == tableData.length" @click="moveDown(scope.row, scope.$index)">MoveDown</el-button>
              <el-button type="primary" @click="onRowEdit(scope.row, scope.$index)">Edit</el-button>
              <!--              <el-button type="danger" @click="onRowDel(scope.row)">Delete</el-button>-->
            </div>
          </template>
        </NXHTableExtends>

      </div>
    </el-card>
    <br>

    <!--    <el-card-->
    <!--      shadow="never">-->
    <!--      <template slot="header">-->
    <!--        <div class="header-wrapper">-->
    <!--          <span>AP List</span>-->
    <!--          <el-button type="primary" @click="onScan">Scan</el-button>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--      <div class="card-panel-editable-content-wrapper" style="width: 100%">-->
    <!--        -->
    <!--        <STA-Table-->
    <!--          :table-data="APTableData"-->
    <!--          :defaultSort="{prop: 'signal', order: 'descending'}"-->
    <!--          lastColumnLabel="Operation"-->
    <!--          :columns="APColumns">-->
    <!--          <template v-slot:default="{value}">-->
    <!--            <div>-->
    <!--              <el-button type="primary" @click="onAPJoin(value)">Join Network</el-button>-->
    <!--            </div>-->
    <!--          </template>-->
    <!--        </STA-Table>-->
    <!--      </div>-->
    <!--    </el-card>-->

  </div>
</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { setSta } from '@/api/wifi'
import { mapGetters } from 'vuex'
import * as _ from 'lodash'
import { extractNumberFromString } from '@/utils'

export default {
  name: 'STATabContent',
  components: {
    NXHTableExtends
  },
  props: {
    radioKey: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    freq: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      /**
       * 从左到右
       * priority
       * ifname
       * disabled
       * ssid
       * bssid
       * encryption
       * device
       * 11K
       * 11V
       * wds
       * staDFSEn
       * :default-sort="{prop: 'priority', order: 'ascending'}"
       */
      columns: [
        // { label: 'ssid', prop: 'ssid', fixed: 'left', minWidth: 98 },
        // { label: 'priority', prop: 'priority', sortable: true, fixed: 'right', custom: false },
        { label: 'wifi-iface', prop: 'paramsKey' },
        { label: 'device', prop: 'device' },
        { label: 'ifname', prop: 'ifname', fixed: 'left' },
        { label: 'disabled', prop: 'disabled' },
        { label: 'ssid', prop: 'ssid' },
        { label: 'bssid', prop: 'bssid' },
        { label: 'encryption', prop: 'encryption' },
        { label: 'network', prop: 'network' },
        { label: '11K', prop: 'wnm' },
        { label: '11V', prop: 'rrm' },
        { label: 'wds', prop: 'wds' },
        { label: 'staDFSEn', prop: 'staDFSEn' }
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
    ...mapGetters([
      'wifi'
    ]),
    paramsKey() {
      let key = ''
      const radioKeyEndNumber = extractNumberFromString(this.radioKey)
      Object.entries(this.wifi).filter(wifiConfig => {
        // find sta config
        return wifiConfig[0].startsWith('sta')
      }).map(staConfig => {
        // find config.device end number same with radioKey
        if (Array.isArray(staConfig[1]) && staConfig[1].length > 0) {
          const oneOfStaConfigNumber = extractNumberFromString(staConfig[1][0].device)
          if (oneOfStaConfigNumber === radioKeyEndNumber) {
            key = staConfig[0]
          }
        }
      })
      return key
    },
    // paramsKey() {
    //   let key = ''
    //   switch (this.name) {
    //     case 'STA_2GHz':
    //       key = 'sta0'
    //       break
    //     case 'STA_5GHz1':
    //       key = 'sta1'
    //       break
    //     case 'STA_5GHz2':
    //       key = 'sta2'
    //       break
    //     case 'STA_6GHz':
    //       key = 'sta3'
    //       break
    //   }
    //   return key
    // },
    // scanKey() {
    //   let key = ''
    //   switch (this.name) {
    //     case 'STA_2GHz':
    //       key = 'radio0'
    //       break
    //     case 'STA_5GHz1':
    //       key = 'radio1'
    //       break
    //     case 'STA_5GHz2':
    //       key = 'radio2'
    //       break
    //     case 'STA_6GHz':
    //       key = 'radio3'
    //       break
    //   }
    //   return key
    // },
    tableData() {
      const tableArr = []
      const radioKeyEndNumber = extractNumberFromString(this.radioKey)
      const entries = Object.entries(this.wifi).filter(wifiConfig => {
        // find sta config
        return wifiConfig[0].startsWith('sta')
      }).filter(staConfig => {
        // find config.device end number same with radioKey
        if (Array.isArray(staConfig[1]) && staConfig[1].length > 0) {
          const oneOfStaConfigNumber = extractNumberFromString(staConfig[1][0].device)
          if (oneOfStaConfigNumber === radioKeyEndNumber) {
            return true
          }
        }
        return false
      })
      // flat
      const flattenedArray = entries.reduce((acc, val) => acc.concat(val[1]), [])
      // console.log(flattenedArray)
      flattenedArray.forEach(element => {
        tableArr.push({
          ...element,
          highlight: element.disabled == '1' ? 'warning' : '',
          paramsKey: entries[0][0],
          scanParams: {
            scanKey: this.radioKey
          }})
      })

      return tableArr
      // if (!this.wifi || !this.wifi[this.paramsKey]) {
      //   return []
      // }
      // const { radio0, radio1 } = this.wifi
      // var scanValue_2 = "wifi0"
      // var scanValue_5 = "wifi1"

      // if (radio0) {
      //   scanValue_2 = radio0.freq === '5G' ? 'wifi1' : 'wifi0'
      // }

      // if (radio1) {
      //   if (!radio0)
      //     scanValue_5 = "wifi0"
      //   else
      //     scanValue_5 = radio1.freq === '5G' ? 'wifi1' : 'wifi0'
      // }

      // let scanValue = ''
      // switch (this.name) {
      //   case 'STA_2GHz':
      //     scanValue = scanValue_2
      //     break
      //   case 'STA_5GHz1':
      //     scanValue = scanValue_5
      //     break
      //   case 'STA_5GHz2':
      //     scanValue = 'wifi2'
      //     break
      //   case 'STA_6GHz':
      //     scanValue = 'wifi3'
      //     break
      // }
      // return this.wifi[this.paramsKey].reduce((acc, item) => {
      //   acc.push({
      //     ...item,
      //     paramsKey: this.paramsKey,
      //     highlight: item.disabled == '1' ? 'warning' : '',
      //     scanParams: {
      //       scanKey: this.scanKey,
      //       scanValue: scanValue
      //     }
      //   })
      //   return acc
      // }, [])
    }
  },

  methods: {
    moveUp(row, index) {
      if (index > 0) {
        const reOrderTableData = _.cloneDeep(this.tableData)
        const upData = reOrderTableData[index]
        reOrderTableData.splice(index, 1)
        reOrderTableData.splice((index - 1), 0, upData)
        this.postPriority(reOrderTableData)
      }
    },
    moveDown(row, index) {
      if ((index) === this.tableData.length) {
        // 最后一条
      } else {
        const reOrderTableData = _.cloneDeep(this.tableData)
        const downData = reOrderTableData[index]
        reOrderTableData.splice(index, 1)
        reOrderTableData.splice(index + 1, 0, downData)
        this.postPriority(reOrderTableData)
      }
    },
    postPriority(data) {
      const param = {}
      const loading = this.$loading({
        lock: true,
        text: 'Please wait',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      param[`${this.paramsKey}`] = data
      setSta(param).then(res => {
        loading.close()
        this.$store.dispatch('configs/getWifi', true).then(() => {
          loading.close()
        })
      }).catch(res => {
        loading.close()
        this.$message.error(res)
      })
    },
    onRowEdit(item, index) {
      this.$router.push({
        name: 'STAAPEdit',
        params: { scanParams: item.scanParams, frequencyName: this.label, index: index, paramsKey: item.paramsKey, STAAPTabName: this.name }
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-button {
  color: #FFFFFF;
}

.header-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between
}

::v-deep .el-card__body {
  //padding: 0;
}
</style>
