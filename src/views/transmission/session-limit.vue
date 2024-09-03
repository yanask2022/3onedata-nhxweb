<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Session Limit" name="session_limit">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                General
              </h1>

              <div class="three-column-row div_wntnye">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="enable_session_limit">Enable Session Limit</el-checkbox>
                </div>
                <div class="three-column-row-cell-2"></div>
                <div class="three-column-row-cell-3"></div>
              </div>

              <div class="three-column-row div_1scdh8">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSaveBandwidthControl">Save</el-button>
                </div>
                <div class="three-column-row-cell-2"></div>
                <div class="three-column-row-cell-3"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Session Limit Rule List
              </h1>
              <!-- 操作按钮-->
              <div class="div_zcqb7m">
                <div class="div_4p8bc5">
                  <i class="el-icon-circle-plus i_482i8k"></i>
                  <span class="span_4hq8mn">Add</span>
                </div>

                <div class="div_8gkv9e">
                  <i class="el-icon-remove i_t08kdm"></i>
                  <span class="span_28o2pp">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_5p9zn4">
                <div class="div_poss4b">
                  <el-table ref="bandWidthControlTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="bandWidthControlTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_mb1d82">

                          <div class="div_qhfyzp">
                            <span class="span_swwf3n">Name:</span>
                            <div class="div_vy3bfr">
                              <el-input v-model="props.row.name" size="mini" placeholder class="el-input_4lywew"></el-input>
                            </div>
                          </div>

                          <div class="div_7iogup">
                            <span class="span_k4inrq">Group:</span>
                            <div class="div_xgtgl3">
                              <el-select v-model="props.row.group" size="mini" class="el-select_ql70c0">
                                <el-option value="IPGROUP_LAN" label="IPGROUP_LAN"></el-option>
                                <el-option value="ipgroup1" label="ipgroup1"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_v2h9tn">
                            <span class="span_s0objg">Status:</span>
                            <div class="div_9aabb1">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disabled">
                                Enable
                              </el-checkbox>
                              <span class="span_4z4ajy"></span>
                            </div>
                          </div>

                          <div class="div_txrec3">
                            <div class="div_ssan11">
                              <el-button size="mini" @click="handleBandwidthTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="handleBandwidthTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="name" label="Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="group" label="Group" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="max_sessions" label="Max Sessions" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="status" label="Status" header-align="center" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_9l35ao">
                          <span @click="handleBandwidthTableEdit(scope.row)" class="span_4r837s">
                            <i class="el-icon-edit-outline"></i>
                          </span>

                          <span @click="handleBandwidthTableDelete(scope.row, scope.$index)" class="span_iih2zg">
                            <i class="el-icon-remove"></i>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Session Monitor" name="session_monitor">

        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Session Monitor List
              </h1>
              <!-- 操作按钮-->
              <div class="div_1sy2gy">

                <div class="div_ccmca8">
                  <span>Entry Count: 0</span>
                </div>

                <div class="div_zfd0yi">
                  <i class="el-icon-refresh i_c03gsw"></i>
                  <span class="span_ac7zgu">Refresh</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_7igeys">
                <div class="div_g33avw">
                  <el-table ref="sessionMonitorTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="sessionMonitorTableData" border>

                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="ip" label="IP" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="max_sessions" label="Max Sessions" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="current_sessions" label="Current Sessions" header-align="center" align="center"></el-table-column>
                  </el-table>
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
export default {
  name: 'SessionLimit',
  data() {
    return {
      activeName: 'session_limit',
      enable_session_limit: false,
      bandWidthControlTableData: [
        {
          id: '1',
          name: 'Session',
          group: 'ipgroup1',
          max_sessions: '20',
          status: 'Disabled'
        },
        {
          id: '12',
          name: 'BanddCtl2',
          direction: 'LAN<-->WAN2',
          group: 'ipgroup1',
          maximum_upstream_Bandwidth: '1000',
          maximum_downstream_Bandwidth: '10001',
          mode: 'Shared',
          effective_time: 'time2',
          status: 'Disabled'
        }
      ],

      sessionMonitorTableData: [
        { id: '--', ip: '--', max_sessions: '', current_sessions: '' }
      ],
      enable_bandwidth_control: false,
      enable_bandwidth_control_when_useage_reaches: false,
      useage_reaches: '',

      bandwidthTableIsEditing: false,

      // enable_arp_spoofing_defense: false,
      // match_ip_mac: false,
      // send_garp_packets: false,
      // send_packet_interval: 1000,
      // passwordLevel: 0,
      IP_MAC_TableData: [
        {
          id: 1,
          ip: '192.168.0.1',
          mac: '00:00:00:00',
          Interface: 'WAN1',
          Description: 'WAN1 interface',
          Status: false
        }
      ],
      IP_MAC_TableEditing: false,
      ARP_Scan_TableData: [
        { id: '1', ip: '192.168.0.1', mac: '00:00:00:00' },
        { id: '2', ip: '192.168.0.2', mac: '00:00:00:00' },
        { id: '3', ip: '192.168.0.3', mac: '00:00:00:00' }
      ]

    }
  },
  methods: {
    onSaveBandwidthControl() {
      console.log('onSaveGeneral')
    },
    handleBandwidthTableEdit(row) {
      if (!this.bandwidthTableIsEditing) {
        this.$refs.bandWidthControlTable.toggleRowExpansion(row, true)
        this.bandwidthTableIsEditing = true
      }
    },
    handleBandwidthTableEditDone(row) {
      this.$refs.bandWidthControlTable.toggleRowExpansion(row, false)
      this.bandwidthTableIsEditing = false
    },
    handleBandwidthTableEditCancel(row) {
      this.$refs.bandWidthControlTable.toggleRowExpansion(row, false)
      this.bandwidthTableIsEditing = false
    },
    handleBandwidthTableDelete(row) {

    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
.three-column-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;

  .three-column-row-cell-1 {
    display: flex;
    align-items: center;
    width: 174px;
  }

  .three-column-row-cell-2 {
    display: flex;
    align-items: center;
    width: 180px;
  }

  .three-column-row-cell-3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.three-column-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;

  .three-column-row-cell-1 {
    display: flex;
    align-items: center;
    width: 174px;
  }

  .three-column-row-cell-2 {
    display: flex;
    align-items: center;
    width: 180px;
  }

  .three-column-row-cell-3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.div_wntnye {
  margin-top: 20px
}

.div_1scdh8 {
  margin-top: 20px
}

.div_zcqb7m {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_4p8bc5 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_482i8k {
  font-size: 18px
}

.span_4hq8mn {
  font-size: 12px;
  margin-left: 5px
}

.div_8gkv9e {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_t08kdm {
  font-size: 18px
}

.span_28o2pp {
  font-size: 12px;
  margin-left: 5px
}

.div_5p9zn4 {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_poss4b {
  flex: 1;
}

.div_mb1d82 {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_qhfyzp {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_swwf3n {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_vy3bfr {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_4lywew {
  max-width: 232px;
}

.div_7iogup {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_k4inrq {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_xgtgl3 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_ql70c0 {
  width: 200px
}

.div_v2h9tn {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_s0objg {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_9aabb1 {
  flex: 1;
  display: flex;
  align-items: center
}

.span_4z4ajy {
  width: 174px;
  color: #000000;
  font-size: 12px;
  margin-left: 5px
}

.div_txrec3 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_ssan11 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_9l35ao {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_4r837s {
  font-size: 16px
}

.span_iih2zg {
  font-size: 16px;
  margin-left: 8px
}

.div_1sy2gy {
  margin: 30px 0 10px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center
}

.div_ccmca8 {
  display: flex;
  align-items: center;
  margin-right: 20px;
  align-self: flex-start
}

.div_zfd0yi {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_c03gsw {
  font-size: 18px
}

.span_ac7zgu {
  font-size: 12px;
  margin-left: 5px
}

.div_7igeys {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_g33avw {
  flex: 1;
}
</style>

