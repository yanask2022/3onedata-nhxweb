<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="IP-MAC Binding" name="ip-mac_binding">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                General
              </h1>

              <div class="three-column-row div_3jdwk4">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="enable_arp_spoofing_defense" label="Enable ARP Spoofing Defense" />
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_pckdcv">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="match_ip_mac" label="Permit the packets matching the IP-MAC Binding entries only" />
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_86veji">
                <div class="three-column-row-cell-1">
                  <el-checkbox v-model="send_garp_packets" label="Send GARP packets when ARP attack is detected" />
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_rxm5sl">
                <div class="three-column-row-cell-1">
                  <span>Interval:</span>
                </div>
                <div class="three-column-row-cell-2">
                  <el-input v-model="send_packet_interval" size="mini" :disabled="send_garp_packets" />
                </div>
                <div class="three-column-row-cell-3">
                  <span>ms</span>
                </div>
              </div>

              <div class="three-column-row div_pavp4e">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSaveGeneral">Save</el-button>
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
                IP-MAC Binding List
              </h1>
              <!-- 操作按钮-->
              <div class="div_dt02wf">
                <div class="div_t35s37">
                  <i class="el-icon-circle-plus i_oiq9b9" />
                  <span class="span_glkt44">Add</span>
                </div>

                <div class="div_9g87n5">
                  <i class="el-icon-remove i_5rxs66" />
                  <span class="span_vs01q8">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_i07qyz">
                <div class="div_el8zz7">
                  <el-table ref="IP_MAC_lTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="IP_MAC_TableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_j7vr8b">

                          <div class="div_zi47h3">
                            <span class="span_gw7tnq">IP Address:</span>
                            <div class="div_1jyw4g">
                              <el-input size="mini" placeholder value="192.168.0.150" class="el-input_1snit0" />
                            </div>
                          </div>
                          <div class="div_ensiz5">
                            <span class="span_phax0g">MAC Address:</span>
                            <div class="div_5h59dc">
                              <el-input value="00-00-00-01-00-0A" size="mini" class="el-input_3ttsrv" />
                            </div>
                          </div>
                          <div class="div_hwehld">
                            <span class="span_qxy4km">Description:</span>
                            <div class="div_a1u1j">
                              <el-input value=" " size="mini" class="el-input_mm4huq" />
                              <span class="span_jqnzmx">(Optional, 0-50 characters)</span>
                            </div>

                          </div>
                          <div class="div_1qw6yk">
                            <span class="span_4zn4ps">Export to DHCP Address Reservation:</span>
                            <div class="div_b5lt43">
                              <el-checkbox label="Enable" />
                            </div>
                          </div>

                          <div class="div_uz32ou">
                            <span class="span_5po16d">Status:</span>
                            <div class="div_dhemgr">
                              <el-checkbox label="Enable" />
                            </div>
                          </div>

                          <div class="div_sva137">
                            <div class="div_h97mtp">
                              <el-button size="mini" @click="on_IP_MAC_TableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="on_IP_MAC_TableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection" />
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center" />
                    <el-table-column prop="IP_Address" label="IP Address" header-align="center" align="center" />
                    <el-table-column prop="MAC_Address" label="Mac Address" header-align="center" align="center" />

                    <el-table-column prop="Interface" label="Interface" header-align="center" align="center" />

                    <el-table-column prop="Description" label="Description" header-align="center" align="center" />
                    <el-table-column prop="Status" label="Status" width="120" header-align="center" align="center">
                      <template slot-scope="props">
                        <div class="div_p2lsd9">
                            <span class="span_9mjth0">{{ props.row.Status === true ? 'Enabled' : 'Disabled' }}</span>
                          <i v-if="props.row.Status === true" class="el-icon-success i_rrsjv6" />
                          <i v-else class="el-icon-error i_ceo5hc" />
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column header-align="center" align="center" label="Operation" width="120">
                      <template slot-scope="scope">
                        <div class="div_aio02r">
                          <span class="span_e762a5" @click="handle_IP_MAC_TableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_r6711j" @click="handle_IP_MAC_TableUpload(scope.row, scope.$index)">
                            <i class="el-icon-top" />
                          </span>
                          <span class="span_h14mlm" @click="handle_IP_MAC_TableDelete(scope.row, scope.$index)">
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
      <el-tab-pane label="ARP Scanning" name="ip-ARP_Scanning">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                General
              </h1>

              <div class="three-column-row div_xrgixe">
                <div class="three-column-row-cell-1">
                  <span>Scanning IP Range:</span>
                </div>
                <div class="three-column-row-cell-2 div_ho5av6">
                  <el-input size="mini" placeholder value class="el-input_89qgju" />
                  <span class="span_jpbl71">-</span>
                  <el-input size="mini" placeholder value class="el-input_qw41xb" />
                </div>
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_askyi2">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSaveGeneral">Scan</el-button>
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
                Scanning Result
              </h1>
              <!-- 操作按钮-->
              <div class="div_xlj3p">
                <div class="div_cq76kr">
                  <i class="el-icon-link i_h9uw7v" />
                  <span class="span_us3q54">Bind</span>
                </div>

              </div>
              <!-- table -->
              <div class="div_j3y70z">
                <div class="div_2455yr">
                  <el-table ref="ARP_Scan_Table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="ARP_Scan_TableData" border>
                    <el-table-column header-align="center" align="center" width="50" type="selection" />
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center" />
                    <el-table-column prop="ip" label="IP Address" header-align="center" align="center" />
                    <el-table-column prop="mac" label="Mac Address" header-align="center" align="center" />
                    <el-table-column header-align="center" align="center" label="Operation" width="120">
                      <template slot-scope="scope">
                        <div class="div_aio02r">
                          <span class="span_e762a5" @click="handle_IP_MAC_TableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_r6711j" @click="handle_IP_MAC_TableUpload(scope.row, scope.$index)">
                            <i class="el-icon-top" />
                          </span>
                          <span class="span_h14mlm" @click="handle_IP_MAC_TableDelete(scope.row, scope.$index)">
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
      <el-tab-pane label="ARP List" name="ARP_List">

        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                ARP List
              </h1>
              <!-- 操作按钮-->
              <div class="div_xok0ow">
                <div class="div_xhr0f1">
                  <i class="el-icon-link i_tfuad3" />
                  <span class="span_9uobc1">Bind</span>
                </div>
                <div class="div_b0g59p">
                  <i class="el-icon-refresh i_q1qto1" />
                  <span class="span_ph3wey">Refresh</span>
                </div>

              </div>
              <!-- table -->
              <div class="div_q3rodo">
                <div class="div_n0nmjn">
                  <el-table ref="ARP_List_Table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="ARP_List_TableData" border>
                    <el-table-column header-align="center" align="center" width="80" type="selection" />
                    <el-table-column prop="id" width="80" label="ID" header-align="center" align="center" />
                    <el-table-column prop="ip" label="IP Address" header-align="center" align="center" />
                    <el-table-column prop="mac" label="Mac Address" header-align="center" align="center" />
                    <el-table-column prop="Interface" label="Interface" header-align="center" align="center" />
                    <el-table-column header-align="center" align="center" label="Operation" width="120">
                      <template slot-scope="scope">
                        <div class="div_aio02r">
                          <span class="span_e762a5" @click="handle_IP_MAC_TableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_r6711j" @click="handle_IP_MAC_TableUpload(scope.row, scope.$index)">
                            <i class="el-icon-top" />
                          </span>
                          <span class="span_h14mlm" @click="handle_IP_MAC_TableDelete(scope.row, scope.$index)">
                            <i class="el-icon-remove" />
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>

              <div class="div_xw4ezx">
                <span>You can click IP Address in the header bar to sort the entries in ascending or descending order.</span>
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
      activeName: 'ip-mac_binding',
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

