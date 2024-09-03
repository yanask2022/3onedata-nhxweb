<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Static Route" name="static_route">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Static Route
              </h1>
              <!-- 操作按钮-->
              <div class="div_w1jlxw">
                <div class="div_zz59tt">
                  <i class="el-icon-circle-plus i_uguwgo"></i>
                  <span class="span_inukl7">Add</span>
                </div>

                <div class="div_mag340">
                  <i class="el-icon-remove i_oek9yq"></i>
                  <span class="span_adcgts">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_mae1rt">
                <div class="div_m1ybei">
                  <el-table ref="static_route_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="static_route_table_data" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_bjyuw9">

                          <div class="div_sj5xu8">
                            <span class="span_bnz28v">Name:</span>
                            <div class="div_fhgb1c">
                              <el-input v-model="props.row.name" size="mini" placeholder value="192.168.0.150" class="el-input_udfga3"></el-input>
                            </div>
                          </div>

                          <div class="div_9oxf1b">
                            <span class="span_ma5hqn">Destination IP:</span>
                            <div class="div_4dcrkb">
                              <el-input v-model="props.row.destination_ip" value=" " size="mini" class="el-input_le1f7i"></el-input>
                            </div>

                          </div>

                          <div class="div_4ag8vw">
                            <span class="span_kkfax0">Subnet Mask:</span>
                            <div class="div_ljg2wr">
                              <el-input v-model="props.row.subnet_mask" size="mini" class="el-input_hx922n"></el-input>
                            </div>
                          </div>

                          <div class="div_awoqjb">
                            <span class="span_q8wiwd">Next Hop:</span>
                            <div class="div_bnhtx1">
                              <el-input v-model="props.row.next_hop" size="mini" class="el-input_yqdojg"></el-input>
                            </div>
                          </div>
                          <div class="div_ixpnwm">
                            <span class="span_6ebvcp">Interface:</span>
                            <div class="div_lnsh2y">
                              <el-select v-model="props.row.the_interface" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_2sgoku">
                                <el-option label="LAN" value="1"></el-option>
                                <el-option label="WAN1" value="1"></el-option>
                                <el-option label="WAN2" value="2"></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="div_itba9a">
                            <span class="span_9jayzh">Metric:</span>
                            <div class="div_e9ggv3">
                              <el-input v-model="props.row.metric" size="mini" class="el-input_umm2py"></el-input>
                              <span>(0-15)</span>
                            </div>
                          </div>

                          <div class="div_klcca1">
                            <span class="span_dhfse8">Description:</span>
                            <div class="div_9f2w5l">
                              <el-input v-model="props.row.description" size="mini" class="el-input_6z4xxg"></el-input>
                              <span class="span_if8hux">(Optional)</span>
                            </div>
                          </div>
                          <div class="div_5ibr7t">
                            <span class="span_b4gm5e">Status:</span>
                            <div class="div_4t37v8">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disabled">Enabled
                              </el-checkbox>
                            </div>
                          </div>

                          <div class="div_k4t1g3">
                            <div class="div_m7tn5v">
                              <el-button size="mini" @click="onStaticRouteTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onStaticRouteTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="name" label="Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="destination_ip" label="Destination IP" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="subnet_mask" label="Subnet Mask" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="next_hop" label="Next Hop" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="the_interface" label="Interface" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="metric" label="Metric" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="status" label="Status" header-align="center" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_v7c2df">
                          <span @click="handleStaticRouteTableEdit(scope.row)" class="span_ezyfpb">
                            <i class="el-icon-edit-outline"></i>
                          </span>

                          <span @click="handleStaticRouteTableDelete(scope.row, scope.$index)" class="span_iv9zcv">
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
      <el-tab-pane label="Policy Routing" name="policy_routing">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Policy Routing List
              </h1>
              <!-- 操作按钮-->
              <div class="div_m48gro">
                <div class="div_o0tt2z">
                  <i class="el-icon-circle-plus i_jqqa8p"></i>
                  <span class="span_t3v82u">Add</span>
                </div>

                <div class="div_cfxkdk">
                  <i class="el-icon-remove i_hvzcic"></i>
                  <span class="span_dtbmt0">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_womwwx">
                <div class="div_3t4zz1">
                  <el-table ref="policy_routing_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="policy_routing_table_data" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_qltiqf">

                          <div class="div_zjfngg">
                            <span class="span_u8tbgv">Name:</span>
                            <div class="div_66zg5d">
                              <el-input v-model="props.row.name" size="mini" placeholder value="192.168.0.150" class="el-input_5sua17"></el-input>
                            </div>
                          </div>

                          <div class="div_rt5id4">
                            <span class="span_wmnu1g">Service Type:</span>
                            <div class="div_656h3z">
                              <el-select v-model="props.row.service_type" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_e1eqfn">
                                <el-option label="ALL" value="ALL"></el-option>
                                <el-option label="FTP" value="FTP"></el-option>
                                <el-option label="SSH" value="SSH"></el-option>
                                <el-option label="TELNET" value="TELNET"></el-option>
                                <el-option label="SMTP" value="SMTP"></el-option>
                                <el-option label="DNS" value="DNS"></el-option>
                                <el-option label="HTTP" value="HTTP"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_n4a1xw">
                            <span class="span_s4walc">Source IP:</span>
                            <div class="div_8v49qa">
                              <el-select v-model="props.row.source_ip" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_tedyp">
                                <el-option label="IPGROUP_ANY" value="IPGROUP_ANY"></el-option>
                                <el-option label="IPGROUP_LAN" value="IPGROUP_LAN"></el-option>
                                <el-option label="ipgroup1" value="ipgroup1"></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="div_4bqav4">
                            <span class="span_c30vqz">Destination IP:</span>
                            <div class="div_88pw7n">
                              <el-select v-model="props.row.destination_ip" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_nieu6j">
                                <el-option label="IPGROUP_ANY" value="IPGROUP_ANY"></el-option>
                                <el-option label="ipgroup1" value="ipgroup1"></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="div_nes8kh">
                            <span class="span_d6ymxs">WAN:</span>
                            <div class="div_pyahbz">
                              <el-select v-model="props.row.wan" size="mini" placeholder="&#x8BF7;&#x9009;&#x62E9;" class="el-select_8pqeyo">
                                <el-option label="WAN1" value="WAN1"></el-option>
                                <el-option label="WAN2" value="WAN2"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_wuai9w">
                            <span class="span_gs38cc">Description:</span>
                            <div class="div_ccwuwd">
                              <el-input v-model="props.row.description" size="mini" class="el-input_81f2o6"></el-input>
                              <span class="span_bf4utg">(Optional)</span>
                            </div>
                          </div>
                          <div class="div_6n6s31">
                            <span class="span_e9d6tn">Id:</span>
                            <div class="div_gctky2">
                              <el-input v-model="props.row.id" size="mini" class="el-input_qlp88e"></el-input>
                              <span class="span_rwnwk3">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_22upi9">
                            <span class="span_ni7w8a">Status:</span>
                            <div class="div_5cwwwf">
                              <el-checkbox v-model="props.row.status" true-label="Enable" false-label="Disabled">Enabled
                              </el-checkbox>
                            </div>
                          </div>

                          <div class="div_cm0o7z">
                            <div class="div_bpyntw">
                              <el-button size="mini" @click="onPolicyRoutingTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onPolicyRoutingEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="name" label="Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="service_type" label="Service Type" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="source_ip" label="Source IP" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="destination_ip" label="Destination IP" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="wan" label="WAN" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="effective_time" label="Effective Time" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="description" label="Description" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="status" label="Status" header-align="center" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_7sbot2">
                          <span @click="handlePolicyRoutingTableEdit(scope.row)" class="span_ycpzgp">
                            <i class="el-icon-edit-outline"></i>
                          </span>

                          <span @click="handlePolicyRoutingTableDelete(scope.row, scope.$index)" class="span_2klkio">
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
      <el-tab-pane label="Routing Table" name="routing">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Static Route
              </h1>
              <!-- 操作按钮-->
              <div class="div_dqk8tl">
                <div class="div_l3pfnx">
                  <span class="span_gg4zg5">Entry Count: 5</span>
                </div>

                <div class="div_5w94ey">
                  <i class="el-icon-refresh i_ybukt3"></i>
                  <span class="span_idthoa">Refresh</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_vusl7u">
                <div class="div_mj9bzo">
                  <el-table ref="routing_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="routing_table_data" border>

                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="destination_ip" label="Destination IP" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="subnet_mask" label="Subnet Mask" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="next_hop" label="Next Hop" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="the_interface" label="Interface" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="metric" label="Metric" width="100" header-align="center" align="center"></el-table-column>
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
  name: 'Routing',
  data() {
    return {
      activeName: 'static_route',
      static_route_table_data: [
        {
          id: 1,
          name: 'static1',
          destination_ip: '192.168.15.0',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.100',
          the_interface: 'WAN2',
          metric: '5',
          status: 'Disabled',
          description: ''
        },
        {
          id: 2,
          name: 'static2',
          destination_ip: '192.168.15.1',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.101',
          the_interface: 'WAN1',
          metric: '6',
          status: 'Disabled',
          description: ''
        }
      ],
      static_route_table_is_editing: false,

      policy_routing_table_data: [
        {
          id: '1',
          name: 'policy1',
          service_type: 'FTP',
          source_ip: 'IPGROUP_ANY',
          destination_ip: 'ipgroup1',
          wan: 'WAN2',
          effective_time: 'time1',
          description: '',
          status: 'Disabled'
        }
      ],
      policy_routing_table_is_editing: false,

      routing_table_data: [
        {
          id: '1',
          destination_ip: 'ipgroup1',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.100',
          the_interface: 'WAN2',
          metric: '5'
        },
        {
          id: '2',
          destination_ip: 'ipgroup1',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.100',
          the_interface: 'WAN2',
          metric: '5'
        },
        {
          id: '3',
          destination_ip: 'ipgroup1',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.100',
          the_interface: 'WAN2',
          metric: '5'
        },
        {
          id: '4',
          destination_ip: 'ipgroup1',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.100',
          the_interface: 'WAN2',
          metric: '5'
        }, {
          id: '5',
          destination_ip: 'ipgroup1',
          subnet_mask: '255.255.255.0',
          next_hop: '192.168.16.100',
          the_interface: 'WAN2',
          metric: '5'
        }
      ]
    }
  },
  methods: {

    onStaticRouteTableEditDone(row) {
      this.$refs.static_route_table.toggleRowExpansion(row, false)
      this.static_route_table_is_editing = false
    },

    onStaticRouteTableEditCancel(row) {
      this.$refs.static_route_table.toggleRowExpansion(row, false)
      this.static_route_table_is_editing = false
    },

    handleStaticRouteTableDelete(row) {
      // TODO 表格项删除
    },
    handleStaticRouteTableEdit(row) {
      if (!this.static_route_table_is_editing) {
        this.$refs.static_route_table.toggleRowExpansion(row, true)
        this.static_route_table_is_editing = true
      }
    },

    onPolicyRoutingTableEditDone(row) {
      this.$refs.policy_routing_table.toggleRowExpansion(row, false)
      this.policy_routing_table_is_editing = false
    },

    onPolicyRoutingEditCancel(row) {
      this.$refs.static_route_table.toggleRowExpansion(row, false)
      this.policy_routing_table_is_editing = false
    },

    handlePolicyRoutingTableDelete(row) {
      // TODO 表格项删除
    },
    handlePolicyRoutingTableEdit(row) {
      if (!this.policy_routing_table_is_editing) {
        this.$refs.policy_routing_table.toggleRowExpansion(row, true)
        this.policy_routing_table_is_editing = true
      }
    },

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

.div_w1jlxw {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_zz59tt {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_uguwgo {
  font-size: 18px
}

.span_inukl7 {
  font-size: 12px;
  margin-left: 5px
}

.div_mag340 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_oek9yq {
  font-size: 18px
}

.span_adcgts {
  font-size: 12px;
  margin-left: 5px
}

.div_mae1rt {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_m1ybei {
  flex: 1;
}

.div_bjyuw9 {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_sj5xu8 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_bnz28v {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_fhgb1c {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_udfga3 {
  max-width: 232px;
}

.div_9oxf1b {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_ma5hqn {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_4dcrkb {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_le1f7i {
  max-width: 232px;
}

.div_4ag8vw {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_kkfax0 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_ljg2wr {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_hx922n {
  max-width: 232px;
}

.div_awoqjb {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_q8wiwd {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_bnhtx1 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_yqdojg {
  max-width: 232px;
}

.div_ixpnwm {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_6ebvcp {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_lnsh2y {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_2sgoku {
  width: 232px;
}

.div_itba9a {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_9jayzh {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_e9ggv3 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_umm2py {
  max-width: 232px;
}

.div_klcca1 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_dhfse8 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_9f2w5l {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_6z4xxg {
  max-width: 232px;
}

.span_if8hux {
  font-size: 12px;
  color: #000000
}

.div_5ibr7t {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_b4gm5e {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_4t37v8 {
  flex: 1;
  display: flex;
  align-items: center
}

.div_k4t1g3 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_m7tn5v {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_v7c2df {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_ezyfpb {
  font-size: 16px
}

.span_iv9zcv {
  font-size: 16px;
  margin-left: 8px
}

.div_m48gro {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_o0tt2z {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_jqqa8p {
  font-size: 18px
}

.span_t3v82u {
  font-size: 12px;
  margin-left: 5px
}

.div_cfxkdk {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_hvzcic {
  font-size: 18px
}

.span_dtbmt0 {
  font-size: 12px;
  margin-left: 5px
}

.div_womwwx {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_3t4zz1 {
  flex: 1;
}

.div_qltiqf {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_zjfngg {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_u8tbgv {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_66zg5d {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_5sua17 {
  max-width: 232px;
}

.div_rt5id4 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_wmnu1g {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_656h3z {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_e1eqfn {
  width: 232px;
}

.div_n4a1xw {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_s4walc {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_8v49qa {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_tedyp {
  width: 232px;
}

.div_4bqav4 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_c30vqz {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_88pw7n {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_nieu6j {
  width: 232px;
}

.div_nes8kh {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_d6ymxs {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_pyahbz {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_8pqeyo {
  width: 232px;
}

.div_wuai9w {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_gs38cc {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_ccwuwd {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_81f2o6 {
  max-width: 232px;
}

.span_bf4utg {
  color: #000000;
  font-size: 12px
}

.div_6n6s31 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_e9d6tn {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_gctky2 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_qlp88e {
  max-width: 232px;
}

.span_rwnwk3 {
  color: #000000;
  font-size: 12px
}

.div_22upi9 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_ni7w8a {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_5cwwwf {
  flex: 1;
  display: flex;
  align-items: center
}

.div_cm0o7z {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_bpyntw {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_7sbot2 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_ycpzgp {
  font-size: 16px
}

.span_2klkio {
  font-size: 16px;
  margin-left: 8px
}

.div_dqk8tl {
  margin: 30px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center
}

.div_l3pfnx {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.span_gg4zg5 {
  font-size: 12px;
  margin-left: 5px
}

.div_5w94ey {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_ybukt3 {
  font-size: 18px
}

.span_idthoa {
  font-size: 12px;
  margin-left: 5px
}

.div_vusl7u {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_mj9bzo {
  flex: 1;
}
</style>

