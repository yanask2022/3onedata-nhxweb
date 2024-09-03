<template>
  <div class="root">
    <el-card
      shadow="never"
    >
      <div slot="header">
        <div class="header-wrapper">
          <span>Ethernet port status</span>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          :table-data="tableData"
          :columns="columns"
          default-slot-width="150"
          default-slot-label="Actions"
        >
          <template v-slot:default="{scope}">
            <div>
              <el-button type="info" :disabled="scope.$index == 0" @click="moveUp(scope.row, scope.$index)">up</el-button>
              <el-button type="warning" :disabled="(scope.$index + 1) == tableData.length" @click="moveDown(scope.row, scope.$index)">down</el-button>
            </div>
          </template>
        </NXHTableExtends>
      </div>

    </el-card>
  </div>
</template>
<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
export default {
  name: 'StatusTab',
  components: {
    NXHTableExtends
  },
  data() {
    return {
      columns: [
        { label: 'ifname', prop: 'ifname' },
        { label: 'Port', prop: 'port' },
        { label: 'Link', prop: 'link' },
        { label: 'Mac', prop: 'mac' },
        { label: 'pvid', prop: 'pvid' },
        { label: 'RxByte', prop: 'rxbyte' },
        { label: 'TxByte', prop: 'txbyte' },
        { label: 'RxMulti', prop: 'rxmulti' },
        { label: 'TxMulti', prop: 'txmulti' },
        { label: 'RxUniCast', prop: 'rxunicast' },
        { label: 'TxUniCast', prop: 'txunicast' },
        { label: 'RxBroad', prop: 'rxbroad' },
        { label: 'TxBroad', prop: 'txbroad' }
      ],
      tableData: [
        { ifname: 'ath5', port: '80', link: 'lan', mac: '00:00:00:00:00', pvid: '127', rxbyte: '22/ms', txbyte: '22/ms', rxmulti: '20',txmulti: '10', rxunicast: '4', txunicast: '2',rxbroad: '99', txbroad: '88' },
        { ifname: 'ath5', port: '80', link: 'lan', mac: '00:00:00:00:00', pvid: '127', rxbyte: '22/ms', txbyte: '22/ms', rxmulti: '20',txmulti: '10', rxunicast: '4', txunicast: '2',rxbroad: '99', txbroad: '88' },
        { ifname: 'ath5', port: '80', link: 'lan', mac: '00:00:00:00:00', pvid: '127', rxbyte: '22/ms', txbyte: '22/ms', rxmulti: '20',txmulti: '10', rxunicast: '4', txunicast: '2',rxbroad: '99', txbroad: '88' },
        { ifname: 'ath5', port: '80', link: 'lan', mac: '00:00:00:00:00', pvid: '127', rxbyte: '22/ms', txbyte: '22/ms', rxmulti: '20',txmulti: '10', rxunicast: '4', txunicast: '2',rxbroad: '99', txbroad: '88' },
      ]
    }
  },
  mounted() {
  },
  methods: {
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
