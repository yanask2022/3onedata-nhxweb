<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Basic Setting" name="basic_settings">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                General
              </h1>

              <div class="three-column-row div_fk4rqf">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="enable_load_balancing" label="Enable Load Balancing"></el-checkbox>
                </div>
                <div class="three-column-row-cell-2"></div>
                <div class="three-column-row-cell-3"></div>
              </div>

              <div class="three-column-row div_onbfwp">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSaveGeneral">Save</el-button>
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
                Basic Settings
              </h1>

              <div class="three-column-row div_qqx8mr">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="enable_application_optimized_routing">Enable Application Optimized Routing
                  </el-checkbox>
                </div>
                <div class="three-column-row-cell-2"></div>
                <div class="three-column-row-cell-3"></div>
              </div>
              <div class="three-column-row div_o7zwrs">
                <div class="three-column-row-cell-1 div_7mib32">
                  <el-checkbox v-model="enable_balance_routing">Enable Bandwidth Based Balance Routing on port(s):
                  </el-checkbox>
                </div>
                <div class="three-column-row-cell-2 div_mulg20">
                  <el-select v-model="balance_routing_option" size="mini" :disabled="!enable_balance_routing" multiple placeholder="--">
                    <el-option label="WAN1" value="1"></el-option>
                    <el-option label="WAN2" value="2"></el-option>
                  </el-select>
                </div>
                <div class="three-column-row-cell-3"></div>
              </div>

              <div class="three-column-row div_iebtd1">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSaveBasicSettings">Save</el-button>
                </div>
                <div class="three-column-row-cell-2"></div>
                <div class="three-column-row-cell-3"></div>
              </div>
              <hr class="hr_yld9cv">
              <div class="three-column-row div_uvp54w">
                <span class="span_dk9drk">Note:</span>
                <span class="span_nf7gyp">1. To enable &quot;Bandwidth Based Balance Routing&quot;, please first configure WAN bandwidth on the &quot;Network&quot;-&gt;&quot;WAN&quot; page.</span>
                <span class="span_h17yb9">2. The WAN port traffic ratio will be equal to the preset bandwidth ratio of each WAN port after &quot;Bandwidth Based Balance Routing&quot; of the port is enabled.</span>
                <span class="span_wgtyrd">3. If the bandwidth ratio of WAN1 to WAN2 is set as 2:1, the traffic ratio of WAN1 and WAN2 will be approximately 2:1 after &quot;Bandwidth Based Balance Routing&quot; of WAN1 and WAN2 is enabled.</span>
              </div>
            </el-col>
          </el-row>

        </div>

      </el-tab-pane>
      <el-tab-pane label="Link Backup" name="link_backup">

        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Link Backup Rule List
              </h1>
              <!-- 操作按钮-->
              <div class="div_8w4guz">
                <div class="div_twr3qb">
                  <i class="el-icon-circle-plus i_n3whvm"></i>
                  <span class="span_fl9znq">Add</span>
                </div>

                <div class="div_ivkfsx">
                  <i class="el-icon-remove i_vs66h6"></i>
                  <span class="span_bwigt3">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_gri8bb">
                <div class="div_3ciolv">
                  <el-table ref="linkBackupTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="linkBackupTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_tb7dym">

                          <div class="div_gx1h7a">
                            <span class="span_z0k11y">Primary WAN:</span>
                            <div class="div_xcv380">

                              <el-select v-model="props.row.primary_dns" size="mini" placeholder="WAN1" class="el-select_c2rira">
                                <el-option label="WAN1" value="1"></el-option>
                                <el-option label="WAN2" value="2"></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="div_i02g56">
                            <span class="span_wfzt4q">Direction:</span>
                            <div class="div_vw2noc">
                              <el-select v-model="props.row.backup_wan" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_jl1yid">
                                <el-option label="WAN1" value="1"></el-option>
                                <el-option label=" WAN2" value="2"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_a0yege">
                            <span class="span_khxmqe">Mode:</span>
                            <div class="div_ilsk4c">
                              <el-radio-group v-model="props.row.mode" class="el-radio-group_lled20">
                                <el-radio label="Timing">Timing</el-radio>
                                <el-radio label="Failover" class="el-radio_cspihi">Failover</el-radio>
                              </el-radio-group>
                            </div>
                          </div>
                          <div class="div_1hod0m">
                            <span class="span_nmhwzm">Effective Time:</span>
                            <div class="div_j9eh71">
                              <el-select v-model="props.row.effective_time" size="mini" placeholder="--" class="el-select_3jmst3">
                                <el-option label="Any" value="1"></el-option>
                                <el-option label="time1" value="2"></el-option>
                                <el-option label="time2" value="3"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_sv92dk">
                            <span class="span_34fhp0">Status:</span>
                            <div class="div_1qmxbr">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disabled">
                                Enable
                              </el-checkbox>
                            </div>
                          </div>

                          <div class="div_oo9tye">
                            <div class="div_dnex9l">
                              <el-button size="mini" @click="handleLineBackupTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="handleLineBackupTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="primary_dns" label="Primary WAN" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="backup_wan" label="Backup WAN" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="mode" label="Mode" header-align="center" align="center"></el-table-column>
                    <el-table-column label="Effective Time" prop="effective_time" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="status" label="Status" header-align="center" align="center"></el-table-column>
                    <el-table-column header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_1ic4s3">
                          <span @click="handleLinkBackupTableEdit(scope.row)" class="span_t7ol7b">
                            <i class="el-icon-edit-outline"></i>
                          </span>

                          <span @click="handleLinkBackupTableDelete(scope.row, scope.$index)" class="span_rb4821">
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
      <el-tab-pane label="Online Detection" name="online_detection">

        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Link Backup Rule List
              </h1>
              <!-- 操作按钮-->

              <!-- table -->
              <div class="div_fkw8ye">
                <div class="div_o6iqvc">
                  <el-table ref="onlineDetectionTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="onlineDetectionTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_5o36wo">

                          <div class="div_ryhdux">
                            <span class="span_25na9w">Port:</span>
                            <div class="div_jg5fvt">
                              <el-input v-model="props.row.port" size="mini"></el-input>
                            </div>
                          </div>
                          <div class="div_o60g5p">
                            <span class="span_97hsmp">Direction:</span>
                            <div class="div_oguufg">
                              <el-radio-group v-model="props.row.mode" class="el-radio-group_q5j2bs">
                                <el-radio label="Auto">Auto</el-radio>
                                <el-radio label="Manual">Manual</el-radio>
                                <el-radio label="Always_Online" class="el-radio_6xzvnn">Always Online</el-radio>
                              </el-radio-group>
                            </div>
                          </div>

                          <div class="div_hi7g6l">
                            <span class="span_th5n8u">Port:</span>
                            <div class="div_8iysr">
                              <el-input v-model="props.row.ping" size="mini"></el-input>
                            </div>
                          </div>
                          <div class="div_ps393h">
                            <span class="span_urt1ea">Port:</span>
                            <div class="div_xmn1is">
                              <el-input v-model="props.row.dns_lookup" size="mini" :disabled="props.row.mode != 'Manual'"></el-input>
                            </div>
                          </div>

                          <div class="div_lvfvtd">
                            <div class="div_k1abir">
                              <el-button size="mini" @click="handleOnlineDetectionTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="handleOnlineDetectionEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>

                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="port" label="Port" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="status" label="Port Status" header-align="center" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_fmev6w">
                          <span @click="handleOnlineDetectionTableEdit(scope.row)" class="span_muxuro">
                            <i class="el-icon-edit-outline"></i>
                          </span>

                          <span @click="handleLinkBackupTableDelete(scope.row, scope.$index)" class="span_tq64x8">
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
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'AntiARPSpoofing',
  data() {
    return {
      activeName: 'basic_settings',
      enable_load_balancing: false,
      enable_application_optimized_routing: false,
      enable_balance_routing: false,
      balance_routing_option: '',

      linkBackupTableData: [
        { id: '1', primary_dns: 'WAN1', backup_wan: 'WAN2', mode: 'Timing', effective_time: 'time1', status: 'Disabled' }
      ],
      linkBakcupTableIsEdting: false,
      onlineDetectionTableData: [
        { port: 'WAN2', mode: 'Auto', ping: '0.0.0.0', dns_lookup: '0.0.0.0', status: 'Online' }
      ],
      onlineDetectionTableIsEditing: false,

      enable_arp_spoofing_defense: false,
      match_ip_mac: false,
      send_garp_packets: false,
      send_packet_interval: 1000,
      passwordLevel: 0,
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
      ],
      ARP_List_TableData: [
        { id: '1', ip: '192.168.0.1', mac: '00:00:00:00', Interface: 'wan1' },
        { id: '2', ip: '192.168.0.2', mac: '00:00:00:00', Interface: 'wan2' },
        { id: '3', ip: '192.168.0.3', mac: '00:00:00:00', Interface: 'wan3' }
      ]
    }
  },
  methods: {
    handleOnlineDetectionTableEdit() {
      if (!this.onlineDetectionTableIsEditing) {
        this.$refs.onlineDetectionTable.toggleRowExpansion(row, true)
        this.onlineDetectionTableIsEditing = true
      }
    },
    handleOnlineDetectionTableEditDone(row) {
      this.$refs.onlineDetectionTable.toggleRowExpansion(row, false)
      this.onlineDetectionTableIsEditing = false
    },
    handleOnlineDetectionEditCancel(row) {
      this.$refs.onlineDetectionTable.toggleRowExpansion(row, false)
      this.onlineDetectionTableIsEditing = false
    },
    handleLineBackupTableEditDone(row) {
      this.$refs.linkBackupTable.toggleRowExpansion(row, false)
      this.linkBakcupTableIsEdting = false
    },
    handleLineBackupTableEditCancel(row) {
      this.$refs.linkBackupTable.toggleRowExpansion(row, false)
      this.linkBakcupTableIsEdting = false
    },
    handleLinkBackupTableEdit(row) {
      if (!this.linkBakcupTableIsEdting) {
        this.$refs.linkBackupTable.toggleRowExpansion(row, true)
        this.linkBakcupTableIsEdting = true
      }
    },

    handleLinkBackupTableDelete(row) {
      //
    },
    onSaveGeneral() {
      console.log('onSaveGeneral')
    },
    on_IP_MAC_TableEditDone(row) {
      this.$refs.IP_MAC_lTable.toggleRowExpansion(row, false)
      this.IP_MAC_TableEditing = false
    },
    on_IP_MAC_TableEditCancel(row) {
      this.$refs.IP_MAC_lTable.toggleRowExpansion(row, false)
      this.IP_MAC_TableEditing = false
    },
    handle_IP_MAC_TableEdit(row) {
      if (!this.IP_MAC_TableEditing) {
        this.$refs.IP_MAC_lTable.toggleRowExpansion(row, true)
        this.IP_MAC_TableEditing = true
      }
    },
    handle_IP_MAC_TableDelete() {

    },
    handle_IP_MAC_TableUpload() {
      console.log('handle_IP_MAC_TableUpload')
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

.div_fk4rqf {
  margin-top: 20px
}

.div_onbfwp {
  margin-top: 20px
}

.div_qqx8mr {
  margin-top: 20px
}

.div_o7zwrs {
  margin-top: 20px
}

.div_7mib32 {
  width: auto !important;
}

.div_mulg20 {
  margin-left: 10px
}

.div_iebtd1 {
  margin-top: 20px
}

.hr_yld9cv {
  margin-top: 50px
}

.div_uvp54w {
  display: flex;
  flex-direction: column;
  align-items: flex-start
}

.span_dk9drk {
  margin-top: 10px
}

.span_nf7gyp {
  margin-top: 5px
}

.span_h17yb9 {
  margin-top: 5px
}

.span_wgtyrd {
  margin-top: 5px
}

.div_8w4guz {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_twr3qb {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_n3whvm {
  font-size: 18px
}

.span_fl9znq {
  font-size: 12px;
  margin-left: 5px
}

.div_ivkfsx {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_vs66h6 {
  font-size: 18px
}

.span_bwigt3 {
  font-size: 12px;
  margin-left: 5px
}

.div_gri8bb {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_3ciolv {
  flex: 1;
}

.div_tb7dym {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_gx1h7a {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_z0k11y {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_xcv380 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_c2rira {
  width: 232px;
}

.div_i02g56 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_wfzt4q {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_vw2noc {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_jl1yid {
  width: 232px;
}

.div_a0yege {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_khxmqe {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_ilsk4c {
  flex: 1;
  display: flex;
  align-items: center
}

.el-radio-group_lled20 {
  margin-left: 10px
}

.el-radio_cspihi {
  margin-top: 10px
}

.div_1hod0m {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_nmhwzm {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_j9eh71 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_3jmst3 {
  width: 232px;
}

.div_sv92dk {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_34fhp0 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_1qmxbr {
  flex: 1;
  display: flex;
  align-items: center
}

.div_oo9tye {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_dnex9l {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_1ic4s3 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_t7ol7b {
  font-size: 16px
}

.span_rb4821 {
  font-size: 16px;
  margin-left: 8px
}

.div_fkw8ye {
  margin-top: 40px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_o6iqvc {
  flex: 1;
}

.div_5o36wo {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_ryhdux {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_25na9w {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_jg5fvt {
  flex: 1;
  display: flex;
  align-items: center
}

.div_o60g5p {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_97hsmp {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_oguufg {
  flex: 1;
  display: flex;
  align-items: center
}

.el-radio-group_q5j2bs {
  margin-left: 10px
}

.el-radio_6xzvnn {
  margin-top: 10px
}

.div_hi7g6l {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_th5n8u {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_8iysr {
  flex: 1;
  display: flex;
  align-items: center
}

.div_ps393h {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_urt1ea {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_xmn1is {
  flex: 1;
  display: flex;
  align-items: center
}

.div_lvfvtd {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_k1abir {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_fmev6w {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_muxuro {
  font-size: 16px
}

.span_tq64x8 {
  font-size: 16px;
  margin-left: 8px
}

</style>

