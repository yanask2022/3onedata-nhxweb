<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Virtual Servers" name="virtual_server">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Virtual Server List
              </h1>
              <!-- 操作按钮-->
              <div class="div_xo49i">
                <div class="div_x2wt0">
                  <i class="el-icon-circle-plus i_qg4kwc" />
                  <span class="span_pxgqh3">Add</span>
                </div>

                <div class="div_ijq8ce">
                  <i class="el-icon-remove i_5mle5i" />
                  <span class="span_igxa65">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_yg9h03">
                <div class="div_uma365">
                  <el-table ref="virtual_server_list" header-cell-class-name="header-class" cell-class-name="cell-class" :data="virtual_server_table" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_5xepcn">

                          <div class="div_s68rv">
                            <span class="span_jdwbv8">Name:</span>
                            <div class="div_wkdse1">
                              <el-input v-model="props.row.name" size="mini" placeholder value="192.168.0.150" class="el-input_68ni8e" />
                            </div>
                          </div>
                          <div class="div_vhh895">
                            <span class="span_l7tjkt">Interface:</span>
                            <div class="div_7hl2yi">
                              <el-select v-model="props.row.the_interface" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_4n4s7e">
                                <el-option label="WAN1" value="1" />
                                <el-option label="WAN2" value="2" />
                              </el-select>
                            </div>
                          </div>
                          <div class="div_nyamzn">
                            <span class="span_rpvuhx">External Port:</span>
                            <div class="div_xqu7v6">
                              <el-input v-model="props.row.external_port" value=" " size="mini" class="el-input_5mwge1" />
                            </div>

                          </div>

                          <div class="div_e8jp4r">
                            <span class="span_emz4iw">Internal Port:</span>
                            <div class="div_wwkhp4">
                              <el-input v-model="props.row.internal_port" value=" " size="mini" class="el-input_hzhdn4" />
                            </div>
                          </div>

                          <div class="div_rl7inz">
                            <span class="span_v8fchh">Internal Server IP:</span>
                            <div class="div_w7n3oi">
                              <el-input v-model="props.row.internal_server_ip" value=" " size="mini" class="el-input_hownfv" />
                            </div>
                          </div>

                          <div class="div_wc7dg6">
                            <span class="span_c7sgm6">Protocol:</span>
                            <div class="div_i31avm">
                              <el-select v-model="props.row.protocol" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_orkfpk">
                                <el-option label="ALL" value="1" />
                                <el-option label="TCP" value="2" />
                                <el-option label="UDP" value="3" />
                              </el-select>
                            </div>
                          </div>

                          <div class="div_xaavrj">
                            <span class="span_dt6gl9">Status:</span>
                            <div class="div_8fhzdj">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disable">Enable
                              </el-checkbox>
                            </div>
                          </div>

                          <div class="div_zgjt3l">
                            <div class="div_lx1l8n">
                              <el-button size="mini" @click="onVirtualServerTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onVirtualServerTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection" />
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center" />
                    <el-table-column prop="name" label="Name" header-align="center" align="center" />
                    <el-table-column prop="the_interface" label="Interface" width="90" header-align="center" align="center" />

                    <el-table-column width="120" prop="external_port" label="External Port" header-align="center" align="center" />

                    <el-table-column width="120" prop="internal_port" label="Internal Port" header-align="center" align="center" />
                    <el-table-column prop="internal_server_ip" label="Internal Server IP" header-align="center" align="center" />
                    <el-table-column width="90" prop="protocol" label="Protocol" header-align="center" align="center" />
                    <el-table-column width="100" prop="status" label="Status" header-align="center" align="center" />

                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_ie5zhi">
                          <span class="span_a2kr29" @click="handleVirtualServerTableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_6xqtnf" @click="handleVirtualServerTableDelete(scope.row, scope.$index)">
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

      <el-tab-pane label="Port Triggering" name="port_triggering">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Port Triggering List
              </h1>
              <!-- 操作按钮-->
              <div class="div_12r14r">
                <div class="div_y597e3">
                  <i class="el-icon-circle-plus i_8n2z2p" />
                  <span class="span_kd76ev">Add</span>
                </div>

                <div class="div_d7zqd1">
                  <i class="el-icon-remove i_q2t4ks" />
                  <span class="span_ype535">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_pwf6qo">
                <div class="div_yfy5ew">
                  <el-table ref="port_triggering_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="port_triggering_table" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_umbsf5">
                          <div class="div_c2pk4e">
                            <span class="span_nlnwt9">Interface:</span>
                            <div class="div_gt2lk0">
                              <el-select v-model="props.row.the_interface" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_hhlctu">
                                <el-option label="WAN1" value="1" />
                                <el-option label="WAN2" value="2" />
                              </el-select>
                            </div>
                          </div>

                          <div class="div_tvz8rh">
                            <span class="span_4wigis">Name:</span>
                            <div class="div_zgfilq">
                              <el-input v-model="props.row.name" size="mini" placeholder class="el-input_wctwie" />
                            </div>
                          </div>

                          <div class="div_18vz12">
                            <span class="span_tqasc3">Trigger Port:</span>
                            <div class="div_sq0j2f">
                              <el-input v-model="props.row.trigger_port" value=" " size="mini" class="el-input_eq8mrd" />
                            </div>
                          </div>

                          <div class="div_n9msig">
                            <span class="span_hyguqi">Trigger Protocol:</span>
                            <div class="div_bsilfo">
                              <el-select v-model="props.row.trigger_protocol" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_fl6ac5">
                                <el-option label="TCP/UDP" value="1" />
                                <el-option label="TCP" value="2" />
                                <el-option label="UDP" value="3" />
                              </el-select>
                            </div>
                          </div>

                          <div class="div_mwugfc">
                            <span class="span_mv2e6p">Incoming Port:</span>
                            <div class="div_9ccrpl">
                              <el-input v-model="props.row.incoming_port" value=" " size="mini" class="el-input_mfryne" />
                            </div>
                          </div>

                          <div class="div_6pjbg7">
                            <span class="span_mdhe18">Incoming Protocol:</span>
                            <div class="div_hbsnza">
                              <el-select v-model="props.row.incoming_protocol" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_bnqqw5">
                                <el-option label="TCP/UDP" value="1" />
                                <el-option label="TCP" value="2" />
                                <el-option label="UDP" value="3" />
                              </el-select>
                            </div>
                          </div>

                          <div class="div_vea95u">
                            <span class="span_6slfvp">Status:</span>
                            <div class="div_zvjni2">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disable">Enable
                              </el-checkbox>
                            </div>
                          </div>

                          <div class="div_lzjnw2">
                            <div class="div_e7nm3v">
                              <el-button size="mini" @click="onPortTriggerTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onPortTriggerTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection" />
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center" />

                    <el-table-column prop="the_interface" label="Interface" header-align="center" width="100" align="center" />
                    <el-table-column prop="name" label="Name" header-align="center" align="center" />

                    <el-table-column prop="trigger_port" label="Trigger Port" header-align="center" align="center" />

                    <el-table-column prop="trigger_protocol" label="Trigger Protocol" header-align="center" align="center" />
                    <el-table-column prop="incoming_port" label="Incoming Port" header-align="center" align="center" />
                    <el-table-column prop="incoming_protocol" width="150" label="Incoming Protocol" header-align="center" align="center" />
                    <el-table-column prop="status" label="Status" width="120" header-align="center" align="center" />

                    <el-table-column width="130" header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_djpxmu">
                          <span class="span_jmowi4" @click="handlePortTriggerTableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_slzm6v" @click="handlePortTriggerTableDelete(scope.row, scope.$index)">
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
      <el-tab-pane label="NAT-DMZ" name="nat_dmz">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                NAT-DMZ List
              </h1>
              <!-- 操作按钮-->
              <div class="div_sa4h4n">
                <div class="div_ya3y4e">
                  <i class="el-icon-circle-plus i_99dpep" />
                  <span class="span_eqd00j">Add</span>
                </div>

                <div class="div_wzaxva">
                  <i class="el-icon-remove i_v5l3q9" />
                  <span class="span_xwk3a2">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_ky887z">
                <div class="div_wp0ds4">
                  <el-table ref="nat_dmz_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="nat_dmz_table" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_s6xeag">

                          <div class="div_aftcf8">
                            <span class="span_c30pul">Name:</span>
                            <div class="div_u1r1s9">
                              <el-input v-model="props.row.name" size="mini" placeholder class="el-input_7dyo3v" />
                            </div>
                          </div>

                          <div class="div_oo61pz">
                            <span class="span_pxnayt">Interface:</span>
                            <div class="div_yh2d2t">
                              <el-select v-model="props.row.the_interface" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_ll1lsl">
                                <el-option label="WAN1" value="1" />
                                <el-option label="WAN2" value="2" />
                              </el-select>
                            </div>
                          </div>

                          <div class="div_ki822x">
                            <span class="span_b55jmu">Host IP Address:</span>
                            <div class="div_40e1b">
                              <el-input v-model="props.row.host_ip_address" value=" " size="mini" class="el-input_ochdk2" />
                            </div>
                          </div>

                          <div class="div_fwis1l">
                            <span class="span_z7zr3b">Status:</span>
                            <div class="div_bf1heg">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disable">Enable
                              </el-checkbox>
                            </div>
                          </div>

                          <div class="div_a8isgg">
                            <div class="div_yvmj5s">
                              <el-button size="mini" @click="on_NAT_DMZ_TableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="on_NAT_DMZ_TableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection" />
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center" />
                    <el-table-column prop="name" label="Name" header-align="center" align="center" />

                    <el-table-column prop="the_interface" label="Interface" header-align="center" align="center" />
                    <el-table-column prop="host_ip_address" label="Host IP Address" header-align="center" align="center" />
                    <el-table-column prop="status" label="Status" header-align="center" align="center" />

                    <el-table-column header-align="center" align="center" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_mz3m7m">
                          <span class="span_u8h7yw" @click="handle_NAT_DMZ_TableEdit(scope.row)">
                            <i class="el-icon-edit-outline" />
                          </span>

                          <span class="span_2z8z1n" @click="handle_NAT_DMZ_TableDelete(scope.row, scope.$index)">
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
      <el-tab-pane label="ALG" name="alg">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                ALG
              </h1>

              <div class="div_7cfgil">
                <el-checkbox v-model="alg_config.ftp_alg">FTP ALG</el-checkbox>
                <el-checkbox v-model="alg_config.h323_alg">H.323 ALG</el-checkbox>
                <el-checkbox v-model="alg_config.PPTP_alg">PPTP ALG</el-checkbox>
                <el-checkbox v-model="alg_config.sip_alg">SIP ALG</el-checkbox>
                <el-checkbox v-model="alg_config.ipsec_alg">IPSec ALG</el-checkbox>
              </div>

              <div class="div_m2n6av">
                <el-button size="mini" @click="onALGConfigSave">Save</el-button>
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
  name: 'NAT',
  data() {
    return {
      activeName: 'virtual_server',
      virtual_server_table: [
        {
          id: 1,
          name: 'vs1',
          the_interface: 'wan1',
          external_port: '80',
          internal_port: '5060',
          internal_server_ip: '192.168.0.11',
          protocol: 'TCP',
          status: 'Disabled'
        },
        {
          id: 1,
          name: 'vs2',
          the_interface: 'wan2',
          external_port: '81',
          internal_port: '5160',
          internal_server_ip: '192.168.0.12',
          protocol: 'TCP',
          status: 'Disabled'
        }
      ],
      virtual_server_table_is_editing: false,
      port_triggering_table: [
        {
          id: 1,
          the_interface: 'wan1',
          name: 'pt1',
          trigger_port: '2',
          trigger_protocol: 'ALL',
          incoming_port: '5-100',
          incoming_protocol: 'ALL',
          status: 'Disabled'
        },
        {
          id: 1,
          the_interface: 'wan2',
          name: 'pt2',
          trigger_port: '3',
          trigger_protocol: 'ALL',
          incoming_port: '5-100',
          incoming_protocol: 'ALL',
          status: 'Disabled'
        }
      ],
      port_triggering_table_is_editing: false,

      nat_dmz_table: [
        {
          id: 1,
          the_interface: 'wan1',
          name: 'dmz1',
          host_ip_address: '192.168.10.250',
          status: 'Disabled'
        },
        {
          id: 1,
          the_interface: 'wan2',
          name: 'dmz2',
          host_ip_address: '192.168.10.250',
          status: 'Disabled'
        }
      ],
      nat_dmz_table_is_editing: false,

      alg_config: {
        ftp_alg: false,
        h323_alg: false,
        PPTP_alg: false,
        sip_alg: false,
        ipsec_alg: false
      },

      enable_arp_spoofing_defense: false,
      match_ip_mac: false,
      send_garp_packets: false,
      send_packet_interval: 1000,
      passwordLevel: 0,

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

    handle_NAT_DMZ_TableEdit(row) {
      if (!this.nat_dmz_table_is_editing) {
        this.$refs.nat_dmz_table.toggleRowExpansion(row, true)
        this.nat_dmz_table_is_editing = true
      }
    },
    handle_NAT_DMZ_TableDelete(row) {
      //  TODO
    },
    on_NAT_DMZ_TableEditDone(row) {
      this.$refs.nat_dmz_table.toggleRowExpansion(row, false)
      this.nat_dmz_table_is_editing = false
    },
    on_NAT_DMZ_TableEditCancel(row) {
      this.$refs.nat_dmz_table.toggleRowExpansion(row, false)
      this.nat_dmz_table_is_editing = false
    },

    handlePortTriggerTableEdit(row) {
      if (!this.port_triggering_table_is_editing) {
        this.$refs.port_triggering_table.toggleRowExpansion(row, true)
        this.port_triggering_table_is_editing = true
      }
    },
    handlePortTriggerTableDelete(row) {
      //  TODO
    },
    onVirtualServerTableEditDone(row) {
      // TODO 保存
      this.$refs.virtual_server_list.toggleRowExpansion(row, false)
      this.virtual_server_table_is_editing = false
    },

    onPortTriggerTableEditDone(row) {
      this.$refs.port_triggering_table.toggleRowExpansion(row, false)
      this.port_triggering_table_is_editing = false
    },

    onPortTriggerTableEditCancel(row) {
      this.$refs.port_triggering_table.toggleRowExpansion(row, false)
      this.port_triggering_table_is_editing = false
    },

    handleVirtualServerTableEdit(row) {
      this.$refs.virtual_server_list.toggleRowExpansion(row, true)
      this.virtual_server_table_is_editing = true
    },

    onVirtualServerTableEditCancel(row) {
      this.$refs.virtual_server_list.toggleRowExpansion(row, false)
      this.virtual_server_table_is_editing = false
    },

    handleVirtualServerTableDelete() {

    },

    onALGConfigSave() {
    //  TODO
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

.div_xo49i {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_x2wt0 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_qg4kwc {
  font-size: 18px
}

.span_pxgqh3 {
  font-size: 12px;
  margin-left: 5px
}

.div_ijq8ce {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_5mle5i {
  font-size: 18px
}

.span_igxa65 {
  font-size: 12px;
  margin-left: 5px
}

.div_yg9h03 {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_uma365 {
  flex: 1;
}

.div_5xepcn {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_s68rv {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_jdwbv8 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_wkdse1 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_68ni8e {
  max-width: 232px;
}

.div_vhh895 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_l7tjkt {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_7hl2yi {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_4n4s7e {
  width: 232px;
}

.div_nyamzn {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_rpvuhx {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_xqu7v6 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_5mwge1 {
  max-width: 232px;
}

.div_e8jp4r {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_emz4iw {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_wwkhp4 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_hzhdn4 {
  max-width: 232px;
}

.div_rl7inz {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_v8fchh {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_w7n3oi {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_hownfv {
  max-width: 232px;
}

.div_wc7dg6 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_c7sgm6 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_i31avm {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_orkfpk {
  width: 232px;
}

.div_xaavrj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_dt6gl9 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_8fhzdj {
  flex: 1;
  display: flex;
  align-items: center
}

.div_zgjt3l {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_lx1l8n {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_ie5zhi {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_a2kr29 {
  font-size: 16px
}

.span_6xqtnf {
  font-size: 16px;
  margin-left: 8px
}

.div_12r14r {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_y597e3 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_8n2z2p {
  font-size: 18px
}

.span_kd76ev {
  font-size: 12px;
  margin-left: 5px
}

.div_d7zqd1 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_q2t4ks {
  font-size: 18px
}

.span_ype535 {
  font-size: 12px;
  margin-left: 5px
}

.div_pwf6qo {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_yfy5ew {
  flex: 1;
}

.div_umbsf5 {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_c2pk4e {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_nlnwt9 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_gt2lk0 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_hhlctu {
  width: 232px;
}

.div_tvz8rh {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_4wigis {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_zgfilq {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_wctwie {
  max-width: 232px;
}

.div_18vz12 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_tqasc3 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_sq0j2f {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_eq8mrd {
  max-width: 232px;
}

.div_n9msig {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_hyguqi {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_bsilfo {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_fl6ac5 {
  width: 232px;
}

.div_mwugfc {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_mv2e6p {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_9ccrpl {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_mfryne {
  max-width: 232px;
}

.div_6pjbg7 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_mdhe18 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_hbsnza {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_bnqqw5 {
  width: 232px;
}

.div_vea95u {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_6slfvp {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_zvjni2 {
  flex: 1;
  display: flex;
  align-items: center
}

.div_lzjnw2 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_e7nm3v {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_djpxmu {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_jmowi4 {
  font-size: 16px
}

.span_slzm6v {
  font-size: 16px;
  margin-left: 8px
}

.div_sa4h4n {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_ya3y4e {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_99dpep {
  font-size: 18px
}

.span_eqd00j {
  font-size: 12px;
  margin-left: 5px
}

.div_wzaxva {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_v5l3q9 {
  font-size: 18px
}

.span_xwk3a2 {
  font-size: 12px;
  margin-left: 5px
}

.div_ky887z {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_wp0ds4 {
  flex: 1;
}

.div_s6xeag {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_aftcf8 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_c30pul {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_u1r1s9 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_7dyo3v {
  max-width: 232px;
}

.div_oo61pz {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_pxnayt {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_yh2d2t {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_ll1lsl {
  width: 232px;
}

.div_ki822x {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_b55jmu {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_40e1b {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_ochdk2 {
  max-width: 232px;
}

.div_fwis1l {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_z7zr3b {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_bf1heg {
  flex: 1;
  display: flex;
  align-items: center
}

.div_a8isgg {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_yvmj5s {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_mz3m7m {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_u8h7yw {
  font-size: 16px
}

.span_2z8z1n {
  font-size: 16px;
  margin-left: 8px
}

.div_7cfgil {
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  margin-top: 30px
}

.div_m2n6av {
  padding: 0px 10px;
  margin-top: 60px
}

</style>

