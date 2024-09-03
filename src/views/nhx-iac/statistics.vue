<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Statistics" name="statistics">
        <div class="dashboard-editor-container">
          <el-row :gutter="24">
            <el-col :span="6">
              <div class="chart-wrapper">
                <div class="title-bar">Clients Of SSID</div>
                <pie-chart />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="table-wrapper">
                <div class="title-bar">
                  <span>Current Usage - Top APs</span>
                  <div style="display: flex;margin-right: 16px">
                    <div class="tab-btn" :class="{'tab-btn-selected':isSelected}" @click="tabBtnClick(true)">
                      1-5
                    </div>
                    <div
                      class="tab-btn"
                      style="border-left: none"
                      :class="{'tab-btn-selected':!isSelected}"
                      @click="tabBtnClick(false)"
                    >
                      6-10
                    </div>
                  </div>
                </div>
                <div style="flex:1; width: 100%;">
                  <el-table
                    :border="true"
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    :data="currentData"
                    style="width: 100%;height: 100%"
                  >
                    <el-table-column
                      prop="date"
                      label="AP"
                      align="center"
                    />
                    <el-table-column
                      prop="name"
                      align="center"
                      label="Clients"
                    />
                    <el-table-column
                      prop="address"
                      align="center"
                      label="%Clients"
                    >
                      <template slot-scope="props">
                        <div style="width: 70%;margin: 0 auto">
                          <el-progress :percentage="10" color="#4acbd6" />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      align="center"
                      label="Traffic(MB)"
                    />
                    <el-table-column
                      prop="address"
                      align="center"
                      label="%Traffic"
                    >
                      <template slot-scope="props">
                        <div style="width: 70%;margin: 0 auto">
                          <el-progress :percentage="20" color="#00a3df" />
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>

            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <div class="chart-wrapper">
                <div class="title-bar">Quick Look</div>
                <div style="padding: 18px 20px 0 20px;display: flex;flex-direction: column">
                  <div style="display: flex;width: 360px;justify-content: space-between;margin-bottom: 10px;border-bottom: 1px solid #e5e5e5">
                    <div style="display: flex;align-items: center;flex:1">
                      <span style="background: #6dd4de;width: 10px; height: 10px; margin-right: 5px" />
                      <span style="font-size: 12px">Most Active AP:</span>
                    </div>
                    <div style="display: flex;align-items: center;flex:1;flex-direction: column;justify-content: flex-start">
                      <span style="width: 100%;text-align: left; font-size: 12px;text-decoration: underline;cursor: pointer;margin-bottom: 5px">50-C7-BF-00-00-07</span>
                      <div style="width: 100%; display:flex; flex-direction:row; align-items:center; justify-content: flex-start; font-size: 12px;margin-bottom: 5px">
                        <span>Download:</span>
                        <span style="font-weight: bold">3.51 G</span>
                      </div>
                      <div style="width: 100%; display:flex; flex-direction:row; align-items:center; justify-content: flex-start; font-size: 12px;margin-bottom: 5px">
                        <span>Upload:</span>
                        <span style="font-weight: bold">141.68 M</span>
                      </div>
                    </div>
                  </div>
                  <!--Most Active Client:-->
                  <div style="display: flex;width: 360px;justify-content: space-between;margin-bottom: 10px;border-bottom: 1px solid #e5e5e5">
                    <div style="display: flex;align-items: center;flex:1">
                      <span style="background: #f06e77;width: 10px; height: 10px; margin-right: 5px" />
                      <span style="font-size: 12px">Most Active Client:</span>
                    </div>
                    <div style="display: flex;align-items: center;flex:1;flex-direction: column;justify-content: flex-start">
                      <span style="width: 100%;text-align: left; font-size: 12px;text-decoration: underline;cursor: pointer;margin-bottom: 5px">
                        Test_Device_7
                      </span>
                      <div style="width: 100%; display:flex; flex-direction:row; align-items:center; justify-content: flex-start; font-size: 12px;margin-bottom: 5px">
                        <span>Download:</span>
                        <span style="font-weight: bold">3.51 G</span>
                      </div>
                      <div style="width: 100%; display:flex; flex-direction:row; align-items:center; justify-content: flex-start; font-size: 12px;margin-bottom: 5px">
                        <span>Upload:</span>
                        <span style="font-weight: bold">141.68 M</span>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex;width: 360px;justify-content: space-between;margin-bottom: 10px;">
                    <div style="display: flex;align-items: center;flex:1">
                      <span style="background: #ffd52e;width: 10px; height: 10px; margin-right: 5px" />
                      <span style="font-size: 12px">All-time Top Client:</span>
                    </div>
                    <div style="display: flex;align-items: center;flex:1;flex-direction: column;justify-content: flex-start">
                      <!--<span style="width: 100%;text-align: left; font-size: 12px;text-decoration: underline;cursor: pointer;margin-bottom: 5px">50-C7-BF-00-00-07</span>-->
                      <div style="width: 100%; display:flex; flex-direction:row; align-items:center; justify-content: flex-start; font-size: 12px;margin-bottom: 5px">
                        <span>N/A:</span>
                        <!--<span style="font-weight: bold">3.51 G</span>-->
                      </div>
                      <!--<div style="width: 100%; display:flex; flex-direction:row; align-items:center; justify-content: flex-start; font-size: 12px;margin-bottom: 5px">-->
                      <!--  <span>Upload:</span>-->
                      <!--  <span style="font-weight: bold">141.68 M</span>-->
                      <!--</div>-->
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="table-wrapper">
                <div class="title-bar">
                  <span>Recent Activities</span>
                  <div style="display: flex;margin-right: 16px">
                    <div class="tab-btn" :class="{'tab-btn-selected':isSelected}" @click="tabBtnClick(true)">
                      1-5
                    </div>
                    <div
                      class="tab-btn"
                      style="border-left: none"
                      :class="{'tab-btn-selected':!isSelected}"
                      @click="tabBtnClick(false)"
                    >
                      6-10
                    </div>
                  </div>
                </div>
                <div style="flex:1; width: 100%;">
                  <two-line-chart height="305px" />
                </div>
              </div>

            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import PieChart from './components/PieChart'