.div_3jdwk4 {
  margin-top: 20px
}

.div_pckdcv {
  margin-top: 20px
}

.div_86veji {
  margin-top: 20px
}

.div_rxm5sl {
  margin-top: 20px
}

.div_pavp4e {
  margin-top: 20px
}

.div_dt02wf {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_t35s37 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_oiq9b9 {
  font-size: 18px
}

.span_glkt44 {
  font-size: 12px;
  margin-left: 5px
}

.div_9g87n5 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_5rxs66 {
  font-size: 18px
}

.span_vs01q8 {
  font-size: 12px;
  margin-left: 5px
}

.div_i07qyz {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_el8zz7 {
  flex: 1;
}

.div_j7vr8b {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_zi47h3 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_gw7tnq {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_1jyw4g {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_1snit0 {
  max-width: 232px;
}

.div_ensiz5 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_phax0g {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_5h59dc {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_3ttsrv {
  max-width: 232px;
}

.div_hwehld {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_qxy4km {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_a1u1j {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_mm4huq {
  max-width: 232px;
}

.span_jqnzmx {
  width: 174px;
  color: #000000;
  font-size: 12px;
  margin-left: 5px
}

.div_1qw6yk {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_4zn4ps {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_b5lt43 {
  flex: 1;
  display: flex;
  align-items: center
}

.div_uz32ou {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_5po16d {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_dhemgr {
  flex: 1;
  display: flex;
  align-items: center
}

.div_sva137 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_h97mtp {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_p2lsd9 {
  display: flex;
  align-items: center;
  justify-content: center
}

.span_9mjth0 {
  font-size: 12px;
  margin-right: 5px
}

.i_rrsjv6 {
  font-size: 14px
}

.i_ceo5hc {
  font-size: 14px
}

.div_aio02r {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_e762a5 {
  font-size: 16px
}

.span_r6711j {
  font-size: 16px;
  margin-left: 8px
}

.span_h14mlm {
  font-size: 16px;
  margin-left: 8px
}

.div_xrgixe {
  margin-top: 20px
}

.div_ho5av6 {
  width: auto
}

.el-input_89qgju {
  max-width: 232px;
}

.span_jpbl71 {
  margin: 0 5px
}

.el-input_qw41xb {
  max-width: 232px;
}

.div_askyi2 {
  margin-top: 20px
}

.div_xlj3p {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_cq76kr {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_h9uw7v {
  font-size: 18px
}

.span_us3q54 {
  font-size: 12px;
  margin-left: 5px
}

.div_j3y70z {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_2455yr {
  flex: 1;
}

.div_oyntfz {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.div_xok0ow {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_xhr0f1 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_tfuad3 {
  font-size: 18px
}

.span_9uobc1 {
  font-size: 12px;
  margin-left: 5px
}

.div_b0g59p {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_q1qto1 {
  font-size: 18px
}

.span_ph3wey {
  font-size: 12px;
  margin-left: 5px
}

.div_q3rodo {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_n0nmjn {
  flex: 1;
}

.div_v93ojp {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.div_xw4ezx {
  width: 100%;
  border-top: 1px solid #000000;
  padding-top: 10px;
  margin-top: 60px
}
</style>

