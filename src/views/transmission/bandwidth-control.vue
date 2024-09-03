<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Bandwidth Control" name="bandWidthControl">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Bandwidth Control Config
              </h1>

              <div class="three-column-row div_wkaqxi">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="enable_bandwidth_control">Enable Bandwidth Control</el-checkbox>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_ecldqg">
                <div class="three-column-row-cell-1 div_1lhhqj">
                  <el-checkbox v-model="enable_bandwidth_control_when_useage_reaches" :disabled="!enable_bandwidth_control">
                    Enable Bandwidth Control when bandwidth usage reaches
                  </el-checkbox>
                  <el-input v-model="useage_reaches" size="mini" :disabled="!enable_bandwidth_control" class="el-input_q907pl" />
                  <span>%</span>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_7k992i">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSaveBandwidthControl">Save</el-button>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Bandwidth Control Rule List
              </h1>
              <!-- 操作按钮-->
              <div class="div_cexw9x">
                <div class="div_3uzn24">
                  <i class="el-icon-circle-plus i_p5mz6p" />
                  <span class="span_aqgovu">Add</span>
                </div>

                <div class="div_yg2f90">
                  <i class="el-icon-remove i_h5stlx" />
                  <span class="span_38cas1">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_myh0n3">
                <div class="div_9u0rvd">
                  <el-table ref="bandWidthControlTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="bandWidthControlTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_sxx0fm">

                          <div class="div_g7ghur">
                            <span class="span_81zgdv">Name:</span>
                            <div class="div_7990de">
                              <el-input v-model="props.row.name" size="mini" placeholder class="el-input_wxhr8t" />
                            </div>
                          </div>
                          <div class="div_hjblr1">
                            <span class="span_n50ioh">Direction:</span>
                            <div class="div_fv6j1l">
                              <el-select v-model="props.row.direction" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_1uo9fg">
                                <el-option label="LAN  WAN1" value="1">
                                  <el-option label="LAN  WAN2" value="2">
                                    <el-option label="LAN  WAN_ALL" value="3" /></el-option></el-option></el-select>
                            </div>
                          </div>
                          <div class="div_ghn75j">
                            <span class="span_3b0eg6">Maximum Upstream Bandwidth:</span>
                            <div class="div_5yv9xq">
                              <el-input v-model="props.row.maximum_upstream_Bandwidth" size="mini" class="el-input_jpn71o" />
                              <span class="span_rywqax">Kbps(100-1000000)</span>
                            </div>
                          </div>

                          <div class="div_nf8grk">
                            <span class="span_4p2a6c">Maximum Downstream Bandwidth:</span>
                            <div class="div_feck39">
                              <el-input v-model="props.row.maximum_downstream_Bandwidth" size="mini" class="el-input_c2iod9" />
                              <span class="span_m99uko">Kbps(100-1000000)</span>
                            </div>
                          </div>

                          <div class="div_rzw3h2">
                            <span class="span_anbkbr">Mode:</span>
                            <div class="div_trwvx5">
                              <el-radio-group v-model="props.row.mode" class="el-radio-group_onxmrg">
                                <el-radio label="Shared">Shared</el-radio>
                                <el-radio label="Individual" class="el-radio_db1ggc">Individual</el-radio>
                              </el-radio-group>
                            </div>
                          </div>
                          <div class="div_a70m0v">
                            <span class="span_qo3tqy">Mode:</span>
                            <div class="div_xc09wk">
                              <el-select v-model="props.row.effective_time" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_nespc0">
                                <el-option label="Any" value="1" />
                                <el-option label="time1" value="2" />
                                <el-option label="time2" value="3" />
                              </el-select>
                            </div>
                          </div>

                          <div class="div_4qcqw8">
                            <span class="span_79b8wq">ID:</span>
                            <div class="div_8bfdpp">
                              <el-input v-model="props.row.id" size="mini" class="el-input_na6ax4" />
                              <span class="span_oortds">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_gos22o">
                            <span class="span_58kon4">Status:</span>
                            <div class="div_l3r5ib">
                              <el-checkbox true-label="Enable" false-label="Disabled">Enable</el-checkbox>
                              <span class="span_rok1e0">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_5o8yj">
                            <div class="div_bnsh50">
                              <el-button size="mini" @click="handleBandwidthTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="handleBandwidthTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection" />
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center" />
                    <el-table-column prop="direction" label="Direction" header-align="center" align="center" />
                    <el-table-column prop="group" label="Group" header-align="center" align="center" />

                    <el-table-column prop="maximum_upstream_Bandwidth" label="Maximum Upstream Bandwidth" header-align="center" align="center" />
                    <el-table-column prop="maximum_downstream_Bandwidth" label="Maximum Downstream Bandwidth" header-align="center" align="center" />
                    <el-table-column prop="mode" label="Mode" width="100" header-align="center" align="center" />
                    <el-table-column prop="effective_time" width="130" label="Effective Time" header-align="center" align="center" />
                    <el-table-column prop="status" label="Status" width="120" header-align="center" align="center" />
                    <el-table-column width="100" header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_4o22ce">
                          <span class="span_vwiwy1" @click="handleBandwidthTableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_hteyq2" @click="handleBandwidthTableDelete(scope.row, scope.$index)">
                            <i class="el-icon-remove" />
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

    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'BandwidthControl',
  data() {
    return {
      activeName: 'bandWidthControl',
      enable_bandwidth_control: false,
      enable_bandwidth_control_when_useage_reaches: false,
      useage_reaches: '',

      bandWidthControlTableData: [
        {
          id: '1',
          name: 'BandCtl1',
          direction: 'LAN<-->WAN2',
          group: 'ipgroup1',
          maximum_upstream_Bandwidth: '1000',
          maximum_downstream_Bandwidth: '1000',
          mode: 'Shared',
          effective_time: 'time2',
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

.div_wkaqxi {
  margin-top: 20px
}

.div_ecldqg {
  margin-top: 20px
}

.div_1lhhqj {
  width: auto!important;
}

.el-input_q907pl {
  width: 60px;
  margin: 0 5px 0 10px
}

.div_7k992i {
  margin-top: 20px
}

.div_cexw9x {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_3uzn24 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_p5mz6p {
  font-size: 18px
}

.span_aqgovu {
  font-size: 12px;
  margin-left: 5px
}

.div_yg2f90 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_h5stlx {
  font-size: 18px
}

.span_38cas1 {
  font-size: 12px;
  margin-left: 5px
}

.div_myh0n3 {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_9u0rvd {
  flex: 1;
}

.div_sxx0fm {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_g7ghur {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_81zgdv {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_7990de {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_wxhr8t {
  max-width: 232px;
}

.div_hjblr1 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_n50ioh {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_fv6j1l {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_1uo9fg {
  width: 232px;
}

.div_ghn75j {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_3b0eg6 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_5yv9xq {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_jpn71o {
  max-width: 232px;
}

.span_rywqax {
  width: 174px;
  color: #000000;
  font-size: 12px;
  margin-left: 5px
}

.div_nf8grk {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_4p2a6c {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_feck39 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_c2iod9 {
  max-width: 232px;
}

.span_m99uko {
  width: 174px;
  color: #000000;
  font-size: 12px;
  margin-left: 5px
}

.div_rzw3h2 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_anbkbr {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_trwvx5 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-radio-group_onxmrg {
  margin-left: 10px
}

.el-radio_db1ggc {
  margin-top: 10px
}

.div_a70m0v {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_qo3tqy {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_xc09wk {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_nespc0 {
  width: 232px;
}

.div_4qcqw8 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_79b8wq {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_8bfdpp {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_na6ax4 {
  max-width: 232px;
}

.span_oortds {
  width: 174px;
  color: #000000;
  font-size: 12px;
  margin-left: 5px
}

.div_gos22o {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_58kon4 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_l3r5ib {
  flex: 1;
  display: flex;
  align-items: center
}

.span_rok1e0 {
  width: 174px;
  color: #000000;
  font-size: 12px;
  margin-left: 5px
}

.div_5o8yj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_bnsh50 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_4o22ce {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_vwiwy1 {
  font-size: 16px
}

.span_hteyq2 {
  font-size: 16px;
  margin-left: 8px
}

</style>