import TwoLineChart from './components/TwoLineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Statistics',
  components: {
    TwoLineChart,
    PieChart
  },
  data() {
    return {
      activeName: 'statistics',
      currentData: [],
      isSelected: true,
      lineChartData: lineChartData.newVisitis,
      tableData: [{
        date: '50-C7-BF-00-00-07',
        name: '1',
        address: 7655
      }, {
        date: '50-C7-BF-00-00-04',
        name: '1',
        address: 345
      }, {
        date: '50-C7-BF-00-00-0A',
        name: '1',
        address: 34
      }, {
        date: '50-C7-BF-00-00-08',
        name: '1',
        address: 5432
      }, {
        date: '50-C7-BF-00-00-06',
        name: '1',
        address: 321
      }],

      tableData2: [{
        date: '50-C7-BF-00-00-07',
        name: '2',
        address: 35
      }, {
        date: '50-C7-BF-00-00-44',
        name: '3',
        address: 3523
      }, {
        date: '50-C7-BF-00-00-AA',
        name: '4',
        address: 3524
      }, {
        date: '50-C7-BF-00-00-B8',
        name: '2',
        address: 6575
      }, {
        date: '50-C7-BF-00-00-07',
        name: '3',
        address: 3523
      }]
    }
  },
  mounted() {
    this.currentData = this.tableData
  },
  methods: {
    tabBtnClick(selected) {
      this.isSelected = selected
      this.isSelected ? this.currentData = this.tableData : this.currentData = this.tableData2
      // this.$forceUpdate()
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px 32px;
  position: relative;

  .chart-wrapper {
    background: #fff;
    height: 305px;
    width: 400px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e5e5;
  }

  .table-wrapper {
    background: #fff;
    height: 305px;
    width: 100%;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e5e5e5;
  }

  .title-bar {
    padding-left: 10px;
    width: 100%;
    background: #eee;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 40px;
    color: #212121;
    font-weight: bold;
    justify-content: space-between;
  }

  .tab-btn {
    padding: 0 6px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 30px;
    background: #ffffff;
    color: #7d7e80;
    font-size: 14px;
    cursor: pointer
  }

  .tab-btn-selected {
    border-color: #4acbd6;
    background: #4acbd6;
    color: #ffffff;
  }

}

::v-deep .el-progress__text {
  font-size: 12px !important;
}

::v-deep .el-tabs__nav {
  border: unset !important;
}

::v-deep .el-tabs__header {
  border-bottom: 1px solid $primary-color;
  padding-left: 20px
  //.el-tabs__nav {
  //  //border: solid 1px #36444b;
  //  border-bottom: none;
  //}
}

.cell-class {
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center
}

::v-deep .header-class {
color: #000000;
  background-color: #fafafa;
  font-size: 12px;
}

::v-deep .cell-class {
  font-size: 12px;
  color:#000000;
}

::v-deep .el-tabs__item {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  background: $primary-color;
  color: #ffffff;
  margin-left: 1px;
  border-top: solid 1px $primary-color !important;
  border-right: solid 1px $primary-color !important;
  border-left: solid 1px $primary-color !important;
  border-bottom: transparent;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  &.is-active {
    background: #ffffff;
    color: $primary-color;
    //border-top-left-radius: 5px;
    //border-top-right-radius: 5px;
  }
}
</style>
