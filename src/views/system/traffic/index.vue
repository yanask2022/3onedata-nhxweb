<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Interface Statistics" name="first">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Statistics List
              </h1>
              <!-- 操作按钮-->
              <div class="opt-wrapper">
                <div class="opt-item">
                  <i class="el-icon-remove icon-holder" />
                  <span class="icon-text">Clear</span>
                </div>

                <div class="opt-item">
                  <i class="el-icon-refresh icon-holder"  />
                  <span class="icon-text">Refresh</span>
                </div>
                <div class="opt-item">
                  <el-checkbox>Auto Refresh</el-checkbox>
                </div>
              </div>
              <!-- table -->
              <div class="table-wrapper">
                <div style="flex:1;">
                  <el-table
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    :data="satisticsTableData"
                    border
                  >
                    <el-table-column
                      prop="interface_name"
                      label="Interface"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connect_type"
                      label="TX Rate (KB/s)"

                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connection_status"
                      label="RX Rate (KB/s)"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="ip_address"
                      width="190"
                      label="TX Packet Rate (Pkt/s)"
                      header-align="center"
                      align="center"
                    />

                    <el-table-column
                      width="190"
                      prop="subnet_mask"
                      label="RX Packet Rate (Pkt/s)"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column

                      prop="mac_address"
                      label="Total TX Bytes"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column

                      prop="default_gateway"
                      label="	Total RX Bytes"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="primary_dns"
                      label="Total TX Packets"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="primary_dns"
                      label="Total RX Packets"
                      header-align="center"
                      align="center"
                    />
                  </el-table>
                </div>
              </div>
              <div class="bottom-tips">
                <div style="flex: 1">
                  <span>Click the header to select or change the sorting preferences.</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="IP Statistics" name="second">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Settings
              </h1>
              <div class="table-wrapper">
                <div style="flex:1;">
                  <el-checkbox class="enable-ip-statistics">Enable IP Statistics</el-checkbox>
                  <div style="display: flex;align-items: center">
                    <span class="ip-range">IP Range:</span>
                    <el-input value="192.168.0.0" class="width-200" />
                    <span class="splash">/</span>
                    <el-input value="255.255.255.0" class="width-200" />
                  </div>
                  <el-button size="mini" class="margin-20-0">Save</el-button>
                </div>
              </div>

              <h1 class="panel-title">
                Statistics List
              </h1>
              <!-- 操作按钮-->
              <div class="opt-wrapper">
                <div class="opt-item">
                  <i class="el-icon-remove icon-holder"  />
                  <span class="icon-text">Clear</span>
                </div>

                <div class="opt-item">
                  <i class="el-icon-refresh icon-holder"  />
                  <span class="icon-text">Refresh</span>
                </div>
                <div class="opt-item">
                  <el-checkbox>Auto Refresh</el-checkbox>
                </div>
              </div>
              <!-- table -->
              <div class="table-wrapper">
                <div style="flex:1;">
                  <el-table
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    :data="trafficTableData"
                    border
                  >
                    <el-table-column
                      prop="ip_address_name"
                      label="IP Address"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connect_type"
                      label="TX Rate (KB/s)"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="connection_status"
                      label="RX Rate (KB/s)"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="ip_address"
                      label="TX Packet Rate (Pkt/s)"
                      header-align="center"
                      align="center"
                    />

                    <el-table-column
                      prop="subnet_mask"
                      label="RX Packet Rate (Pkt/s)"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="mac_address"
                      label="Total TX Bytes"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="default_gateway"
                      label="	Total RX Bytes"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="primary_dns"
                      label="Total TX Packets"
                      header-align="center"
                      align="center"
                    />
                    <el-table-column
                      prop="primary_dns"
                      label="Total RX Packets"
                      header-align="center"
                      align="center"
                    />
                  </el-table>
                </div>
              </div>
              <div class="bottom-tips">
                <div style="flex: 1">
                  <span>Click the header to select or change the sorting preferences.</span>
                </div>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'TrafficIndex',
  data() {
    return {
      activeName: 'first',
      satisticsTableData: [
        {
          interface_name: 'WAN1',
          connect_type: '1',
          connection_status: '1',
          ip_address: '3',
          subnet_mask: '3',
          mac_address: '7.9M',
          default_gateway: '2.9M',
          primary_dns: '165577'
        },
        {
          interface_name: 'WAN1',
          connect_type: '1',
          connection_status: '1',
          ip_address: '3',
          subnet_mask: '3',
          mac_address: '7.9M',
          default_gateway: '2.9M',
          primary_dns: '165577'
        }
      ],
      trafficTableData: [
        {
          ip_address_name: '192.168.0.22',
          connect_type: '1',
          connection_status: '1',
          ip_address: '3',
          subnet_mask: '3',
          mac_address: '7.9M',
          default_gateway: '2.9M',
          primary_dns: '165577'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>

@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.enable-ip-statistics {
  margin: 20px 0;font-size: 12px
}
.splash {
  margin: 0 5px
}
.ip-range {
  margin-right: 50px;width: 200px
}
.bottom-tips {
  display: flex;align-items: center;width: 100%;padding: 50px 10px 0 10px;
}
.table-wrapper {
  display: flex;align-items: center;width: 100%;padding: 0px 10px;
}

</style>

