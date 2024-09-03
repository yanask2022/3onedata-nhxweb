<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Port Config" name="portConfig">
        <div class="content-container">
          <el-row :gutter="40">
            <el-col :span="24">
              <div class="title">
                <h1 class="panel-title">
                  Settings
                </h1></div>
              <div class="dhcp-client-list-table-container">
                <!--<div class="dhcp-client-list-table-header">-->
                <!--  <span>Total Clients:1</span>-->
                <!--  <div style="font-size: 24px;display: flex;align-items: center">-->
                <!--    <i class="el-icon-refresh" />-->
                <!--    <span style="font-size: 12px; margin-left: 5px">刷新</span>-->
                <!--  </div>-->
                <!--</div>-->
                <div class="dhcp-client-list-table">
                  <el-table
                    :data="portConfigData.tableData"
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    border
                  >
                    <el-table-column
                      prop="Port"
                      header-align="center"
                      align="center"
                      label="Port"
                    />

                    <el-table-column
                      prop="Flow_Control"
                      header-align="center"
                      align="center"
                      label="Flow Control"
                    >
                      <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.Flow_Control" label="Enable" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="Negotiation_Mode"
                      header-align="center"
                      align="center"
                      label="Negotiation Mode"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.Negotiation_Mode" size="mini">
                          <el-option
                            v-for="item in portConfigData.negotiationOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div>
                <el-button size="mini" class="margin-top-20">Save</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Port Status" name="portStatus">
        <div class="content-container">
          <el-row :gutter="40">
            <el-col :span="24">
              <div class="title">
                <h1 class="panel-title">
                  Status List
                </h1>
              </div>

              <div class="dhcp-client-list-table-container">

                <div class="dhcp-client-list-table">
                  <el-table
                    :data="portStatusConfig.tableData"
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    border
                  >
                    <el-table-column
                      prop="Port"
                      header-align="center"
                      align="center"
                      label="Port"
                    />
                    <el-table-column
                      prop="status"
                      header-align="center"
                      align="center"
                      label="Status"
                    />
                    <el-table-column
                      prop="speed"
                      header-align="center"
                      align="center"
                      label="Speed(Mbps)"
                    />
                    <el-table-column
                      prop="DuplexMode"
                      header-align="center"
                      align="center"
                      label="DuplexMode"
                    />
                    <el-table-column
                      prop="Flow_Control"
                      header-align="center"
                      align="center"
                      label="Flow Control"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.Flow_Control == 'none'">---</span>
                        <div v-else>
                          <span v-if="scope.row.Flow_Control">enabled</span>
                          <span v-else="scope.row.Flow_Control">disabled</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div>
                <el-button size="mini" class="margin-top-20">Refresh</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SWITCH',
  data() {
    return {
      activeName: 'portConfig',
      portConfigData: {
        tableData: [
          { Port: 'Port1', Flow_Control: false, Negotiation_Mode: 0 },
          { Port: 'Port2', Flow_Control: true, Negotiation_Mode: 2 },
          { Port: 'Port3', Flow_Control: false, Negotiation_Mode: 3 }
        ],
        negotiationOptions: [
          { label: 'auto', value: 0 },
          { label: '10M Half-duplex', value: 1 },
          { label: '10M Full-duplex', value: 2 },
          { label: '100M Half-duplex', value: 3 },
          { label: '100M Full-duplex', value: 4 }
        ]
      },
      portStatusConfig: {
        tableData: [
          // TODO DuplexMode 使用Filter
          { Port: 'Port1', status: 'link up', speed: '100', DuplexMode: '100M Full-duplex', Flow_Control: false },
          { Port: 'Port2', status: 'link down', speed: '200', DuplexMode: '100M Full-duplex', Flow_Control: true },
          { Port: 'Port3', status: 'link down', speed: '200', DuplexMode: '---', Flow_Control: 'none' },
          { Port: 'Port4', status: 'link up', speed: '200', DuplexMode: 'auto', Flow_Control: false },
          { Port: 'Port5', status: 'link up', speed: '123200129', DuplexMode: '10M Full-duplex', Flow_Control: false }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>

@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.dhcp-client-list-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 10px;

  .dhcp-client-list-table-header {
    width: 100%;
    display: flex;
    padding: 20px 0;
    font-size: 12px;
    align-items: center;
    justify-content: space-between;
  }
}

.two-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 12px;

  .two-grid-cell {
    width: 100%;
    height: 30px;
    padding: 10px 5px;
    display: flex;
    align-items: center;
  }
}

.three-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 12px;

  .grid-cell {
    width: 100%;
    height: 40px;
    padding: 10px 5px;
    display: flex;
    align-items: center;
  }
}

.my-el-radio {
  margin-right: 100px;
}

.my-el-radio:first-child {
  margin-left: 40px;
}

.second-wrapper {

}

.title {
  h3 {
    color: $primary-color;
    font-size: 12px;
    padding: 8px 0 8px 15px;
    background: #F0F0F0;
    font-weight: normal;
  }

  margin-bottom: 8px;
}

.first-wrapper {
  display: flex;
  flex-direction: column;

  .operator {
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .op-line {
      height: 52px;
      width: 100%;
      display: flex;

      &-left {
        height: 100%;
        width: 130px;
        display: flex;
        align-items: center;
      }

      &-right {
        display: flex;
        align-items: center;
        flex: 1;
        height: 100%;
      }
    }
  }

  .note {
    display: flex;
    font-size: 12px;
    flex-direction: column;
  }
}

.network-interface {
  height: 100%;
  width: 640px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  //justify-content: space-around;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 100px;

    &-title {
      font-size: 12px;
      margin-bottom: 5px;
    }

    &-icon {
      height: 15px;
      width: 15px;
    }
  }
}

</style>
